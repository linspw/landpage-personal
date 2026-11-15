<template>
  <app-page with-top-margin>
    <div class="books-page">
      <UContainer class="books-heading">
        <h1 class="text-2xl font-bold uppercase md:text-3xl">
          {{ t('pages.books.title') }}
        </h1>
        <p>{{ t('booksShelf.intro') }}</p>

        <div class="books-search">
          <UInput
            v-model="searchQuery"
            :aria-label="t('booksShelf.search')"
            :placeholder="t('booksShelf.search')"
            icon="i-heroicons-magnifying-glass"
            size="lg"
            class="min-w-0 flex-1"
          />
          <USelectMenu
            v-model="selectedTheme"
            :items="themeOptions"
            value-key="value"
            :aria-label="t('booksShelf.theme')"
            size="lg"
            class="w-full sm:w-64"
          />
        </div>

        <div
          class="books-filters"
          role="group"
          :aria-label="t('booksShelf.filter')"
        >
          <button
            v-for="filter in filters"
            :key="filter"
            type="button"
            :aria-pressed="selectedFilter === filter"
            @click="selectedFilter = filter"
          >
            {{ t(`booksShelf.filters.${filter}`) }}
          </button>
        </div>
      </UContainer>

      <BookShelf :books="shelfBooks" />
    </div>
  </app-page>
</template>

<script setup lang="ts">
import { bookTopics } from '~/assets/data/book-topics'
import BookShelf from '~/components/books/book-shelf.vue'
import type { BookStatus } from '~/interfaces/books'

useHead({ title: 'pages.books.title' })

const { t } = useI18n()
const searchQuery = ref('')
const allThemes = '__all__'
const selectedTheme = ref(allThemes)
const filters = [
  'all',
  'read',
  'reading',
  'queued',
  'wishlist',
  'favorite',
] as const
const selectedFilter = ref<(typeof filters)[number]>('all')

const allBooks = bookTopics.flatMap((topic) => topic.items)
const themes = [...new Set(allBooks.flatMap((book) => book.themes))].sort(
  (a, b) => a.localeCompare(b, 'pt-BR'),
)
const themeOptions = computed(() => [
  { label: t('booksShelf.allThemes'), value: allThemes },
  ...[...themes]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))
    .map((theme) => ({
      label: theme,
      value: theme,
    })),
])

const searchable = (value: string) =>
  value
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

const indexedBooks = allBooks.map((book) => ({
  book,
  searchableText: searchable(`${book.title} ${book.author}`),
}))

const shelfBooks = computed(() => {
  const query = searchable(searchQuery.value)
  const filter = selectedFilter.value

  return indexedBooks
    .filter(({ book, searchableText }) => {
      const status: BookStatus = book.status ?? 'read'
      const matchesFilter =
        filter === 'all' ||
        (filter === 'favorite' ? book.favorite : status === filter)
      return (
        matchesFilter &&
        (selectedTheme.value === allThemes ||
          book.themes.includes(selectedTheme.value)) &&
        searchableText.includes(query)
      )
    })
    .map(({ book }) => book)
})
</script>

<style scoped>
.books-page {
  min-height: calc(100dvh - 80px);
  padding-bottom: clamp(2.5rem, 6vw, 5rem);
  background: #faf8f3;
}

.books-heading {
  --ui-text-dimmed: #625542;
  padding-block: clamp(1.45rem, 3.5vw, 2.6rem) 0.8rem;
}

.books-heading h1 {
  color: #2d281e;
}

.books-heading p {
  margin-block: 0.6rem 1.1rem;
  color: #534737;
  line-height: 1.55;
}

.books-search {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.books-filters {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.1rem;
  margin-top: 0.6rem;
  align-items: center;
}

.books-filters button {
  min-height: 44px;
  padding-inline: 0.15rem;
  border-bottom: 2px solid transparent;
  color: #625542;
  cursor: pointer;
  font-size: 0.87rem;
  font-weight: 650;
}

.books-filters button:hover,
.books-filters button[aria-pressed='true'] {
  color: #763c2d;
  border-bottom-color: currentColor;
}

.books-filters button:focus-visible {
  outline: 2px solid #763c2d;
  outline-offset: 2px;
}

@media (max-width: 639px) {
  .books-search {
    flex-direction: column;
  }

  .books-filters {
    column-gap: 0.9rem;
  }
}
</style>
