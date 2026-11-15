<template>
  <header
    class="site-header"
    :class="{ 'site-header--scrolled': scrollY > 0 }"
  >
    <div class="site-header-inner site-container">
      <NuxtLink to="/" class="site-brand">
        <span class="site-monogram" aria-hidden="true">JC</span>
        <span>Jessé Correia</span>
      </NuxtLink>

      <nav class="site-nav" :aria-label="t('navigation')">
        <NuxtLink
          v-for="page in pages"
          :key="page.url"
          :to="page.url"
          class="site-nav-link"
        >
          {{ page.title }}
        </NuxtLink>
      </nav>

      <div class="site-header-actions">
        <AppLanguageDropdownMenu :label="t('language')" />

        <NuxtLink to="/contact" class="site-contact">
          {{ $t('pages.contact.title') }}
          <UIcon
            name="i-heroicons-arrow-up-right-20-solid"
            aria-hidden="true"
          />
        </NuxtLink>

        <button
          class="site-menu-toggle"
          type="button"
          :aria-label="t('openMenu')"
          :aria-expanded="drawer"
          @click="drawer = !drawer"
        >
          <UIcon name="i-heroicons-bars-3-20-solid" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const drawer = defineModel<boolean>({ required: true })
const pages = usePortalPagesInfo()
const { t } = useI18n({ useScope: 'local' })
const { y: scrollY } = useWindowScroll()
</script>

<i18n lang="json">
{
  "pt-BR": {
    "navigation": "Navegação principal",
    "language": "Idioma",
    "openMenu": "Abrir menu"
  },
  "en": {
    "navigation": "Main navigation",
    "language": "Language",
    "openMenu": "Open menu"
  },
  "es": {
    "navigation": "Navegación principal",
    "language": "Idioma",
    "openMenu": "Abrir menú"
  }
}
</i18n>

<style scoped>
.site-header {
  position: fixed;
  z-index: 1000;
  inset: 0 0 auto;
  background: transparent;
  color: var(--site-ink);
}

.site-header--scrolled {
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
  box-shadow:
    0 4px 16px -10px rgb(20 43 80 / 14%),
    0 1px 4px rgb(20 43 80 / 3%);
}

@media (prefers-reduced-motion: no-preference) {
  .site-header {
    transition:
      backdrop-filter 180ms ease,
      box-shadow 180ms ease;
  }
}

.site-header-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1.75rem);
  height: var(--site-header-height);
}

.site-brand,
.site-header-actions,
.site-nav,
.site-contact {
  display: flex;
  align-items: center;
}

.site-brand {
  gap: 0.68rem;
  width: fit-content;
  min-height: 44px;
  white-space: nowrap;
  font-size: 0.94rem;
  font-weight: 750;
  letter-spacing: -0.02em;
}

.site-monogram {
  display: grid;
  place-items: center;
  flex: none;
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 0.58rem;
  background: linear-gradient(145deg, #1e3c68, var(--site-navy) 72%);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.site-nav {
  justify-content: center;
  align-self: stretch;
  gap: clamp(0.6rem, 1.6vw, 1.45rem);
}

.site-nav-link {
  position: relative;
  display: grid;
  align-items: center;
  align-self: stretch;
  color: var(--site-muted);
  white-space: nowrap;
  font-size: 0.84rem;
  font-weight: 620;
}

.site-nav-link:hover,
.site-nav-link.router-link-active {
  color: var(--site-link);
}

.site-nav-link.router-link-active::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: var(--site-link);
}

.site-header-actions {
  justify-self: end;
  justify-content: flex-end;
  gap: 0.6rem;
}

.site-contact,
.site-menu-toggle {
  justify-content: center;
  min-height: 44px;
  border: 1px solid var(--site-line);
  border-radius: 0.68rem;
  color: var(--site-navy);
  background: color-mix(in srgb, var(--site-surface) 66%, transparent);
}

.site-contact {
  gap: 0.4rem;
  padding-inline: 0.75rem;
  font-size: 0.82rem;
  font-weight: 700;
}

.site-contact:hover,
.site-menu-toggle:hover {
  background: var(--site-soft);
  border-color: var(--site-control-border);
}

.site-menu-toggle {
  display: none;
  width: 44px;
  cursor: pointer;
}

.site-menu-toggle :deep(span) {
  font-size: 1.15rem;
}

.site-brand:focus-visible,
.site-contact:focus-visible,
.site-menu-toggle:focus-visible {
  outline: 2px solid var(--site-link);
  outline-offset: 3px;
}

.site-nav-link:focus-visible {
  outline: 2px solid var(--site-link);
  outline-offset: -2px;
}

@media (max-width: 860px) {
  .site-header-inner {
    grid-template-columns: 1fr auto;
  }

  .site-nav,
  .site-contact {
    display: none;
  }

  .site-menu-toggle {
    display: grid;
    place-items: center;
  }
}

@media (max-width: 359px) {
  .site-brand {
    font-size: 0.85rem;
    gap: 0.48rem;
  }

  .site-header-actions {
    gap: 0.3rem;
  }
}
</style>
