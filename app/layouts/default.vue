<template>
  <div class="site-layout">
    <a class="site-skip" href="#main-content">{{ t('skip') }}</a>
    <AppHeader v-model="drawerIsOpen" />

    <main id="main-content" tabindex="-1">
      <slot />
    </main>

    <AppFooter />

    <ClientOnly>
      <LazyAppDrawer v-model="drawerIsOpen" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const drawerIsOpen = ref(false)
const { t } = useI18n({ useScope: 'local' })
</script>

<i18n lang="json">
{
  "pt-BR": { "skip": "Ir para o conteúdo" },
  "en": { "skip": "Skip to content" },
  "es": { "skip": "Ir al contenido" }
}
</i18n>

<style scoped>
.site-layout {
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  background: var(--site-canvas);
}

#main-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  overflow-x: clip;
  scroll-margin-top: var(--site-header-height);
}

.site-skip {
  position: fixed;
  z-index: 1200;
  inset: 0.75rem auto auto var(--site-gutter);
  padding: 0.7rem 1rem;
  border-radius: 0.5rem;
  background: var(--site-navy);
  color: white;
  transform: translateY(calc(-100% - 1rem));
}

.site-skip:focus-visible {
  transform: none;
  outline: 2px solid var(--site-link);
  outline-offset: 3px;
}
</style>
