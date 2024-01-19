<template>
  <div class="home-page-hero d-flex align-md-center justify-center">
    <background-wave />

    <v-container
      class="d-flex flex-column flex-md-row align-center justify-center"
    >
      <v-avatar
        color="grey"
        size="200"
        rounded="xl"
        class="elevation-24 mb-8 mb-md-0"
      >
        <v-img cover src="/images/avatars/my-photo.jpg"></v-img>
      </v-avatar>

      <div
        class="d-flex flex-column justify-center align-center flex-md-1-1 px-14"
      >
        <AppTypingEffectAnimation
          text="Jessé Correia"
          tag="h1"
          class="text-h3 text-md-h1 font-weight-bold text-secondary mb-6 text-center"
          :duration="5"
          :remove-cursor-on-end="false"
        />

        <div
          class="text-h5 text-md-h3 text-primary d-flex align-center justify-center justify-md-start mb-12 font-weight-thin text-center"
        >
          Engenheiro da Computação e Desenvolvedor Full Stack
        </div>

        <div class="d-flex flex-column flex-md-row justify-center gap-2">
          <v-btn-group
            color="secondary"
            rounded="xl"
            size="large"
            variant="text"
          >
            <v-btn rounded="0" href="https://github.com/linspw" target="_blank">
              <template #prepend><v-icon icon="fab fa-github" /></template>

              Github
            </v-btn>

            <v-btn
              rounded="0"
              href="https://www.linkedin.com/in/jessecorreialive/"
              target="_blank"
            >
              <template #prepend><v-icon icon="fab fa-linkedin" /></template>

              LinkedIn
            </v-btn>
          </v-btn-group>

          <v-btn
            color="secondary"
            to="/#section-skills"
            rounded="xl"
            size="large"
            class="order-first order-md-last"
            exact
            :active="false"
          >
            Conheça mais!
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { useLayout, useDisplay } from 'vuetify'

const { mainStyles } = useLayout()
const $display = useDisplay()

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
