<template>
  <div class="home-page-hero d-flex align-md-center justify-center">
    <background-wave />

    <v-container>
      <div class="d-flex flex-column justify-center align-center pt-2 pb-16">
        <app-image
          :width="400"
          :height="200"
          alt="Lâmpada simbolizando Ideias e Inovações"
          src="/logo/logo.svg"
        />
      </div>

      <div class="d-flex flex-column align-center justify-center">
        <h1 class="text-h5 font-weight-bold text-uppercase mb-4 text-center">
          MainProject: Excelência em Tecnologia - Criando Tecnologias WEB de
          Última Geração
        </h1>

        <p class="text-body-1 text-center mb-4">
          A MainProject é uma Software House comprometida com a inovação e a
          excelência no desenvolvimento de soluções web de última geração.
          Combinamos expertise técnica, criatividade e qualidade para ajudar
          nossos clientes a ter sucesso no mundo digital.
        </p>

        <div
          class="text-h6 text-primary text-uppercase d-flex align-center justify-center justify-md-start mb-6"
        >
          Software House
        </div>

        <div class="d-flex justify-center justify-md-start">
          <v-btn color="primary" to="/contato" rounded="xl" size="large">
            Faça seu orçamento!
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { useLayout } from 'vuetify'

const { mainStyles } = useLayout()

const topPosition = computed(() => {
  return mainStyles.value['--v-layout-top']
})
</script>

<style lang="scss">
.home-page-hero {
  position: relative;
  min-height: calc(100dvh - v-bind('topPosition'));

  & .v-container {
    position: relative;
  }
}
</style>
