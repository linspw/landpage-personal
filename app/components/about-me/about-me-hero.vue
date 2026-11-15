<template>
  <section class="about-hero" aria-labelledby="about-hero-title">
    <UContainer class="about-hero-layout">
      <div class="about-hero-overview">
        <header class="about-hero-heading">
          <h1 id="about-hero-title">Jessé Correia</h1>
          <p>{{ t('jobTitle') }}</p>
        </header>

        <div class="about-hero-details">
          <p class="about-hero-description">{{ t('description') }}</p>
          <ul class="about-hero-profile" role="list">
            <li>
              <UIcon name="i-heroicons-map-pin" aria-hidden="true" />
              São José dos Campos, SP
            </li>
            <li>
              <UIcon name="i-heroicons-globe-alt" aria-hidden="true" />
              {{ t('citizenship') }}
            </li>
          </ul>

          <div class="about-hero-contact">
            <UButton
              :href="curriculumLink"
              :label="t('resume')"
              target="_blank"
              rel="noopener"
              external
              size="lg"
              color="primary"
              icon="i-heroicons-document-arrow-down-20-solid"
              class="about-hero-resume"
            />
            <a href="https://www.linkedin.com/in/jessecorreialive/" target="_blank" rel="noopener">
              <UIcon name="i-fa-brands-linkedin" aria-hidden="true" />
              LinkedIn
            </a>
            <a href="https://github.com/linspw" target="_blank" rel="noopener">
              <UIcon name="i-fa-brands-github" aria-hidden="true" />
              GitHub
            </a>
            <a href="mailto:linspw@live.com">
              <UIcon name="i-heroicons-envelope" aria-hidden="true" />
              linspw@live.com
            </a>
          </div>

          <nav class="about-hero-shortcuts" :aria-label="t('navigation')">
            <a href="#section-skills">
              {{ $t('homeSections.skills.title') }}
              <UIcon name="i-heroicons-arrow-down-20-solid" aria-hidden="true" />
            </a>
            <a href="#section-experiences">
              {{ $t('homeSections.experiences.title') }}
              <UIcon name="i-heroicons-arrow-down-20-solid" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>

      <div class="about-hero-portrait">
        <NuxtImg
          src="/images/avatars/my-photo.jpg"
          :alt="t('portrait')"
          width="480"
          height="480"
          densities="x1 x2"
          format="webp"
          fetchpriority="high"
        />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n({ useScope: 'local' })

const curriculumLink = computed(() =>
  locale.value === 'pt-BR'
    ? '/files/curriculum_pt_br.pdf'
    : '/files/curriculum_en.pdf',
)
</script>

<i18n lang="json">
{
  "pt-BR": {
    "jobTitle": "Engenheiro de Software Sênior",
    "description": "Na Qeevo, atuo na arquitetura e na operação de plataformas web. Minha trajetória inclui desenvolvimento full stack e liderança técnica de equipes.",
    "citizenship": "Brasileiro e português",
    "resume": "Currículo em PDF",
    "navigation": "Seções de Sobre mim",
    "portrait": "Retrato de Jessé Correia"
  },
  "en": {
    "jobTitle": "Senior Software Engineer",
    "description": "At Qeevo, I work on web platform architecture and operations. My background includes full-stack development and technical leadership.",
    "citizenship": "Brazilian and Portuguese",
    "resume": "Resume PDF",
    "navigation": "About page sections",
    "portrait": "Portrait of Jessé Correia"
  },
  "es": {
    "jobTitle": "Ingeniero de Software Sénior",
    "description": "En Qeevo trabajo en la arquitectura y operación de plataformas web. Mi trayectoria incluye desarrollo full stack y liderazgo técnico de equipos.",
    "citizenship": "Brasileño y portugués",
    "resume": "Currículum en PDF",
    "navigation": "Secciones de Sobre mí",
    "portrait": "Retrato de Jessé Correia"
  }
}
</i18n>

