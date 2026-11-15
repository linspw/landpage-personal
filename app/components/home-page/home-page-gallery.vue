<template>
  <section
    id="galeria"
    class="home-gallery"
    aria-labelledby="home-gallery-title"
  >
    <div class="site-container home-gallery-heading">
      <h2 id="home-gallery-title">{{ t('title') }}</h2>
      <p>{{ t('hint') }}</p>
    </div>

    <InfiniteDrift
      class="home-gallery-stage"
      :bands="bands"
      :label="t('title')"
      height="clamp(32rem, 56vw, 47.5rem)"
      :image-height="118"
      :gap="20"
    />
  </section>
</template>

<script setup lang="ts">
import InfiniteDrift from '~/components/effects/infinite-drift.vue'
import type { InfiniteDriftBand } from '~/utils/infinite-drift'

const { t } = useI18n({ useScope: 'local' })

// These are the original SonoJS demo photos. Its last three files repeat 01–03.
const rows = [
  { files: [1, 2, 3, 4], offsetY: -320, speed: 1, curveAmount: 40 },
  { files: [5, 6, 7, 8], offsetY: -160, speed: 1.3, curveAmount: 35 },
  { files: [9, 10, 11, 12], offsetY: 0, speed: 0.7, curveAmount: 40 },
  { files: [13, 14, 15, 16], offsetY: 160, speed: 1.2, curveAmount: 40 },
  { files: [17, 1, 2, 3], offsetY: 320, speed: 0.9, curveAmount: 35 },
]

const bands: InfiniteDriftBand[] = rows.map(({ files, ...band }) => ({
  ...band,
  rotation: 7,
  images: files.map(
    (file) => `/images/infinite-drift/${String(file).padStart(2, '0')}.jpg`,
  ),
}))
</script>

<i18n lang="json">
{
  "pt-BR": {
    "title": "Galeria",
    "hint": "Role a página ou arraste as faixas para explorar as imagens."
  },
  "en": {
    "title": "Gallery",
    "hint": "Scroll the page or drag the bands to explore the images."
  },
  "es": {
    "title": "Galería",
    "hint": "Desplázate por la página o arrastra las franjas para explorar las imágenes."
  }
}
</i18n>

<style scoped>
.home-gallery {
  padding-block: clamp(2.75rem, 5vw, 4.5rem);
  scroll-margin-block-start: var(--site-header-height);
}

.home-gallery-heading {
  margin-block-end: 1.4rem;
}

.home-gallery-heading h2 {
  color: var(--site-ink);
  font-size: clamp(1.7rem, 3.5vw, 2.75rem);
  font-weight: 750;
  letter-spacing: -0.03em;
}

.home-gallery-heading p {
  margin-block-start: 0.38rem;
  color: var(--site-muted);
  line-height: 1.55;
}

.home-gallery-stage {
  width: min(100% - 2 * clamp(0.5rem, 2vw, 2rem), 96rem);
  margin-inline: auto;
  border: 1px solid var(--site-line);
  border-radius: 0.875rem;
}

@media (prefers-reduced-motion: reduce) {
  .home-gallery-heading p {
    display: none;
  }
}
</style>
