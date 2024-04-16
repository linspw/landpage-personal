<template>
  <v-row>
    <v-col
      v-for="product in listOfBenefits"
      :key="product.name"
      cols="12"
      sm="6"
      class="benefits-feature__column flex"
    >
      <v-sheet
        class="benefits-feature__card flex flex-col md:flex-row items-center p-4"
        color="secondary"
        rounded="3xl"
        elevation="2"
      >
        <div class="benefits-feature__card-container-image">
          <app-image
            :src="product.image"
            :alt="`${product.name} image`"
            :width="160"
            :height="220"
            class="home-page-products-section__card-image"
            inline
          />
        </div>

        <div class="flex flex-col justify-center p-2 md:ml-4 w-100">
          <p class="font-family-red-hat-display text-center font-black mb-2">
            {{ product.name }}
          </p>

          <p class="text-body-2 text-center">{{ product.description }}</p>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const listOfBenefits = [
  {
    name: 'Soluções para Empresas',
    image: '/benefits/factory.svg',
    description:
      'Fornecemos o serviço de fabricação de dispositivos de testes, jigs e fixtures, protótipos e peças de uso final para empresas.',
  },
  {
    name: 'Orçamento Online Rápido e Fácil',
    image: '/benefits/feedback.svg',
    description:
      'Envie sua ideia e receba rapidamente um orçamento online, tornando o processo simples e ágil.',
  },
  {
    name: 'Presentes personalizados e exclusivos',
    image: '/benefits/gifts.svg',
    description:
      'Trabalhamos com a fabricação de presentes personalizados e brindes corporativos exclusivos.',
  },
  {
    name: 'Inovação em Suas Mãos',
    image: '/benefits/ideas.svg',
    description:
      'Materialize suas idéias. Oferecemos serviço desde a criação do seu modelo até serviços de pós-processamento',
  },
]
</script>

<style lang="scss">
.benefits-feature__column {
  min-height: 220px;
}

.benefits-feature__card {
  width: 100%;
  height: 100%;
  position: relative;
}

.benefits-feature__card-container-image {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
