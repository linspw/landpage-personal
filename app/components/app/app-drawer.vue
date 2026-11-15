<template>
  <USlideover
    v-model:open="drawer"
    side="right"
    :title="t('menu')"
    :description="t('navigation')"
    :ui="{
      content: 'sm:max-w-sm bg-[var(--site-surface)]',
      header: 'border-[var(--site-line)]',
      title: 'text-[var(--site-navy)]',
      description: 'sr-only',
      body: 'p-5',
      footer: 'border-[var(--site-line)]',
    }"
  >
    <template #body>
      <nav class="drawer-nav" :aria-label="t('navigation')">
        <NuxtLink
          v-for="page in pages"
          :key="page.url"
          :to="page.url"
          @click="drawer = false"
        >
          {{ page.title }}
        </NuxtLink>
        <NuxtLink to="/contact" @click="drawer = false">
          {{ $t('pages.contact.title') }}
        </NuxtLink>
      </nav>
    </template>

    <template #footer>
      <div class="drawer-language">
        <span>{{ t('language') }}</span>
        <AppLanguageDropdownMenu :label="t('language')" side="top" />
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
const drawer = defineModel<boolean>({ required: true })
const pages = usePortalPagesInfo()
const { t } = useI18n({ useScope: 'local' })
</script>

<i18n lang="json">
{
  "pt-BR": {
    "menu": "Menu",
    "language": "Idioma",
    "navigation": "Navegação principal"
  },
  "en": {
    "menu": "Menu",
    "language": "Language",
    "navigation": "Main navigation"
  },
  "es": {
    "menu": "Menú",
    "language": "Idioma",
    "navigation": "Navegación principal"
  }
}
</i18n>

<style scoped>
.drawer-nav {
  display: grid;
  gap: 0.25rem;
}

.drawer-nav a {
  display: flex;
  align-items: center;
  min-height: 48px;
  padding-inline: 0.75rem;
  border-radius: 0.55rem;
  color: var(--site-ink);
  font-weight: 650;
}

.drawer-nav a:hover,
.drawer-nav a.router-link-active {
  color: var(--site-link);
  background: var(--site-soft);
}

.drawer-nav a:focus-visible {
  outline: 2px solid var(--site-link);
  outline-offset: 2px;
}

.drawer-language {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: var(--site-muted);
  font-size: 0.875rem;
}
</style>
