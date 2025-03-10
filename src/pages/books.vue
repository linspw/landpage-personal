<template>
  <app-page with-top-margin>
    <app-section
      :title="$t('pages.books.title')"
      :description="$t('pages.books.subtitle')"
      class="fill-height"
    >
      <v-container class="overflow-hidden">
        <div class="d-flex mb-6">
          <v-card class="pa-4 flex flex-column align-center">
            <div class="text-h2 mb-2">{{ totalBooks }}</div>

            <div class="font-weight-semi-bold text-uppercase text-caption">
              Livros lidos
            </div>
          </v-card>
        </div>

        <v-row v-for="bookTopic in bookTopics" :key="bookTopic.title">
          <v-col cols="12" class="font-weight-bold">{{
            bookTopic.title
          }}</v-col>

          <app-show-animation>
            <v-col
              v-for="book in bookTopic.items"
              :key="book.title"
              cols="12"
              md="3"
            >
              <v-card class="animated-show pa-6">
                <div class="font-weight-medium mb-2">
                  {{ book.title }}
                </div>

                <div class="mb-2 font-italic">{{ book.author }}</div>

                <div class="d-flex flex-wrap gap-1">
                  <v-chip
                    v-for="theme in book.themes"
                    :key="theme"
                    variant="outlined"
                    density="compact"
                  >
                    {{ theme }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>
          </app-show-animation>
        </v-row>
      </v-container>
    </app-section>
  </app-page>
</template>

<script setup lang="ts">
import { bookTopics } from '~/assets/data/book-topics';
import { countTotalBooks } from '~/utils/books/countTotalBooks';

useHead({
  title: 'pages.books.title',
})

const totalBooks = computed(() => countTotalBooks(bookTopics))
</script>
