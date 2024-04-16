<template>
  <v-navigation-drawer v-model="drawer" temporary location="right">
    <v-list role="navigation">
      <v-list-subheader role="contentinfo">{{ t('menu') }}</v-list-subheader>

      <v-list-item
        v-for="pageInfo in pageInfos"
        :key="pageInfo.title"
        :to="pageInfo.url"
        :active="false"
        rounded="xl"
      >
        {{ pageInfo.title }}
      </v-list-item>

      <v-list-item color="secondary" rounded="xl" role="button" @click.prevent>
        <template #prepend>
          <v-icon icon="fas fa-language" />
        </template>

        {{ t('language') }}

        <AppLanguageDropdownMenu eager />

        <template #append>
          <v-icon
            class="flex"
            size="small"
            color="secondary"
            icon="fas fa-caret-down"
          />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
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
