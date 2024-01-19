<template>
  <app-section
    id="section-partners"
    title="Parceiros"
    description="Empresas que acreditam no nosso trabalho."
    color="black"
  >
    <v-container>
      <NuxtLazyHydrate when-idle>
        <partner-feature />
      </NuxtLazyHydrate>
    </v-container>
  </app-section>
</template>
