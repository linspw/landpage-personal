<template>
  <v-app-bar
    class="app-header"
    :class="{ 'app-header--backdrop': y > 0 }"
    :color="y > 0 ? 'rgb(255 255 255 / 40%)' : 'transparent'"
    rounded="b-lg"
    scroll-behavior="elevate"
  >
    <v-container class="d-flex align-center justify-space-between py-0">
      <nuxt-link to="/">
        <app-image
          src="/logo/logo.svg"
          alt="Main Project - Logo da marca"
          :height="60"
          :width="120"
          inline
          transition="fade-transition"
        />
      </nuxt-link>

      <v-fade-transition appear mode="out-in">
        <div v-if="!$display.mdAndUp.value" class="align-end">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            icon
            aria-label="Menu de navegação"
            @click="drawer = !drawer"
          >
            <v-icon icon="fas fa-bars" />
          </v-btn>
        </div>

        <div v-else class="d-flex gap-3 align-end">
          <v-btn color="primary" to="/" rounded="lg"> Home </v-btn>

          <v-btn color="primary" to="/sobre-nos" rounded="lg">
            Sobre Nós
          </v-btn>

          <v-btn color="primary" to="/contato" variant="outlined" rounded="lg">
            Contato
          </v-btn>
        </div>
      </v-fade-transition>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useVModel, useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const drawer = useVModel(props, 'modelValue', emit)
const $display = useDisplay()
</script>

<style lang="scss">
.app-header {
  transition:
    background-color 150ms,
    backdrop-filter 150ms;

  &--backdrop {
    backdrop-filter: saturate(180%) blur(14px);
  }
}
</style>
