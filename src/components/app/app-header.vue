<template>
  <header class="app-header">
    <v-container
      class="flex items-center justify-center p-0"
      style="position: relative"
    >
      <v-card
        class="app-header__card animate__animated animate__fadeInDownBig animate__fast mx-2"
        :class="{ 'flex-1': $display.mdAndDown.value }"
      >
        <div class="flex items-center justify-between p-3">
          <nuxt-link
            to="/"
            class="font-bold text-secondary normal-case text-lg mr-4"
          >
            <v-avatar
              color="secondary"
              rounded="lg"
              variant="outlined"
              class="app-header__avatar"
            >
              JC
            </v-avatar>
          </nuxt-link>

          <v-fade-transition appear mode="out-in">
            <div v-if="$display.mdAndDown.value" class="flex flex-1">
              <div class="flex justify-center items-center flex-1">
                <nuxt-link
                  to="/"
                  class="app-header__name text-effect-1 italic font-black text-secondary normal-case"
                >
                  Jessé Correia
                </nuxt-link>
              </div>

              <div class="items-end">
                <v-btn
                  color="primary"
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

            <div v-else class="flex gap-1 items-end">
              <v-btn
                v-for="pageInfo in pageInfos"
                :key="pageInfo.title"
                :to="pageInfo.url"
                variant="text"
                color="secondary"
                class="app-header__button"
              >
                {{ pageInfo.title }}
              </v-btn>

              <v-btn
                color="secondary"
                variant="text"
                class="app-header__button"
                aria-label="Language"
              >
                <v-icon icon="fas fa-language" />

                <AppLanguageDropdownMenu eager />

                <template #append>
                  <v-icon
                    class="flex"
                    size="small"
                    color="secondary"
                    icon="fas fa-caret-down"
                  />
                </template>
              </v-btn>
            </div>
          </v-fade-transition>
        </div>
      </v-card>
    </v-container>
  </header>
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
.app-header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  height: 80px;
  width: 100%;
  left: 0;
  top: 0;
}

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

.app-header__name {
  font-size: clamp(10px, 4vw, 20px);
}
</style>