<style scoped>
.about-hero {
  padding-block: calc(var(--site-header-height) + clamp(2.1rem, 5.2vw, 4.75rem)) clamp(2.45rem, 5.1vw, 4.75rem);
  border-bottom: 1px solid var(--site-line);
  background: var(--site-canvas);
}

.about-hero-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.16fr) minmax(0, 0.84fr);
  align-items: center;
  gap: clamp(1.75rem, 6vw, 6rem);
}

.about-hero-heading h1 {
  color: var(--site-navy);
  font-size: clamp(2.35rem, 5.5vw, 5.1rem);
  font-weight: 780;
  line-height: 1.02;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.about-hero-heading p {
  margin-top: 0.6rem;
  color: var(--site-link);
  font-size: clamp(1.05rem, 1.85vw, 1.43rem);
  font-weight: 700;
}

.about-hero-details {
  margin-top: 1.2rem;
}

.about-hero-description {
  max-width: 49ch;
  color: var(--site-ink);
  font-size: clamp(0.98rem, 1.45vw, 1.1rem);
  line-height: 1.65;
}

.about-hero-profile,
.about-hero-contact,
.about-hero-shortcuts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.about-hero-profile {
  gap: 0.3rem 1.05rem;
  margin-top: 1rem;
  color: var(--site-muted);
  font-size: 0.86rem;
}

.about-hero-profile li {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.about-hero-profile .iconify {
  color: var(--site-link);
}

.about-hero-contact {
  gap: 0.3rem 1.05rem;
  margin-top: 1.35rem;
}

.about-hero-resume {
  min-height: 44px;
  border-radius: 0.55rem;
}

.about-hero-contact > a:not(.about-hero-resume),
.about-hero-shortcuts a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 0.45rem;
  color: var(--site-navy);
  font-size: 0.85rem;
  font-weight: 700;
  text-underline-offset: 0.28em;
}

.about-hero-contact a:hover:not(.about-hero-resume),
.about-hero-shortcuts a:hover {
  text-decoration: underline;
}

.about-hero-contact a:focus-visible,
.about-hero-shortcuts a:focus-visible {
  outline: 2px solid var(--site-link);
  outline-offset: 3px;
}

.about-hero-contact .iconify,
.about-hero-shortcuts .iconify {
  flex: none;
}

.about-hero-shortcuts {
  gap: 0 1.25rem;
  max-width: 34rem;
  margin-top: 0.85rem;
  padding-top: 0.45rem;
  border-top: 1px solid var(--site-line);
}

.about-hero-shortcuts a {
  color: var(--site-link);
}

.about-hero-portrait {
  --portrait-offset: clamp(0.55rem, 1.35vw, 1.15rem);
  position: relative;
  isolation: isolate;
  width: calc(100% - var(--portrait-offset));
  max-width: 29rem;
  aspect-ratio: 1 / 1.03;
  margin-bottom: var(--portrait-offset);
  border-radius: 1rem;
  background: var(--site-soft);
}

.about-hero-portrait::before {
  position: absolute;
  z-index: -1;
  inset: var(--portrait-offset) calc(-1 * var(--portrait-offset)) calc(-1 * var(--portrait-offset)) var(--portrait-offset);
  border-radius: inherit;
  background: #dce8f8;
  content: '';
}

.about-hero-portrait img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
  object-position: 50% 12%;
}

@media (max-width: 720px) {
  .about-hero-layout {
    grid-template-columns: 1fr;
    gap: 1.15rem;
  }

  .about-hero-overview {
    display: contents;
  }

  .about-hero-heading {
    grid-row: 1;
  }

  .about-hero-portrait {
    grid-row: 2;
    max-width: 27rem;
    aspect-ratio: 1.3;
  }

  .about-hero-portrait img {
    object-position: 50% 0%;
  }

  .about-hero-details {
    margin-top: 0;
  }
}
</style>
