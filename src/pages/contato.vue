<template>
  <div class="d-flex flex-column py-16 gap-16 fill-height">
    <app-section
      id="section-contato"
      title="Contato"
      description="Mande uma mensagem"
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
  title: 'Contato',
})
</script>
