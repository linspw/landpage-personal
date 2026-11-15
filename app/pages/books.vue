<template>
  <app-page with-top-margin>
    <AppSection
      :title="t('pages.books.title')"
      :description="t('booksShelf.intro')"
      heading-tag="h1"
      class="flex-1"
    >
      <UContainer>
        <div class="books-search">
          <UInput
            ref="searchInput"
            v-model="searchQuery"
            :aria-label="t('booksShelf.search')"
            :placeholder="t('booksShelf.search')"
            icon="i-heroicons-magnifying-glass"
            size="xl"
            class="min-w-0 flex-1"
            :trailing="Boolean(searchQuery)"
          >
            <template v-if="searchQuery" #trailing>
              <UButton
                color="neutral"
                variant="ghost"
                size="sm"
                icon="i-heroicons-x-mark-16-solid"
                :aria-label="t('booksShelf.clearSearch')"
                @click="clearSearch"
              />
            </template>
          </UInput>
          <USelectMenu
            v-model="selectedTheme"
            :items="themeOptions"
            value-key="value"
            :aria-label="t('booksShelf.theme')"
            icon="i-heroicons-adjustments-horizontal-20-solid"
            size="xl"
            class="w-full sm:w-64"
          />
        </div>

        <div class="books-toolbar">
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
          <p class="books-read-count">
            <strong>{{ n(readCount) }}</strong>
            {{ t('booksShelf.readCountLabel', readCount) }}
          </p>
        </div>
      </UContainer>
      <BookShelf :books="shelfBooks" class="mt-3" />
    </AppSection>
  </app-page>
</template>

<script setup lang="ts">
import { bookTopics } from '~/assets/data/book-topics'
import BookShelf from '~/components/books/book-shelf.vue'
import type { BookStatus } from '~/interfaces/books'

useHead({ title: 'pages.books.title' })

const { t, n } = useI18n()
const searchQuery = ref('')
const searchInput = useTemplateRef('searchInput')

function clearSearch() {
  searchQuery.value = ''
  searchInput.value?.inputRef?.focus()
}
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
const readCount = allBooks.filter(
  ({ status }) => (status ?? 'read') === 'read',
).length
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
.books-search {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.books-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.15rem 1rem;
  margin-top: 0.65rem;
}

.books-filters {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.3rem;
  align-items: center;
}

.books-read-count {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  color: var(--site-muted);
  font-size: 0.82rem;
  font-weight: 650;
}

.books-read-count strong {
  color: var(--site-navy);
  font-size: 1.45rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.books-filters button {
  min-height: 44px;
  padding-inline: 0.15rem;
  border-bottom: 2px solid transparent;
  color: var(--site-muted);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 650;
}

.books-filters button:hover {
  color: var(--site-link);
}

.books-filters button[aria-pressed='true'] {
  color: var(--site-link);
  border-bottom-color: currentColor;
}

.books-filters button:focus-visible {
  outline: 2px solid var(--site-link);
  outline-offset: 2px;
}

@media (max-width: 639px) {
  .books-search {
    flex-direction: column;
  }

  .books-filters {
    column-gap: 0.65rem;
  }

  .books-filters button {
    padding-inline: 0.1rem;
  }
}
</style>
