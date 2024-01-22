<template>
  <div class="d-flex flex-column py-16 gap-16 fill-height">
    <app-section
      :title="$t('pages.contact.title')"
      :description="$t('pages.contact.subtitle')"
      class="fill-height"
    >
      <v-container>
        <contact-feature />
      </v-container>
    </app-section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'pages.contact.title',
})
</script>
