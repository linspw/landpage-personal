<template>
  <app-page with-top-margin>
    <app-section
      :title="$t('pages.contact.title')"
      :description="$t('pages.contact.subtitle')"
      class="flex-1"
    >
      <UContainer class="py-8">
        <contact-feature />
      </UContainer>
    </app-section>
  </app-page>
</template>

<script setup lang="ts">
useHead({
  title: 'pages.contact.title',
})
</script>
