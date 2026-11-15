<template>
  <div class="career-home">
    <section class="career-hero career-container" aria-labelledby="home-title">
      <div class="career-intro">
        <div class="career-identity">
          <div class="career-portrait">
            <NuxtImg
              src="/images/avatars/my-photo.jpg"
              alt=""
              width="112"
              height="112"
              densities="x1 x2"
              format="webp"
              fetchpriority="high"
            />
          </div>
          <div>
            <h1 id="home-title">Jessé Correia</h1>
            <p class="career-profession">{{ t('profession') }}</p>
          </div>
        </div>
        <p class="career-description">{{ t('description') }}</p>
        <div class="career-actions">
          <NuxtLink class="career-primary" to="/#experiencia-profissional">
            {{ t('viewExperience') }}
            <UIcon name="i-heroicons-arrow-right-20-solid" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink class="career-link" to="/projects">
            {{ t('viewProjects') }}
          </NuxtLink>
        </div>
      </div>

      <HomePageGallery tilt-direction="right" />
    </section>

    <AppSection
      id="experiencia-profissional"
      class="career-history"
      :title="t('experience')"
      :aria-label="t('experience')"
    >
      <UContainer>
        <article
          v-if="currentRole"
          class="career-feature"
          aria-labelledby="current-role"
        >
          <div>
            <p class="career-company">
              <img
                v-if="currentRole.companyMark"
                :src="currentRole.companyMark"
                alt=""
                width="28"
                height="28"
              >
              {{ currentRole.company }} · {{ t('currentRole') }}
            </p>
            <h3 id="current-role">{{ currentRole.title }}</h3>
            <p class="career-feature-date">{{ currentRole.date }}</p>
          </div>
          <div>
            <p class="career-feature-description">{{ currentRole.text }}</p>
            <p v-if="currentRole.recognitions?.[0]" class="career-recognition">
              <UIcon name="i-heroicons-trophy" aria-hidden="true" />
              <span>{{ currentRole.recognitions[0].title }}. {{ currentRole.recognitions[0].description }}</span>
            </p>
            <ul class="career-skills" role="list">
              <li v-for="skill in currentRole.skills" :key="skill">
                {{ skill }}
              </li>
            </ul>
          </div>
        </article>

        <h3 class="career-previous-heading">{{ t('previousRoles') }}</h3>
        <ol class="career-roles" role="list">
          <li
            v-for="role in previousRoles"
            :key="role.company"
            class="career-role"
          >
            <img
              :src="role.image"
              alt=""
              width="64"
              height="44"
              loading="lazy"
            >
            <div>
              <h4>{{ role.company }}</h4>
              <p>{{ role.title }}</p>
            </div>
            <p class="career-role-date">{{ role.date }}</p>
          </li>
        </ol>
        <a class="career-link" href="/about-me#section-experiences">
          {{ t('viewFullCareer') }}
          <UIcon name="i-heroicons-arrow-right-20-solid" aria-hidden="true" />
        </a>
      </UContainer>
    </AppSection>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const roles = useProfessionalExperience()

const currentRole = computed(() =>
  roles.value.find((role) => role.isCurrentJob),
)
const previousRoles = computed(() => {
  const companies = new Set<string>()

  return roles.value.filter((role) => {
    if (role.isCurrentJob || companies.has(role.company)) return false
    companies.add(role.company)
    return true
  })
})
</script>

<i18n lang="json">
{
  "pt-BR": {
    "profession": "Engenheiro de software sênior",
    "description": "Trabalho com plataformas web, marketplaces e ferramentas para desenvolvedores. Minha trajetória inclui desenvolvimento full stack e liderança técnica.",
    "viewExperience": "Ver experiência",
    "viewProjects": "Ver projetos",
    "currentRole": "Cargo atual",
    "experience": "Experiência profissional",
    "previousRoles": "Experiências anteriores",
    "viewFullCareer": "Ver trajetória completa"
  },
  "en": {
    "profession": "Senior software engineer",
    "description": "I work on web platforms, marketplaces, and developer tools. My background includes full-stack development and technical leadership.",
    "viewExperience": "View experience",
    "viewProjects": "View projects",
    "currentRole": "Current role",
    "experience": "Professional experience",
    "previousRoles": "Previous experience",
    "viewFullCareer": "View full career history"
  },
  "es": {
    "profession": "Ingeniero de software sénior",
    "description": "Trabajo con plataformas web, marketplaces y herramientas para desarrolladores. Mi trayectoria incluye desarrollo full stack y liderazgo técnico.",
    "viewExperience": "Ver experiencia",
    "viewProjects": "Ver proyectos",
    "currentRole": "Puesto actual",
    "experience": "Experiencia profesional",
    "previousRoles": "Experiencias anteriores",
    "viewFullCareer": "Ver trayectoria completa"
  }
}
</i18n>

<style scoped>
.career-home {
  background: var(--site-canvas);
  color: var(--color-secondary);
}

