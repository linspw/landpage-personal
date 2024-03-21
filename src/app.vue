<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const NuxtApp = useNuxtApp()
const title = 'Jessé Correia'
const description = 'Software Engineer'

const { t } = useI18n()

const i18nHead = useLocaleHead({
  addSeoAttributes: true,
})

const url = useRequestURL()
const origin = url.origin

useHead({
  titleTemplate: (titleChunk) => {
    const secondTitle = titleChunk?.includes('.')
      ? NuxtApp.$i18n.t(titleChunk)
      : titleChunk

    return secondTitle && secondTitle !== title
      ? `${title} - ${secondTitle}`
      : `${secondTitle} - ${description}`
  },
  meta: () => [
    ...(i18nHead.value?.meta || []),
    { name: 'description', content: description },
    { property: 'og:site_name', content: t('seo.siteName') },
    { property: 'og:url', content: `${origin}/` },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: t('seo.title') },
    { property: 'og:description', content: t('seo.description') },
    { property: 'og:image', content: `${origin}/images/meta/cover.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:domain', content: url.host },
    { name: 'twitter:url', content: `${origin}/` },
    { name: 'twitter:title', content: t('seo.title') },
    { name: 'twitter:description', content: t('seo.description') },
    { name: 'twitter:image', content: `${origin}/images/meta/cover.png` },
  ],
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
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
