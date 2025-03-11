<template>
  <app-page with-top-margin>
    <app-section
      :title="pageData?.title"
      :description="pageData?.date && formatDate(pageData.date)"
      :breadcrumbs="breadcrumbs"
      class="fill-height"
    >
      <v-container class="overflow-hidden">
        <ContentRenderer v-if="pageData" :value="pageData" :components="components" />

        <div v-else>Not found</div>
      </v-container>
    </app-section>
  </app-page>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/date/formatDate';

const route = useRoute()

const { data: pageData } = await useAsyncData(route.path, () => queryCollection('blog').path(route.path).first());

const components = {
  h1: 'ProseHidden',
}

const breadcrumbs = computed(() => [
  { title: 'Blog', to: '/blog' },
  pageData.value?.title ? { title: pageData.value.title } : { title: 'Not found'},
].filter(Boolean)); // Remove valores nulos

</script>