.career-container {
  width: min(100% - 2 * var(--site-gutter), var(--site-content-width));
  margin-inline: auto;
}

.career-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr);
  gap: clamp(2rem, 6vw, 6rem);
  align-items: center;
  padding-block: clamp(8rem, 13vw, 11.5rem) clamp(3.75rem, 8vw, 7rem);
}

.career-identity {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(0.8rem, 1.6vw, 1.4rem);
}

.career-portrait {
  width: clamp(4.5rem, 8vw, 7rem);
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 8px 22px -13px rgb(20 43 80 / 32%);
}

.career-portrait img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  transform-origin: 50% 35%;
}

.career-identity h1 {
  color: var(--site-navy);
  font-size: clamp(2.2rem, 4.6vw, 4.25rem);
  line-height: 1.08;
  letter-spacing: -0.035em;
  font-weight: 760;
}

.career-profession {
  margin-top: 0.35rem;
  color: var(--site-link);
  font-size: clamp(1rem, 1.65vw, 1.26rem);
  font-weight: 650;
}

.career-description {
  margin-top: 1.35rem;
  max-width: 45ch;
  color: var(--site-muted);
  font-size: 1.03rem;
  line-height: 1.65;
}

.career-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.3rem;
  margin-top: 1.5rem;
}

.career-primary,
.career-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.9rem;
  font-weight: 700;
  width: fit-content;
}

.career-primary {
  padding-inline: 0.9rem;
  color: white;
  background: var(--color-primary);
  border-radius: 0.5rem;
}

.career-primary:hover {
  background: #003fc5;
}

.career-link {
  color: #064dcd;
  text-underline-offset: 0.3em;
}

.career-link:hover {
  text-decoration: underline;
}

.career-primary:focus-visible,
.career-link:focus-visible {
  outline: 2px solid #064dcd;
  outline-offset: 4px;
}

.career-feature {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1fr);
  align-items: center;
  gap: 1.25rem clamp(1.25rem, 5vw, 4rem);
  border-radius: 0.875rem;
  background: var(--site-navy);
  padding: clamp(1.4rem, 3.4vw, 2.4rem);
  color: #f5f8ff;
}

.career-company {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: #d7e5ff;
  font-size: 0.86rem;
  font-weight: 650;
}

.career-company img {
  flex: none;
}

.career-feature h3 {
  margin-top: 0.85rem;
  font-size: clamp(1.65rem, 3vw, 2.5rem);
  line-height: 1.09;
  letter-spacing: -0.03em;
  font-weight: 750;
  text-wrap: balance;
}

.career-feature-date {
  margin-top: 0.75rem;
  color: #c7d9f7;
  font-size: 0.86rem;
}

.career-feature-description {
  color: #e0eaff;
  line-height: 1.64;
  font-size: 0.94rem;
  max-width: 48ch;
}

.career-recognition {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 0.75rem;
  color: #d7e5ff;
  font-size: 0.85rem;
}

.career-recognition > :first-child {
  flex: none;
  align-self: start;
  margin-top: 0.2em;
}

.career-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-top: 1rem;
  padding-top: 0.85rem;
  border-top: 1px solid #577097;
  color: #d0e0ff;
  font-size: 0.79rem;
}

.career-history.app-section {
  background: var(--site-soft);
  scroll-margin-block-start: var(--site-header-height);
}

.career-previous-heading {
  margin-block-start: clamp(1.6rem, 4vw, 2.7rem);
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  font-weight: 750;
}

.career-roles {
  margin-block: 0.8rem;
  border-block-start: 1px solid #c9d6e6;
}

.career-role {
  display: grid;
  grid-template-columns: 4rem 1fr auto;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  padding-block: 1rem;
  border-block-end: 1px solid #c9d6e6;
}

.career-role img {
  width: 4rem;
  height: 2.75rem;
  padding: 0.4rem;
  border-radius: 0.35rem;
  background: white;
  object-fit: contain;
}

.career-role h4 {
  font-size: 1.07rem;
  font-weight: 750;
}

.career-role p {
  color: #465970;
  font-size: 0.86rem;
}

.career-role-date {
  font-variant-numeric: tabular-nums;
}

@media (max-width: 780px) {
  .career-hero {
    grid-template-columns: 1fr;
    padding-top: 7.5rem;
  }

  .career-feature {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 500px) {
  .career-hero {
    gap: 1.75rem;
    padding-block: 7rem 2.5rem;
  }

  .career-portrait {
    width: clamp(4rem, 17.5vw, 5rem);
    border-radius: 0.85rem;
  }

  .career-identity h1 {
    font-size: clamp(1.75rem, 8.3vw, 2.2rem);
  }

  .career-role {
    grid-template-columns: 3.5rem 1fr;
    row-gap: 0.25rem;
  }

  .career-role img {
    width: 3.5rem;
    grid-row: span 2;
  }
}
</style>
