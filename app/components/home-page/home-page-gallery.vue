<template>
  <div id="galeria" class="home-gallery">
    <UModal
      v-model:open="expanded"
      :title="t('title')"
      :description="motion === 'reduce' ? undefined : t('hint')"
      :transition="motion !== 'reduce'"
      :ui="{
        overlay: 'bg-slate-950/55',
        content:
          'max-w-[76rem] divide-none rounded-2xl bg-[var(--site-surface)]',
      }"
    >
      <UButton
        color="neutral"
        variant="ghost"
        class="gallery-expand gallery-action"
        icon="i-heroicons-arrows-pointing-out-20-solid"
        :aria-label="t('expandLabel')"
      />

      <template #content="{ close }">
        <InfiniteDrift
          v-if="expanded"
          class="gallery-expanded"
          :bands="bands"
          :label="t('expandedPreview')"
          height="clamp(19rem, calc(100dvh - 3.5rem), 42rem)"
          :image-height="110"
          :gap="20"
        />
        <UButton
          color="neutral"
          variant="solid"
          class="gallery-close gallery-action"
          icon="i-heroicons-x-mark-20-solid"
          :aria-label="t('close')"
          @click="close"
        />
      </template>
    </UModal>

    <InfiniteDrift
      class="gallery-preview"
      :bands="compactBands"
      :enabled="!expanded"
      :label="t('preview')"
      height="clamp(14.5rem, 23vw, 20.5rem)"
      :image-height="109"
      :image-radius="12"
      :gap="16"
    />
  </div>
</template>

<script setup lang="ts">
import { usePreferredReducedMotion } from '@vueuse/core'
import InfiniteDrift from '~/components/effects/infinite-drift.vue'
import type { InfiniteDriftBand } from '~/utils/infinite-drift'

const props = withDefaults(defineProps<{
  tiltDirection?: 'left' | 'right'
}>(), {
  tiltDirection: 'left',
})

const { t } = useI18n({ useScope: 'local' })
const expanded = ref(false)
const motion = usePreferredReducedMotion()

const rows = [
  {
    files: ['mountain-night', 'himalayas', 'ascent-ridge', 'trekking-mist'],
    offsetY: -320,
    speed: 1,
    curveAmount: 40,
  },
  {
    files: ['alpine-hikers', 'summit', 'snow-leopard-portrait', 'mountain-day'],
    offsetY: -160,
    speed: 1.3,
    curveAmount: 35,
  },
  {
    files: ['mountain-day', 'snow-leopard-himalayas', 'himalayas', 'snow-leopard-portrait'],
    offsetY: 0,
    speed: 0.7,
    curveAmount: 40,
  },
  {
    files: ['summit', 'ascent-ridge', 'rock-climbing', 'alpine-hikers'],
    offsetY: 160,
    speed: 1.2,
    curveAmount: 40,
  },
  {
    files: ['himalayas', 'trekking-mist', 'mountain-night', 'mountain-day'],
    offsetY: 320,
    speed: 0.9,
    curveAmount: 35,
  },
]

const bands = computed<InfiniteDriftBand[]>(() => {
  const rotation = props.tiltDirection === 'right' ? -7 : 7
  return rows.map(({ files, ...band }) => ({
    ...band,
    rotation,
    images: files.map((file) => `/images/infinite-drift/snowl/${file}.webp`),
  }))
})

const compactBands = computed(() =>
  [4, 2, 3].map((index) => ({
    ...bands.value[index]!,
    offsetY: undefined,
  })),
)
</script>

<i18n lang="json">
{
  "pt-BR": {
    "title": "Galeria SNOWL",
    "preview": "Prévia da galeria SNOWL com montanhas e leopardos-da-neve",
    "expandedPreview": "Faixas da galeria SNOWL",
    "expandLabel": "Expandir galeria",
    "close": "Fechar galeria",
    "hint": "Arraste as faixas ou use as setas do teclado para explorar as imagens."
  },
  "en": {
    "title": "SNOWL gallery",
    "preview": "SNOWL gallery preview with mountains and snow leopards",
    "expandedPreview": "SNOWL gallery bands",
    "expandLabel": "Expand gallery",
    "close": "Close gallery",
    "hint": "Drag the bands or use the arrow keys to explore the images."
  },
  "es": {
    "title": "Galería SNOWL",
    "preview": "Vista previa de la galería SNOWL con montañas y leopardos de las nieves",
    "expandedPreview": "Franjas de la galería SNOWL",
    "expandLabel": "Ampliar galería",
    "close": "Cerrar galería",
    "hint": "Arrastra las franjas o usa las flechas del teclado para explorar las imágenes."
  }
}
</i18n>

<style scoped>
.home-gallery {
  position: relative;
  min-width: 0;
  scroll-margin-block-start: calc(var(--site-header-height) + 1rem);
}

.gallery-preview,
.gallery-expanded {
  --drift-background: transparent;
}

.gallery-preview {
  mask-image: linear-gradient(to right, transparent, black 7% 93%, transparent);
}

.gallery-preview:focus-visible {
  mask-image: none;
  border-radius: 0.7rem;
}

.gallery-action {
  position: absolute;
  z-index: 1;
  inset: 0.65rem 0.65rem auto auto;
  display: grid;
  place-items: center;
  width: 44px;
  min-height: 44px;
  padding: 0;
  border: 1px solid var(--site-line);
  border-radius: 0.65rem;
  background: var(--site-surface);
  color: var(--site-navy);
}

.gallery-action:hover {
  background: var(--site-soft);
  color: var(--site-link);
}

.gallery-action:focus-visible {
  outline: 2px solid var(--site-link);
  outline-offset: 2px;
}

.gallery-expand {
  border: 0;
  background: rgb(20 43 80 / 68%);
  color: white;
  -webkit-backdrop-filter: blur(12px) saturate(130%);
  backdrop-filter: blur(12px) saturate(130%);
}

.gallery-expand:hover {
  background: rgb(20 43 80 / 80%);
  color: white;
}

@media (hover: hover) and (pointer: fine) {
  .gallery-expand {
    opacity: 0;
    pointer-events: none;
  }

  .home-gallery:hover .gallery-expand,
  .gallery-expand:focus-visible {
    opacity: 1;
    pointer-events: auto;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .gallery-expand {
    transition: opacity 140ms ease-out;
  }
}
</style>
