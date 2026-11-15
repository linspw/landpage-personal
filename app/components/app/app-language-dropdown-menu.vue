<template>
  <UDropdownMenu
    :items="dropdownItems"
    :content="{ side, align: 'end', sideOffset: 8 }"
    :ui="{ content: 'rounded-xl min-w-28' }"
  >
    <UButton
      class="language-trigger"
      color="neutral"
      variant="ghost"
      icon="i-heroicons-language-20-solid"
      trailing-icon="i-heroicons-chevron-down-16-solid"
      :aria-label="label"
    >
      {{ locale.split('-')[0]?.toUpperCase() }}
    </UButton>
  </UDropdownMenu>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    side?: 'top' | 'bottom'
  }>(),
  { side: 'bottom' },
)

const { locale, locales, setLocale } = useI18n()

const dropdownItems = computed(() =>
  locales.value.map((item) => ({
    label: item.name ?? item.code.toUpperCase(),
    icon: locale.value === item.code ? 'i-heroicons-check-16-solid' : undefined,
    onSelect: () => setLocale(item.code),
  })),
)
</script>

<style scoped>
.language-trigger {
  min-height: 44px;
  border-radius: 0.68rem;
  color: var(--site-muted);
  font-size: 0.76rem;
  font-weight: 720;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.language-trigger:hover {
  background: var(--site-soft);
  color: var(--site-link);
}

.language-trigger:focus-visible {
  outline: 2px solid var(--site-link);
  outline-offset: 2px;
}
</style>
