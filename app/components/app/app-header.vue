<template>
  <header class="app-header">
    <UContainer class="px-4 py-3">
      <div
        class="animate__animated animate__fadeInDownBig animate__fast header-container mx-auto gap-3 flex w-full items-center justify-between rounded-2xl border border-white/60 bg-white/85 px-5 py-3 backdrop-blur-xl"
      >
        <NuxtLink
          to="/"
          class="flex items-center gap-3 text-secondary no-underline flex-1"
        >
          <div
            class="logo-container flex h-12 w-12 items-center justify-center rounded-xl border-2 border-secondary font-semibold text-secondary"
          >
            JC
          </div>

          <span class="text-base font-black text-secondary md:text-lg">
            Jessé Correia
          </span>
        </NuxtLink>

        <ClientOnly>
          <div v-if="isMobile" class="flex lg:w-full items-center justify-end gap-3">
            <AppLanguageDropdownMenu>
              <UButton
                color="gray"
                variant="soft"
                icon="i-heroicons-language-16-solid"
                trailing-icon="i-heroicons-chevron-down-16-solid"
              />
            </AppLanguageDropdownMenu>

            <UButton
              color="primary"
              variant="solid"
              icon="i-heroicons-bars-3"
              aria-label="Abrir menu"
              @click="drawer = !drawer"
            />
          </div>

          <nav v-else class="flex flex-1 items-center justify-end gap-1">
            <NuxtLink
              v-for="pageInfo in pageInfos"
              :key="pageInfo.title"
              :to="pageInfo.url"
              class="nav-link rounded-full px-4 py-2 text-sm font-medium text-secondary transition"
            >
              {{ pageInfo.title }}
            </NuxtLink>

            <AppLanguageDropdownMenu>
              <UButton
                color="gray"
                variant="ghost"
                trailing-icon="i-heroicons-chevron-down-16-solid"
              >
                <template #leading>
                  <i class="fas fa-language text-secondary" aria-hidden="true" />
                </template>
                <span class="ml-2 text-secondary">{{ t('language') }}</span>
              </UButton>
            </AppLanguageDropdownMenu>
          </nav>
        </ClientOnly>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const drawer = useVModel(props, 'modelValue', emit)
const pageInfos = usePortalPagesInfo()
const $display = useDisplay()
const { t } = useI18n({
  useScope: 'local',
})

const isMobile = computed(() => $display.mdAndDown.value)
</script>

<style scoped>
.app-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
}

.header-container {
  box-shadow: 
    0 4px 20px -4px rgba(0, 0, 0, 0.06),
    0 2px 6px -1px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.header-container:hover {
  box-shadow: 
    0 8px 28px -6px rgba(0, 0, 0, 0.08),
    0 4px 10px -2px rgba(0, 0, 0, 0.04);
}

.logo-container {
  transition: all 0.3s ease;
}

.logo-container:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform: translateX(-50%);
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link:hover::after {
  width: calc(100% - 32px);
}
</style>

<i18n lang="json">
{
  "pt-BR": {
    "language": "Idioma"
  },
  "en": {
    "language": "Language"
  },
  "es": {
    "language": "Idioma"
  }
}
</i18n>
