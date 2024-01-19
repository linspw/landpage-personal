<template>
  <div class="d-flex flex-column py-16 gap-16">
    <v-container>
      <app-section
        id="section-contato"
        title="Contato"
        description="Faça o orçamento conosco ou tire dúvidas."
      >
        <contact-feature />
      </app-section>
    </v-container>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Contato',
})
</script>
