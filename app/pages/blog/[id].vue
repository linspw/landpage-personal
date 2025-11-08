<template>
  <app-page with-top-margin>
    <app-section
      :title="pageData?.title"
      :description="pageData?.date && formatDate(pageData.date)"
      :breadcrumbs="breadcrumbs"
      class="fill-height"
    >
      <div class="mx-auto w-full max-w-4xl space-y-8 py-6">
        <ContentRenderer
          v-if="pageData"
          :value="pageData"
          :components="components"
          class="blog-content space-y-6 text-lg leading-relaxed text-black"
        />

        <UAlert
          v-else
          color="red"
          variant="subtle"
          title="Post não encontrado"
          description="Volte para o blog para explorar outros conteúdos."
        />
      </div>
    </app-section>
  </app-page>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/date/formatDate'

const route = useRoute()

const { data: pageData } = await useAsyncData(route.path, () =>
  queryCollection('blog').path(route.path).first(),
)

const components = {
  h1: 'ProseHidden',
}

const breadcrumbs = computed(() => [
  { title: 'Blog', to: '/blog' },
  pageData.value?.title ? { title: pageData.value.title } : { title: 'Not found' },
].filter(Boolean))
</script>

<style scoped>
.blog-content :deep(h2),
.blog-content :deep(h3),
.blog-content :deep(h4) {
  font-weight: 700;
  color: #000000;
  margin-top: 2rem;
}

.blog-content :deep(p) {
  color: rgba(0, 0, 0, 0.85);
}

.blog-content :deep(a) {
  color: #63b4ff;
  text-decoration: underline;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
  margin-left: 1.5rem;
  list-style-position: outside;
}
</style>
