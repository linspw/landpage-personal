<template>
  <footer class="site-footer">
    <div class="site-container">
      <div class="site-footer-main">
        <div>
          <NuxtLink class="site-footer-name" to="/">Jessé Correia</NuxtLink>
          <p class="site-footer-role">{{ t('profession') }}</p>
        </div>

        <nav class="site-footer-nav" :aria-label="t('navigation')">
          <NuxtLink v-for="page in pages" :key="page.url" :to="page.url">
            {{ page.title }}
          </NuxtLink>
          <NuxtLink to="/contact">{{ $t('pages.contact.title') }}</NuxtLink>
        </nav>
      </div>

      <p class="site-footer-legal">
        © 2023 Jessé Correia Lins. {{ t('rights') }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const pages = usePortalPagesInfo()
const { t } = useI18n({ useScope: 'local' })
</script>

<i18n lang="json">
{
  "pt-BR": {
    "profession": "Engenheiro de software",
    "navigation": "Navegação do rodapé",
    "rights": "Todos os direitos reservados."
  },
  "en": {
    "profession": "Software engineer",
    "navigation": "Footer navigation",
    "rights": "All rights reserved."
  },
  "es": {
    "profession": "Ingeniero de software",
    "navigation": "Navegación del pie de página",
    "rights": "Todos los derechos reservados."
  }
}
</i18n>

<style scoped>
.site-footer {
  background: var(--site-navy);
  color: #f4f8ff;
  padding-block: clamp(2.25rem, 5vw, 3.25rem) 1.4rem;
}

.site-footer-main {
  display: flex;
  gap: 1.5rem 3rem;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
}

.site-footer-name {
  display: inline-block;
  font-size: 1.22rem;
  font-weight: 760;
  letter-spacing: -0.025em;
}

.site-footer-role,
.site-footer-legal {
  color: #bdcce2;
}

.site-footer-role {
  margin-top: 0.28rem;
  font-size: 0.88rem;
}

.site-footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0 1.3rem;
}

.site-footer-nav a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: 0.84rem;
}

.site-footer a:hover {
  text-decoration: underline;
  text-underline-offset: 0.3em;
}

.site-footer a:focus-visible {
  outline: 2px solid #c1d8ff;
  outline-offset: 3px;
}

.site-footer-legal {
  margin-top: 1.5rem;
  padding-top: 1.1rem;
  border-top: 1px solid #455d80;
  font-size: 0.77rem;
}
</style>
