<template>
  <UDropdownMenu :items="dropdownItems" :content="content">
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-heroicons-language-16-solid"
      trailing-icon="i-heroicons-chevron-down-16-solid"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
const props = defineProps<{
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
}>()

const { locale, locales, setLocale } = useI18n()

const dropdownItems = computed(() =>
  locales.value.map((item) => ({
    label: item.code,
    icon: locale.value === item.code ? 'i-heroicons-check-16-solid' : undefined,
    onSelect: () => setLocale(item.code),
  })),
)

const content = computed(() => ({
  side: props.placement?.startsWith('top') ? 'top' as const : 'bottom' as const,
  align: props.placement?.endsWith('start') ? 'start' as const : 'end' as const,
}))
</script>
