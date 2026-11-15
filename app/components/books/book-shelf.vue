<template>
  <section
    class="book-shelf"
    :aria-label="t('shelf')"
    aria-describedby="shelf-help"
  >
    <div v-if="selectedBook" class="shelf-content">
      <div
        ref="viewport"
        class="shelf-viewport"
        :class="{ 'shelf-viewport--dragging': dragging }"
        @wheel="wheelShelf"
        @pointerdown="startPointer"
        @pointermove="movePointer"
        @pointerup="endPointer"
        @pointerleave="leavePointer"
        @pointercancel="endPointer"
        @lostpointercapture.self="endPointer"
      >
        <ul ref="stage" class="shelf-books" role="list">
          <li
            v-for="{ book, index, style } in visibleBooks"
            :key="bookKey(book)"
            class="shelf-book"
            :style="style"
          >
            <button
              type="button"
              class="book"
              :class="bookPalette(book)"
              :data-shelf-index="index"
              :aria-label="
                t('bookLabel', { title: book.title, author: book.author })
              "
              :aria-pressed="index === selectedIndex"
              :tabindex="index === selectedIndex ? 0 : -1"
              @click="onBookClick(index, $event)"
              @keydown.left.prevent="move(-1, true)"
              @keydown.right.prevent="move(1, true)"
              @keydown.home.prevent="selectBook(0, true)"
              @keydown.end.prevent="selectBook(books.length - 1, true)"
            >
              <span class="book-body" aria-hidden="true">
                <span class="book-face book-cover">
                  <span class="cover-theme">{{ book.themes[0] }}</span>
                  <span class="cover-art"><span /><span /><span /></span>
                  <span class="cover-title">{{ book.title }}</span>
                  <span class="cover-author">{{ book.author }}</span>
                </span>
                <span class="book-face book-spine">
                  <span class="spine-decoration" />
                  <span class="spine-title">{{ book.title }}</span>
                </span>
              </span>
            </button>
          </li>
        </ul>
      </div>

      <div class="shelf-footer">
        <div class="shelf-details" aria-live="polite" aria-atomic="true">
          <div :key="bookKey(selectedBook)" class="shelf-caption">
            <h2>{{ selectedBook.title }}</h2>
            <p>{{ selectedBook.author }}</p>
            <ul class="book-meta" role="list">
              <li>{{ t(`status.${selectedBook.status ?? 'read'}`) }}</li>
              <li v-if="selectedBook.rating !== undefined">
                {{ t('rating', { rating: n(selectedBook.rating) }) }}
              </li>
              <li v-if="selectedBook.favorite">{{ t('favorite') }}</li>
              <li v-if="readingDate">{{ readingDate }}</li>
            </ul>
            <p v-if="selectedBook.themes.length" class="book-themes">
              {{ selectedBook.themes.join(' · ') }}
            </p>
          </div>
        </div>

        <div class="shelf-controls">
          <button
            type="button"
            :aria-label="t('previous')"
            :disabled="!loops && selectedIndex === 0"
            @click="move(-1)"
          >
            <UIcon name="i-heroicons-arrow-left-20-solid" aria-hidden="true" />
          </button>
          <span class="shelf-position"
            >{{ selectedIndex + 1 }} / {{ books.length }}</span
          >
          <button
            type="button"
            :aria-label="t('next')"
            :disabled="!loops && selectedIndex === books.length - 1"
            @click="move(1)"
          >
            <UIcon name="i-heroicons-arrow-right-20-solid" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <p v-else class="shelf-empty" role="status">{{ t('empty') }}</p>
    <p id="shelf-help" class="sr-only">{{ t('help') }}</p>
  </section>
</template>

<script setup lang="ts">
import { usePreferredReducedMotion, useResizeObserver } from '@vueuse/core'
import type { Book } from '~/interfaces/books'
import type { CSSProperties } from 'vue'

const props = defineProps<{ books: Book[] }>()
const { t, n, locale } = useI18n({ useScope: 'local' })
const viewport = ref<HTMLElement>()
const stage = ref<HTMLElement>()
const dragging = ref(false)

const spineWidth = 0.175
const coverWidth = 0.63
const pitch = 0.215
const stageWidth = ref(1440)
const bookHeight = ref(360)
const reduceMotion = usePreferredReducedMotion()
const initialIndex = Math.max(
  0,
  props.books.findIndex((book) => book.status === 'reading'),
)
const position = ref(initialIndex)

