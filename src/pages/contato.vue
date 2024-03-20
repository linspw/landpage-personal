<template>
  <app-page with-top-margin>
    <app-section
      :title="$t('pages.contact.title')"
      :description="$t('pages.contact.subtitle')"
      class="fill-height"
    >
      <v-container>
        <contact-feature />
      </v-container>
    </app-section>
  </app-page>
</template>

<script setup lang="ts">
useHead({
  title: 'pages.contact.title',
})
</script>
