<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const NuxtApp = useNuxtApp()
const description = 'Software Engineer'
const title = 'Jessé Correia'

useHead({
  titleTemplate: (titleChunk) => {
    const secondTitle = titleChunk?.includes('.')
      ? NuxtApp.$i18n.t(titleChunk)
      : titleChunk

    return secondTitle && secondTitle !== title
      ? `${title} - ${secondTitle}`
      : `${secondTitle} - ${description}`
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
