<template>
  <app-page with-top-margin>
    <app-section
      :title="$t('pages.books.title')"
      :description="$t('pages.books.subtitle')"
      class="pb-16"
    >
      <UContainer class="space-y-8 overflow-hidden">
        <!-- Stats Card -->
        <section class="stats-card flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white/92 p-8 text-center sm:flex-row sm:gap-8">
          <div class="flex flex-col items-center">
            <div class="text-5xl font-black text-primary">{{ totalReadBooks }}</div>
            <div class="text-xs font-semibold uppercase tracking-[0.4em] text-secondary/80">
              {{ t('readBooks') }}
            </div>
          </div>
          <div class="hidden h-12 w-px bg-slate-200 sm:block" />
          <div class="flex flex-col items-center">
            <div class="text-5xl font-black text-emerald-500">{{ readingBooks.length }}</div>
            <div class="text-xs font-semibold uppercase tracking-[0.4em] text-secondary/80">
              {{ t('reading') }}
            </div>
          </div>
          <div class="hidden h-12 w-px bg-slate-200 sm:block" />
          <div class="flex flex-col items-center">
            <div class="text-5xl font-black text-violet-500">{{ queuedBooks.length }}</div>
            <div class="text-xs font-semibold uppercase tracking-[0.4em] text-secondary/80">
              {{ t('queued') }}
            </div>
          </div>
          <div class="hidden h-12 w-px bg-slate-200 sm:block" />
          <div class="flex flex-col items-center">
            <div class="text-5xl font-black text-amber-500">{{ favoriteBooks.length }}</div>
            <div class="text-xs font-semibold uppercase tracking-[0.4em] text-secondary/80">
              {{ t('favorites') }}
            </div>
          </div>
        </section>

        <!-- Search and Filters -->
        <section class="flex flex-col gap-4 sm:flex-row">
          <UInput
            v-model="searchQuery"
            :placeholder="t('searchPlaceholder')"
            icon="i-heroicons-magnifying-glass"
            size="lg"
            class="flex-1"
            :ui="{ base: 'bg-white/90' }"
          />
          <USelectMenu
            v-model="selectedTheme"
            :items="themeOptions"
            :placeholder="t('allCategories')"
            size="lg"
            class="w-full sm:w-64"
          />
        </section>

        <!-- Tabs -->
        <UTabs
          v-model="activeTab"
          :items="tabItems"
          class="w-full"
          :ui="{
            list: 'bg-white/80 border border-slate-200/80 rounded-2xl p-1',
            trigger: 'rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white font-semibold',
          }"
        >
          <template #list="{ items }">
            <div class="flex w-full gap-1 rounded-2xl border border-slate-200/80 bg-white/80 p-1.5 backdrop-blur-sm">
              <button
                v-for="item in items"
                :key="item.value"
                class="tab-button flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                :class="activeTab === item.value ? 'bg-primary text-white shadow-md' : 'text-secondary/80 hover:bg-slate-100'"
                @click="activeTab = item.value"
              >
                {{ item.label }}
              </button>
            </div>
          </template>

          <template #content="{ item }">
            <div class="mt-6">
              <!-- Em Andamento Tab -->
              <div v-if="item.value === 'progress'" class="space-y-8">
                <!-- Lendo -->
                <section v-if="readingBooks.length > 0" class="space-y-4">
                  <div class="flex items-center gap-3">
                    <span class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                      <UIcon name="i-heroicons-book-open" class="h-5 w-5 text-emerald-600" />
                    </span>
                    <p class="text-xl font-bold text-secondary">
                      {{ t('readingNow') }}
                      <span class="ml-2 text-sm font-normal text-secondary/60">({{ readingBooks.length }})</span>
                    </p>
                  </div>
                  <app-show-animation>
                    <div class="overflow-hidden rounded-2xl border border-emerald-200/80 bg-emerald-50/50">
                      <div
                        v-for="book in readingBooks"
                        :key="book.title"
                        class="list-row flex items-center gap-3 border-b border-emerald-100 px-4 py-3 last:border-b-0 sm:gap-4 sm:px-6 sm:py-4"
                      >
                        <UIcon name="i-heroicons-book-open-solid" class="h-5 w-5 shrink-0 text-emerald-500" />
                        <div class="min-w-0 flex-1">
                          <h4 class="truncate text-sm font-semibold text-secondary sm:text-base">{{ book.title }}</h4>
                          <p class="truncate text-xs text-secondary/70 sm:text-sm">{{ book.author }}</p>
                        </div>
                        <div class="hidden shrink-0 gap-1 md:flex">
                          <span
                            v-for="theme in book.themes.slice(0, 2)"
                            :key="theme"
                            class="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700/70"
                          >
                            {{ theme }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </app-show-animation>
                </section>

                <!-- Na Fila -->
                <section v-if="queuedBooks.length > 0" class="space-y-4">
                  <div class="flex items-center gap-3">
                    <span class="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">
                      <UIcon name="i-heroicons-queue-list" class="h-5 w-5 text-violet-600" />
                    </span>
                    <p class="text-xl font-bold text-secondary">
                      {{ t('upNext') }}
                      <span class="ml-2 text-sm font-normal text-secondary/60">({{ queuedBooks.length }})</span>
                    </p>
                  </div>
                  <app-show-animation>
                    <div class="overflow-hidden rounded-2xl border border-violet-200/80 bg-violet-50/50">
                      <div
                        v-for="(book, index) in queuedBooks"
                        :key="book.title"
                        class="list-row flex items-center gap-3 border-b border-violet-100 px-4 py-3 last:border-b-0 sm:gap-4 sm:px-6 sm:py-4"
                      >
                        <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-200 text-sm font-bold text-violet-700">
                          {{ index + 1 }}
                        </div>
                        <div class="min-w-0 flex-1">
                          <h4 class="truncate text-sm font-semibold text-secondary sm:text-base">{{ book.title }}</h4>
                          <p class="truncate text-xs text-secondary/70 sm:text-sm">{{ book.author }}</p>
                        </div>
                        <div class="hidden shrink-0 gap-1 md:flex">
                          <span
                            v-for="theme in book.themes.slice(0, 2)"
                            :key="theme"
                            class="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700/70"
                          >
                            {{ theme }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </app-show-animation>
                </section>

                <!-- Lista de Desejos -->
                <section v-if="wishlistBooks.length > 0" class="space-y-4">
                  <div class="flex items-center gap-3">
                    <span class="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                      <UIcon name="i-heroicons-heart" class="h-5 w-5 text-pink-600" />
                    </span>
                    <p class="text-xl font-bold text-secondary">
                      {{ t('wishlistTitle') }}
                      <span class="ml-2 text-sm font-normal text-secondary/60">({{ wishlistBooks.length }})</span>
                    </p>
                  </div>
                  <app-show-animation>
                    <div class="overflow-hidden rounded-2xl border border-pink-200/80 bg-pink-50/50">
                      <div
                        v-for="book in wishlistBooks"
                        :key="book.title"
                        class="list-row flex items-center gap-3 border-b border-pink-100 px-4 py-3 last:border-b-0 sm:gap-4 sm:px-6 sm:py-4"
                      >
                        <UIcon name="i-heroicons-heart-solid" class="h-5 w-5 shrink-0 text-pink-400" />
                        <div class="min-w-0 flex-1">
                          <h4 class="truncate text-sm font-semibold text-secondary sm:text-base">{{ book.title }}</h4>
                          <p class="truncate text-xs text-secondary/70 sm:text-sm">{{ book.author }}</p>
                        </div>
                        <div class="hidden shrink-0 gap-1 md:flex">
                          <span
                            v-for="theme in book.themes.slice(0, 2)"
                            :key="theme"
                            class="rounded-full bg-pink-100 px-2.5 py-1 text-xs font-medium text-pink-700/70"
                          >
                            {{ theme }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </app-show-animation>
                </section>

                <div v-if="readingBooks.length === 0 && queuedBooks.length === 0 && wishlistBooks.length === 0" class="py-16 text-center text-secondary/60">
                  {{ t('noProgressBooks') }}
                </div>
              </div>

              <!-- Lista Tab -->
              <div v-else-if="item.value === 'list'" class="space-y-8">
                <section
                  v-for="bookTopic in filteredBookTopics"
                  :key="bookTopic.title"
                  class="space-y-4"
                >
                  <p class="text-xl font-bold text-secondary">
                    {{ bookTopic.title }}
                    <span class="ml-2 text-sm font-normal text-secondary/60">({{ bookTopic.items.length }})</span>
                  </p>

                  <app-show-animation>
                    <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/92">
                      <div
                        v-for="book in bookTopic.items"
                        :key="book.title"
                        class="list-row flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 sm:gap-4 sm:px-6 sm:py-4"
                      >
                        <!-- Favorite Icon -->
                        <UIcon
                          v-if="book.favorite"
                          name="i-heroicons-heart-solid"
                          class="h-4 w-4 shrink-0 text-rose-500 sm:h-5 sm:w-5"
                        />
                        <div v-else class="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

                        <!-- Rating Badge -->
                        <div v-if="book.rating" class="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-1 sm:px-2.5">
                          <UIcon name="i-heroicons-star-solid" class="h-3.5 w-3.5 text-amber-500 sm:h-4 sm:w-4" />
                          <span class="text-xs font-bold text-amber-700 sm:text-sm">{{ book.rating.toFixed(1) }}</span>
                        </div>
                        <div v-else class="w-12 shrink-0 sm:w-14" />

                        <!-- Book Info -->
                        <div class="min-w-0 flex-1">
                          <h4 class="truncate text-sm font-semibold text-secondary sm:text-base">{{ book.title }}</h4>
                          <p class="truncate text-xs text-secondary/70 sm:text-sm">{{ book.author }}</p>
                        </div>

                        <!-- Themes (hidden on mobile) -->
                        <div class="hidden shrink-0 gap-1 md:flex">
                          <span
                            v-for="theme in book.themes.slice(0, 2)"
                            :key="theme"
                            class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-secondary/70"
                          >
                            {{ theme }}
                          </span>
                          <span v-if="book.themes.length > 2" class="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-secondary/50">
                            +{{ book.themes.length - 2 }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </app-show-animation>
                </section>

                <div v-if="filteredBookTopics.length === 0" class="py-16 text-center text-secondary/60">
                  {{ t('noResults') }}
                </div>
              </div>

              <!-- Ranking Tab -->
              <div v-else-if="item.value === 'ranking'" class="space-y-6">
                <!-- Ranking Category Filter -->
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="cat in rankingCategoryOptions"
                    :key="cat"
                    class="rounded-full px-4 py-2 text-sm font-medium transition-all"
                    :class="rankingCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-white/80 text-secondary/80 hover:bg-slate-100 border border-slate-200'"
                    @click="rankingCategory = cat"
                  >
                    {{ cat }}
                  </button>
                </div>

                <!-- Ranking List -->
                <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/92">
                  <div
                    v-for="(book, index) in rankedBooks"
                    :key="book.title"
                    class="ranking-row flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 sm:gap-4 sm:px-6 sm:py-4"
                  >
                    <!-- Position -->
                    <div
                      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black sm:h-10 sm:w-10 sm:text-base"
                      :class="getRankingClass(index)"
                    >
                      {{ index + 1 }}
                    </div>

                    <!-- Rating Badge -->
                    <div class="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-1 sm:px-2.5">
                      <UIcon name="i-heroicons-star-solid" class="h-3.5 w-3.5 text-amber-500 sm:h-4 sm:w-4" />
                      <span class="text-xs font-bold text-amber-700 sm:text-sm">{{ book.rating?.toFixed(1) }}</span>
                    </div>

                    <!-- Book Info -->
                    <div class="min-w-0 flex-1">
                      <h4 class="truncate text-sm font-semibold text-secondary sm:text-base">{{ book.title }}</h4>
                      <p class="truncate text-xs text-secondary/70 sm:text-sm">{{ book.author }}</p>
                    </div>

                    <!-- Category (hidden on small screens) -->
                    <span class="hidden shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-secondary/70 md:block">
                      {{ book.category }}
                    </span>
                  </div>
                </div>

                <div v-if="rankedBooks.length === 0" class="py-16 text-center text-secondary/60">
                  {{ t('noResults') }}
                </div>
              </div>

              <!-- Timeline Tab -->
              <div v-else-if="item.value === 'timeline'" class="space-y-8">
                <div v-for="yearGroup in timelineBooks" :key="yearGroup.year" class="space-y-4">
                  <h3 class="flex items-center gap-3 text-2xl font-black text-secondary">
                    <span class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg text-primary">
                      <UIcon name="i-heroicons-calendar" />
                    </span>
                    {{ yearGroup.year }}
                    <span class="text-sm font-normal text-secondary/60">({{ yearGroup.books.length }} {{ yearGroup.books.length === 1 ? 'livro' : 'livros' }})</span>
                  </h3>
                  <div class="ml-6 border-l-2 border-primary/20 pl-6">
                    <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/92">
                      <div
                        v-for="book in yearGroup.books"
                        :key="book.title"
                        class="timeline-row flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 sm:gap-4 sm:px-6 sm:py-4"
                      >
                        <!-- Month Badge -->
                        <span class="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                          {{ formatMonth(book.readDate) }}
                        </span>

                        <!-- Rating Badge -->
                        <div v-if="book.rating" class="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-1">
                          <UIcon name="i-heroicons-star-solid" class="h-3.5 w-3.5 text-amber-500" />
                          <span class="text-xs font-bold text-amber-700">{{ book.rating.toFixed(1) }}</span>
                        </div>

                        <!-- Book Info -->
                        <div class="min-w-0 flex-1">
                          <h4 class="truncate text-sm font-semibold text-secondary sm:text-base">{{ book.title }}</h4>
                          <p class="truncate text-xs text-secondary/70 sm:text-sm">{{ book.author }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="timelineBooks.length === 0" class="py-16 text-center text-secondary/60">
                  {{ t('noDatedBooks') }}
                </div>
              </div>
            </div>
          </template>
        </UTabs>
      </UContainer>
    </app-section>
  </app-page>
</template>

<script setup lang="ts">
import { bookTopics } from '~/assets/data/book-topics'
import { countTotalBooks } from '~/utils/books/countTotalBooks'
import type { Book } from '~/interfaces/books'

useHead({
  title: 'pages.books.title',
})

const { t } = useI18n({
  useScope: 'local',
})

// State
const searchQuery = ref('')
const selectedTheme = ref<string | undefined>(undefined)
const activeTab = ref('list')
const rankingCategory = ref('Todos')

// Computed
const totalBooks = computed(() => countTotalBooks(bookTopics))

const allBooks = computed(() =>
  bookTopics.flatMap((topic) =>
    topic.items.map((book) => ({ ...book, category: topic.title }))
  )
)

// Livros lidos (sem status ou status === 'read')
const totalReadBooks = computed(() =>
  allBooks.value.filter((book) => !book.status || book.status === 'read').length
)

// Livros lendo atualmente
const readingBooks = computed(() =>
  allBooks.value.filter((book) => book.status === 'reading')
)

// Livros na fila (próximas leituras)
const queuedBooks = computed(() =>
  allBooks.value.filter((book) => book.status === 'queued')
)

// Lista de desejos
const wishlistBooks = computed(() =>
  allBooks.value.filter((book) => book.status === 'wishlist')
)

const favoriteBooks = computed(() =>
  allBooks.value.filter((book) => book.favorite)
)

// Get unique themes
const allThemes = computed(() => {
  const themes = new Set<string>()
  allBooks.value.forEach((book) => {
    book.themes.forEach((theme) => themes.add(theme))
  })
  return Array.from(themes).sort()
})

const themeOptions = computed(() => [
  t('allCategories'),
  ...allThemes.value,
])

// Filter books
const filterBooks = (books: Book[]) => {
  return books.filter((book) => {
    const matchesSearch =
      !searchQuery.value ||
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesTheme =
      !selectedTheme.value ||
      selectedTheme.value === t('allCategories') ||
      book.themes.includes(selectedTheme.value)

    return matchesSearch && matchesTheme
  })
}

// Filter books for "Lidos" tab - only show read books (no status or status === 'read')
const filterReadBooks = (books: Book[]) => {
  return filterBooks(books).filter((book) => !book.status || book.status === 'read')
}

const filteredBookTopics = computed(() =>
  bookTopics
    .map((topic) => ({
      ...topic,
      items: filterReadBooks(topic.items),
    }))
    .filter((topic) => topic.items.length > 0)
)

// Ranking category options
const rankingCategoryOptions = computed(() => [
  'Todos',
  ...bookTopics.map((topic) => topic.title),
])

// Ranking: books sorted by rating (only those with rating and read status)
const rankedBooks = computed(() => {
  let books = filterBooks(allBooks.value).filter((book) => 
    book.rating && (!book.status || book.status === 'read')
  )

  // Filter by ranking category if not 'Todos'
  if (rankingCategory.value !== 'Todos') {
    books = books.filter((book) => book.category === rankingCategory.value)
  }

  return books.sort((a, b) => (b.rating || 0) - (a.rating || 0))
})

// Timeline: books grouped by year (only read books)
const timelineBooks = computed(() => {
  const booksWithDate = filterBooks(allBooks.value).filter((book) => 
    book.readDate && (!book.status || book.status === 'read')
  )

  const yearGroups: Record<string, Book[]> = {}
  booksWithDate.forEach((book) => {
    const year = book.readDate!.split('-')[0]
    if (!yearGroups[year]) yearGroups[year] = []
    yearGroups[year].push(book)
  })

  return Object.entries(yearGroups)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, books]) => ({
      year,
      books: books.sort((a, b) => {
        const [, monthA] = a.readDate!.split('-')
        const [, monthB] = b.readDate!.split('-')
        return Number(monthB) - Number(monthA)
      }),
    }))
})

// Tabs
const tabItems = computed(() => [
  { label: t('tabs.list'), value: 'list' },
  { label: t('tabs.progress'), value: 'progress' },
  { label: t('tabs.ranking'), value: 'ranking' },
  { label: t('tabs.timeline'), value: 'timeline' },
])

// Helpers
const getRankingClass = (index: number) => {
  if (index === 0) return 'bg-amber-400 text-white'
  if (index === 1) return 'bg-slate-400 text-white'
  if (index === 2) return 'bg-amber-700 text-white'
  return 'bg-slate-100 text-secondary/80'
}

const formatMonth = (date?: string) => {
  if (!date) return ''
  const [year, month] = date.split('-')
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  return `${months[Number(month) - 1]} ${year}`
}
</script>

<i18n lang="json">
{
  "en": {
    "readBooks": "Read",
    "reading": "Reading",
    "queued": "Queued",
    "wishlist": "Wishlist",
    "favorites": "Favorites",
    "readingNow": "Currently Reading",
    "upNext": "Up Next",
    "wishlistTitle": "Wishlist",
    "noProgressBooks": "No books in progress or queued.",
    "searchPlaceholder": "Search by title or author...",
    "allCategories": "All categories",
    "noResults": "No books found with the applied filters.",
    "noDatedBooks": "No books with reading date registered.",
    "tabs": {
      "progress": "Reading Roadmap",
      "list": "Read",
      "ranking": "Ranking",
      "timeline": "Timeline"
    }
  },
  "pt-BR": {
    "readBooks": "Lidos",
    "reading": "Lendo",
    "queued": "Na Fila",
    "wishlist": "Desejos",
    "favorites": "Favoritos",
    "readingNow": "Lendo Agora",
    "upNext": "Próximas Leituras",
    "wishlistTitle": "Lista de Desejos",
    "noProgressBooks": "Nenhum livro em andamento ou na fila.",
    "searchPlaceholder": "Buscar por título ou autor...",
    "allCategories": "Todas as categorias",
    "noResults": "Nenhum livro encontrado com os filtros aplicados.",
    "noDatedBooks": "Nenhum livro com data de leitura registrada.",
    "tabs": {
      "progress": "Roadmap de Leitura",
      "list": "Lidos",
      "ranking": "Ranking",
      "timeline": "Linha do Tempo"
    }
  },
  "es": {
    "readBooks": "Leídos",
    "reading": "Leyendo",
    "queued": "En Cola",
    "wishlist": "Deseos",
    "favorites": "Favoritos",
    "readingNow": "Leyendo Ahora",
    "upNext": "Próximas Lecturas",
    "wishlistTitle": "Lista de Deseos",
    "noProgressBooks": "No hay libros en progreso o en cola.",
    "searchPlaceholder": "Buscar por título o autor...",
    "allCategories": "Todas las categorías",
    "noResults": "No se encontraron libros con los filtros aplicados.",
    "noDatedBooks": "No hay libros con fecha de lectura registrada.",
    "tabs": {
      "progress": "Roadmap de Leitura",
      "list": "Leídos",
      "ranking": "Ranking",
      "timeline": "Línea de Tiempo"
    }
  }
}
</i18n>

<style scoped>
.stats-card {
  box-shadow:
    0 4px 16px -4px rgba(0, 0, 0, 0.06),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.tab-button {
  transition: all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.list-row,
.ranking-row,
.timeline-row {
  transition: background-color 0.2s ease;
}

.list-row:hover,
.ranking-row:hover,
.timeline-row:hover {
  background-color: rgba(1, 83, 255, 0.03);
}
</style>

