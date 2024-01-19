<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const description = 'Software House'
const title = 'MainProject'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk && titleChunk !== title
      ? `${titleChunk} - ${title} - ${description}`
      : `${title} - ${description}`
  },
  meta: [{ name: 'description', content: description }],
  htmlAttrs: {
    lang: 'pt-BR',
  },
})

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
