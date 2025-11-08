<template>
  <app-page with-top-margin>
    <app-section
      :title="$t('pages.blog.title')"
      :description="$t('pages.blog.subtitle')"
      class="fill-height"
    >
      <div class="mx-auto grid w-full max-w-6xl gap-6 py-8 px-8 sm:grid-cols-2 lg:grid-cols-3">
        <UCard
          v-for="post in posts"
          :key="post.id"
          class="group flex h-full flex-col overflow-hidden border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
          :ui="{ body: 'flex h-full flex-col gap-4 p-6' }"
        >
          <NuxtLink :to="post.path" class="flex h-full flex-col gap-4 no-underline">
            <div
              v-if="post.thumbImageUrl"
              class="overflow-hidden rounded-2xl border border-white/5 bg-white/5"
            >
              <NuxtImg
                :src="post.thumbImageUrl"
                class="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                :alt="post.title"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div class="flex flex-col gap-2">
              <p class="text-sm font-semibold uppercase tracking-wide text-black/70">
                {{ formatDate(post.date) }}
              </p>
              <h3 class="text-xl font-bold text-black">
                {{ post.title }}
              </h3>
              <p class="text-sm text-black/80">
                {{ post.description }}
              </p>
            </div>

            <div class="mt-auto flex items-center justify-between pt-4 text-sm font-semibold text-black/80">
              <span class="uppercase tracking-wide">Leia mais</span>
              <UIcon name="i-heroicons-arrow-right-20-solid" />
            </div>
          </NuxtLink>
        </UCard>
      </div>
    </app-section>
  </app-page>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/date/formatDate'

const { data: posts } = await useAsyncData('posts', async () =>
  queryCollection('blog').order('date', 'DESC').all(),
)
</script>
