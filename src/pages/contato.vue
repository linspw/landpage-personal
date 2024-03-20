<template>
  <div class="d-flex flex-column" style="margin-top: 80px; min-height: 100dvh">
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
