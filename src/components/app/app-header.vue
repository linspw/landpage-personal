<template>
  <v-app-bar
    class="app-header"
    rounded="b-lg"
    elevation="0"
    color="transparent"
    :height="80"
  >
    <v-container
      class="d-flex align-center justify-center pa-0"
      style="position: relative"
    >
      <v-card
        class="app-header__card animate__animated animate__fadeInDownBig animate__fast mx-2"
        :class="{ 'flex-1-1': $display.mdAndDown.value }"
      >
        <div class="d-flex align-center justify-space-between pa-4">
          <nuxt-link
            to="/"
            class="font-weight-bold text-secondary text-decoration-none text-h6 mr-4"
          >
            <v-avatar
              color="black"
              rounded="lg"
              variant="outlined"
              class="app-header__avatar"
            >
              JC
            </v-avatar>
          </nuxt-link>

          <v-fade-transition appear mode="out-in">
            <div v-if="$display.mdAndDown.value" class="d-flex flex-1-1">
              <div class="d-flex justify-center align-center flex-1-1">
                <nuxt-link
                  to="/"
                  class="font-weight-bold text-secondary text-decoration-none"
                >
                  Jessé Correia
                </nuxt-link>
              </div>

              <div class="align-end">
                <v-btn
                  color="secondary"
                  variant="tonal"
                  icon
                  aria-label="Menu de navegação"
                  size="small"
                  @click="drawer = !drawer"
                >
                  <v-icon icon="fas fa-bars" />
                </v-btn>
              </div>
            </div>

            <div v-else class="d-flex gap-1 align-end">
              <v-btn
                v-for="pageInfo in pageInfos"
                :key="pageInfo.title"
                color="secondary"
                :to="pageInfo.url"
                class="app-header__button"
              >
                {{ pageInfo.title }}
              </v-btn>

              <v-btn color="secondary" class="app-header__button">
                <v-icon icon="fas fa-language" />

                <AppLanguageDropdownMenu eager />

                <template #append>
                  <v-icon
                    class="d-flex"
                    size="small"
                    color="blue-darken-3"
                    icon="fas fa-caret-down"
                  />
                </template>
              </v-btn>
            </div>
          </v-fade-transition>
        </div>
      </v-card>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const drawer = useVModel(props, 'modelValue', emit)
const $display = useDisplay()
const pageInfos = usePortalPagesInfo()
</script>

<style lang="scss">
.app-header__avatar {
  &.v-avatar--variant-outlined {
    border: 2px solid currentColor;
  }
}

.app-header__button {
  font-weight: 500 !important;

  &.v-btn--active {
    font-weight: 700 !important;

    & .v-btn__overlay {
      background-color: transparent !important;
    }
  }

  & .v-btn__content {
    text-transform: none;
  }
}
</style>
