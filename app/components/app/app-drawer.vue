<template>
  <USlideover v-model:open="drawer" side="right" :ui="{ width: 'max-w-sm' }">
    <template #content>
      <div class="flex h-full flex-col gap-6 p-6">
        <div class="flex items-center justify-between">
          <p class="text-lg font-semibold text-secondary">{{ t('menu') }}</p>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark"
            aria-label="Fechar menu"
            @click="drawer = false"
          />
        </div>

        <nav class="flex flex-col gap-2" role="navigation">
          <NuxtLink
            v-for="pageInfo in pageInfos"
            :key="pageInfo.title"
            :to="pageInfo.url"
            class="rounded-2xl px-4 py-3 text-base font-medium text-secondary transition hover:bg-primary/10"
            @click="drawer = false"
          >
            {{ pageInfo.title }}
          </NuxtLink>
        </nav>

        <div class="mt-auto">
          <p class="mb-2 text-sm font-semibold uppercase text-secondary/70">
            {{ t('language') }}
          </p>
          <AppLanguageDropdownMenu placement="top-end">
            <UButton
              color="gray"
              variant="soft"
              trailing-icon="i-heroicons-chevron-down-16-solid"
            >
              <template #leading>
                <i class="fas fa-language text-secondary" aria-hidden="true" />
              </template>
              <span class="ml-2">{{ $locale.toUpperCase() }}</span>
            </UButton>
          </AppLanguageDropdownMenu>
        </div>
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const drawer = useVModel(props, 'modelValue', emit)
const pageInfos = usePortalPagesInfo()

const { t } = useI18n({
  useScope: 'local',
})
</script>

<i18n lang="json">
{
  "pt-BR": {
    "menu": "Menu",
    "language": "Idioma"
  },
  "en": {
    "menu": "Menu",
    "language": "Language"
  },
  "es": {
    "menu": "Menú",
    "language": "Idioma"
  }
}
</i18n>