let target = initialIndex
let frameId = 0
let lastFrameTime = 0
let wheelTimer: ReturnType<typeof setTimeout> | undefined
let pointer:
  | { id: number; x: number; y: number; startPosition: number }
  | undefined
let suppressClick = false
let focusAfterAnimation = false

const bookKey = (book: Book) => JSON.stringify([book.title, book.author])
const palettes = [
  'navy',
  'cobalt',
  'harbor',
  'silver',
  'steel',
  'ink',
  'ocean',
  'mist',
]
const bookPalette = (book: Book) => {
  const code = Array.from(book.title).reduce(
    (sum, letter) => sum + letter.charCodeAt(0),
    0,
  )
  return `book--${palettes[code % palettes.length]}`
}

const loops = computed(() => {
  const visibleSlots = stageWidth.value / Math.max(1, bookHeight.value * pitch)
  return props.books.length > visibleSlots + 3
})

function wrap(index: number, count: number) {
  return ((index % count) + count) % count
}

function shortestOffset(delta: number, count: number) {
  return wrap(delta + count / 2, count) - count / 2
}

const selectedIndex = computed(() =>
  props.books.length ? wrap(Math.round(position.value), props.books.length) : 0,
)
const selectedBook = computed(() => props.books[selectedIndex.value])
const readingDate = computed(() => {
  const date = selectedBook.value?.readDate
  if (!date) return ''
  return new Intl.DateTimeFormat(locale.value, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}-01T00:00:00Z`))
})

const visibleBooks = computed(() => {
  const limit = stageWidth.value / Math.max(1, 2 * bookHeight.value * pitch) + 2
  return props.books.flatMap((book, index) => {
    const offset = index - position.value
    const distance = loops.value
      ? shortestOffset(offset, props.books.length)
      : offset
    const abs = Math.abs(distance)
    if (abs > limit) return []

    // Near the center, the book turns while its neighbors make space for the cover.
    const proximity = Math.max(0, 1 - abs)
    const open = proximity * proximity * (3 - 2 * proximity)
    const edge = Math.min(1, abs)
    const spread = Math.sign(distance) * edge * (1 - edge / 2)
    const horizontal =
      distance * pitch + spread * (coverWidth - spineWidth + 0.045)
    const angle = (open * Math.PI) / 2
    const hitWidth = Math.cos(angle) * spineWidth + Math.sin(angle) * coverWidth

    return [
      {
        book,
        index,
        style: {
          '--shift': horizontal,
          '--open': open,
          '--hit-width': hitWidth,
          zIndex: Math.round(1000 - abs * 10),
        } as CSSProperties,
      },
    ]
  })
})

useResizeObserver(stage, ([entry]) => {
  if (!entry) return
  stageWidth.value = entry.contentRect.width
  bookHeight.value = entry.contentRect.height
})

function finishFocus() {
  if (!focusAfterAnimation) return
  focusAfterAnimation = false
  void nextTick(() => {
    viewport.value
      ?.querySelector<HTMLButtonElement>(
        `[data-shelf-index="${selectedIndex.value}"]`,
      )
      ?.focus({ preventScroll: true })
  })
}

function animate(now: number) {
  const elapsed = Math.min(48, now - lastFrameTime) / 1000
  lastFrameTime = now
  const remaining = target - position.value
  const speed = dragging.value ? 18 : 6

  if (Math.abs(remaining) <= 0.003) {
    position.value = target
    frameId = 0
    finishFocus()
    return
  }

  position.value += remaining * (1 - Math.exp(-speed * elapsed))
  frameId = requestAnimationFrame(animate)
}

function setTarget(next: number) {
  const last = props.books.length - 1
  if (last < 0) return
  target = loops.value ? next : Math.max(0, Math.min(last, next))

  if (reduceMotion.value === 'reduce') {
    position.value = target
    finishFocus()
  } else if (!frameId) {
    lastFrameTime = performance.now()
    frameId = requestAnimationFrame(animate)
  }
}

function selectBook(index: number, focus = false) {
  if (!props.books[index]) return
  clearTimeout(wheelTimer)
  focusAfterAnimation = focus
  const destination = loops.value
    ? position.value +
      shortestOffset(index - position.value, props.books.length)
    : index
  setTarget(Math.round(destination))
}

function onBookClick(index: number, event: MouseEvent) {
  if (!suppressClick || event.detail === 0) selectBook(index)
}

function move(direction: number, focus = false) {
  if (props.books.length < 2) return
  clearTimeout(wheelTimer)
  focusAfterAnimation = focus
  setTarget(Math.round(target) + direction)
}

function wheelShelf(event: WheelEvent) {
  if (event.ctrlKey || !event.cancelable || props.books.length < 2) return
  const delta =
    Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY
  if (!delta) return
  if (
    !loops.value &&
    ((delta < 0 && target <= 0) ||
      (delta > 0 && target >= props.books.length - 1))
  )
    return

  event.preventDefault()
  focusAfterAnimation = false
  const pixels =
    delta *
    (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stageWidth.value : 1)
  const step = (pixels / (bookHeight.value * pitch)) * 0.5
  const boundedStep = Math.max(-5, Math.min(5, step))
  setTarget(target + boundedStep)

  clearTimeout(wheelTimer)
  wheelTimer = setTimeout(() => setTarget(Math.round(target)), 160)
}

function startPointer(event: PointerEvent) {
  if (!event.isPrimary || event.button !== 0) return
  suppressClick = false
  if (props.books.length < 2) return
  pointer = {
    id: event.pointerId,
    x: event.clientX,
    y: event.clientY,
    startPosition: position.value,
  }
}

function movePointer(event: PointerEvent) {
  if (!pointer || event.pointerId !== pointer.id) return
  const offset = event.clientX - pointer.x

  if (!dragging.value) {
    if (
      Math.abs(offset) < 7 ||
      Math.abs(offset) < Math.abs(event.clientY - pointer.y)
    )
      return
    clearTimeout(wheelTimer)
    focusAfterAnimation = false
    dragging.value = true
    viewport.value?.setPointerCapture(event.pointerId)
  }

  setTarget(pointer.startPosition - offset / (bookHeight.value * pitch))
}

function leavePointer() {
  if (!dragging.value) pointer = undefined
}

function endPointer(event: PointerEvent) {
  if (!pointer || event.pointerId !== pointer.id) return
  pointer = undefined
  if (!dragging.value) return

  dragging.value = false
  suppressClick = true
  setTarget(Math.round(target))
}

watch(
  () => props.books,
  (books, previousBooks) => {
    const active =
      previousBooks[wrap(Math.round(position.value), previousBooks.length)]
    const next = active
      ? books.findIndex((book) => bookKey(book) === bookKey(active))
      : -1
    clearTimeout(wheelTimer)
    cancelAnimationFrame(frameId)
    frameId = 0
    focusAfterAnimation = false
    pointer = undefined
    dragging.value = false
    target = Math.max(0, next)
    position.value = target
  },
)

watch(loops, (looping) => {
  if (looping || !props.books.length) return
  cancelAnimationFrame(frameId)
  frameId = 0
  target = wrap(Math.round(position.value), props.books.length)
  position.value = target
  finishFocus()
})

onBeforeUnmount(() => {
  clearTimeout(wheelTimer)
  cancelAnimationFrame(frameId)
})
</script>

<i18n lang="json">
{
  "pt-BR": {
    "shelf": "Estante interativa",
    "bookLabel": "{title}, de {author}",
    "help": "Selecione uma lombada para ver a capa. Role ou use as setas para percorrer a estante.",
    "previous": "Livro anterior",
    "next": "Próximo livro",
    "favorite": "Favorito",
    "rating": "{rating}/10",
    "empty": "Nenhum livro encontrado. Tente outro título, autor ou tema.",
    "status": {
      "read": "Lido",
      "reading": "Lendo",
      "queued": "Na fila",
      "wishlist": "Lista de desejos"
    }
  },
  "en": {
    "shelf": "Interactive bookshelf",
    "bookLabel": "{title}, by {author}",
    "help": "Select a spine to reveal the cover. Scroll or use the arrow keys to browse.",
    "previous": "Previous book",
    "next": "Next book",
    "favorite": "Favorite",
    "rating": "{rating}/10",
    "empty": "No books found. Try a different title, author, or topic.",
    "status": {
      "read": "Read",
      "reading": "Reading",
      "queued": "Queued",
      "wishlist": "Wishlist"
    }
  },
  "es": {
    "shelf": "Estantería interactiva",
    "bookLabel": "{title}, de {author}",
    "help": "Selecciona un lomo para ver la portada. Desplázate o usa las flechas para recorrer la estantería.",
    "previous": "Libro anterior",
    "next": "Siguiente libro",
    "favorite": "Favorito",
    "rating": "{rating}/10",
    "empty": "No se encontraron libros. Prueba con otro título, autor o tema.",
    "status": {
      "read": "Leído",
      "reading": "Leyendo",
      "queued": "En cola",
      "wishlist": "Lista de deseos"
    }
  }
}
</i18n>

<style scoped>
.book-shelf {
  --shelf-gutter: max(
    var(--site-gutter),
    calc((100% - var(--site-content-width)) / 2)
  );
  --book-height: clamp(14.5rem, 28vw, 24rem);
  --cover-width: calc(var(--book-height) * 0.63);
  --spine-width: calc(var(--book-height) * 0.175);
  background: var(--site-surface);
  color: var(--site-ink);
  border-block: 1px solid var(--site-line);
}

.shelf-viewport {
  position: relative;
  overflow: clip;
  padding-block: 2.1rem 1.5rem;
  touch-action: pan-y pinch-zoom;
  user-select: none;
  background: linear-gradient(180deg, #edf3fc, #e8f0fa 76%, #d3e0f0);
}

.shelf-viewport--dragging,
.shelf-viewport--dragging .book {
  cursor: grabbing;
}

.shelf-books {
  position: relative;
  height: var(--book-height);
}

.shelf-book {
  position: absolute;
  top: 0;
  left: 50%;
  width: calc(var(--book-height) * var(--hit-width));
  height: 100%;
  transform: translate3d(
    calc(-50% + var(--shift) * var(--book-height)),
    calc(var(--open) * -0.6rem),
    0
  );
}

.book {
  --binding: #183660;
  --print: #f1f6ff;
  --foil: #bbd2f8;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  color: var(--print);
  transform: rotate(calc(var(--open) * -3deg));
  cursor: pointer;
}

.book-body {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform: perspective(150rem) rotateY(calc(var(--open) * -90deg));
  pointer-events: none;
}

.book-face {
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  backface-visibility: hidden;
  background:
    radial-gradient(ellipse at top, #fff1 0%, transparent 66%),
    linear-gradient(90deg, #0005, #0000 14%, #0000 88%, #0003), var(--binding);
  border: 1px solid color-mix(in srgb, var(--site-navy) 32%, transparent);
  border-radius: 0.3rem 0.45rem 0.45rem 0.3rem;
  box-shadow: 0.32rem 0.5rem 0.65rem #132a4f45;
}

.book--cobalt {
  --binding: #1549b3;
  --foil: #c3d8ff;
}

.book--harbor {
  --binding: #314f6e;
  --foil: #c6d9ef;
}

.book--silver {
  --binding: #d4e4f9;
  --print: #142e5a;
  --foil: #325d9b;
}

.book--steel {
  --binding: #475d78;
  --foil: #dbe6f4;
}

.book--ink {
  --binding: #223047;
  --foil: #bed3ef;
}

.book--ocean {
  --binding: #2d527f;
  --foil: #c3daf9;
}

.book--mist {
  --binding: #e3eaf4;
  --print: #263958;
  --foil: #45638b;
}

@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .book {
    transition: translate 160ms ease-out;
  }

  .shelf-viewport:not(.shelf-viewport--dragging)
    .book[aria-pressed='false']:hover {
    translate: 0 -0.35rem;
  }
}

.book:focus-visible,
.shelf-controls button:focus-visible {
  outline: 2px solid var(--site-link);
  outline-offset: 3px;
}

.book-spine {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
  width: var(--spine-width);
  transform: translateX(-50%) translateZ(calc(var(--cover-width) * 0.5));
  padding: 1.1rem 0.35rem;
}

.book-spine::after {
  content: '';
  position: absolute;
  bottom: 5%;
  inset-inline: 18%;
  height: 0.3rem;
  border-block: 1px solid var(--foil);
  opacity: 0.58;
}

.spine-decoration {
  position: relative;
  display: block;
  width: 52%;
  aspect-ratio: 1;
  flex: none;
  border: 1px solid var(--foil);
  border-radius: 50%;
}

.spine-decoration::before {
  content: '';
  position: absolute;
  inset: 24%;
  border: 1px solid var(--foil);
  transform: rotate(45deg);
}

.book--cobalt .spine-decoration,
.book--ocean .spine-decoration {
  border-radius: 50% 50% 0 0;
}

.book--harbor .spine-decoration,
.book--ink .spine-decoration {
  width: 44%;
  border-radius: 0;
  transform: rotate(45deg);
}

.spine-title {
  min-height: 0;
  margin-bottom: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  writing-mode: vertical-rl;
  white-space: nowrap;
  font-size: clamp(0.88rem, 1.5vw, 1.28rem);
  line-height: 1.25;
  font-weight: 650;
}

.book-cover {
  display: flex;
  width: var(--cover-width);
  transform: translateX(-50%) rotateY(90deg)
    translateZ(calc(var(--spine-width) * 0.5));
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.4rem, 1.25vw, 0.9rem);
  padding: 0.9rem 0.75rem;
  text-align: center;
}

.book-cover::before {
  content: '';
  position: absolute;
  inset: 0.5rem;
  border: 1px solid var(--foil);
  border-radius: 0.14rem;
  pointer-events: none;
  opacity: 0.62;
  box-shadow:
    inset 0 0 0 2px var(--binding),
    inset 0 0 0 3px color-mix(in srgb, var(--foil), transparent 60%);
}

.cover-theme,
.cover-author {
  font-size: clamp(0.55rem, 0.9vw, 0.76rem);
  font-weight: 650;
  line-height: 1.25;
  text-wrap: balance;
}

.cover-theme {
  color: var(--foil);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.cover-title {
  font-size: clamp(1rem, 2.1vw, 2rem);
  line-height: 1.07;
  font-weight: 750;
  letter-spacing: -0.025em;
  text-wrap: balance;
  overflow-wrap: anywhere;
}

.cover-art {
  --print-size: clamp(2.25rem, 6vw, 5.5rem);
  width: var(--print-size);
  height: var(--print-size);
  display: grid;
  position: relative;
  place-items: center;
  flex: none;
  color: var(--foil);
}

.cover-art span {
  position: absolute;
  width: 61%;
  aspect-ratio: 1;
  border: 1px solid currentColor;
  transform: rotate(45deg);
}

.cover-art span:nth-child(2) {
  width: 80%;
  transform: rotate(25deg);
}

.cover-art span:nth-child(3) {
  width: 42%;
  border-radius: 50%;
  transform: none;
}

.book--silver .cover-art span,
.book--harbor .cover-art span,
.book--mist .cover-art span {
  border-radius: 50% 50% 0;
}

.book--ocean .cover-art span,
.book--steel .cover-art span {
  transform: rotate(18deg);
}

.shelf-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.35rem var(--shelf-gutter) 1.5rem;
  border-top: 1px solid var(--site-line);
}

.shelf-details {
  min-width: 0;
}

.shelf-caption {
  animation: show-caption 280ms ease-out both;
}

@keyframes show-caption {
  from {
    transform: translateY(0.25rem);
    opacity: 0.5;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.shelf-details h2 {
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  font-weight: 700;
  line-height: 1.18;
  overflow-wrap: anywhere;
}

.shelf-details p {
  color: var(--site-muted);
  margin-top: 0.2rem;
  font-size: 0.87rem;
}

.shelf-details .book-themes {
  margin-top: 0.4rem;
  font-size: 0.76rem;
  color: var(--site-muted);
}

.book-meta,
.shelf-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.book-meta {
  margin-top: 0.4rem;
  flex-wrap: wrap;
  color: var(--site-muted);
  font-size: 0.76rem;
}

.book-meta li:not(:first-child)::before {
  content: '·';
  margin-right: 0.5rem;
}

.shelf-controls {
  flex: none;
}

.shelf-controls button {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid var(--site-control-border);
  border-radius: 50%;
  color: var(--site-navy);
  cursor: pointer;
}

.shelf-controls button:not(:disabled):hover {
  background: var(--site-soft);
}

.shelf-controls button:disabled {
  cursor: default;
  opacity: 0.42;
}

.shelf-position {
  font-variant-numeric: tabular-nums;
  font-size: 0.79rem;
}

.shelf-empty {
  padding: 3rem var(--shelf-gutter);
}

@media (max-width: 600px) {
  .shelf-footer {
    flex-wrap: wrap;
  }

  .shelf-details {
    flex-basis: 100%;
  }

  .shelf-controls {
    margin-left: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shelf-caption {
    animation: none;
  }
}
</style>
