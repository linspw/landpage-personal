<template>
  <div class="career-home">
    <section class="career-hero career-container" aria-labelledby="home-title">
      <div class="career-intro">
        <NuxtImg
          class="career-portrait"
          src="/images/avatars/my-photo.jpg"
          alt=""
          width="80"
          height="80"
          densities="x1 x2"
          format="webp"
          fetchpriority="high"
        />
        <h1 id="home-title">Jessé Correia</h1>
        <p class="career-profession">{{ t('profession') }}</p>
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

      <article
        v-if="currentRole"
        class="career-feature"
        aria-labelledby="current-role"
      >
        <p class="career-company">
          <span aria-hidden="true" />
          {{ currentRole.company }} · {{ t('currentRole') }}
        </p>
        <h2 id="current-role">{{ currentRole.title }}</h2>
        <p class="career-feature-date">{{ currentRole.date }}</p>
        <p class="career-feature-description">{{ currentRole.text }}</p>
        <ul class="career-skills" role="list">
          <li v-for="skill in currentRole.skills" :key="skill">{{ skill }}</li>
        </ul>
      </article>
    </section>

    <section
      id="experiencia-profissional"
      class="career-history"
      aria-labelledby="career-heading"
    >
      <div class="career-container">
        <h2 id="career-heading">{{ t('previousRoles') }}</h2>
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
              <h3>{{ role.company }}</h3>
              <p>{{ role.title }}</p>
            </div>
            <p class="career-role-date">{{ role.date }}</p>
          </li>
        </ol>
        <NuxtLink class="career-link" to="/about-me#section-experiences">
          {{ t('viewFullCareer') }}
          <UIcon name="i-heroicons-arrow-right-20-solid" aria-hidden="true" />
        </NuxtLink>
      </div>
    </section>
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
    "profession": "Engenheiro de software",
    "description": "Trabalho com plataformas frontend e design systems. Minha trajetória inclui desenvolvimento fullstack e liderança técnica de equipes.",
    "viewExperience": "Ver experiência",
    "viewProjects": "Ver projetos",
    "currentRole": "Cargo atual",
    "previousRoles": "Experiências anteriores",
    "viewFullCareer": "Ver trajetória completa"
  },
  "en": {
    "profession": "Software engineer",
    "description": "I work on frontend platforms and design systems. My background includes full-stack development and technical team leadership.",
    "viewExperience": "View experience",
    "viewProjects": "View projects",
    "currentRole": "Current role",
    "previousRoles": "Previous experience",
    "viewFullCareer": "View full career history"
  },
  "es": {
    "profession": "Ingeniero de software",
    "description": "Trabajo con plataformas frontend y sistemas de diseño. Mi trayectoria incluye desarrollo fullstack y liderazgo técnico de equipos.",
    "viewExperience": "Ver experiencia",
    "viewProjects": "Ver proyectos",
    "currentRole": "Puesto actual",
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

.career-portrait {
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.4rem;
  width: 5rem;
  height: 5rem;
}

.career-intro h1 {
  font-size: clamp(2.8rem, 5.8vw, 5.5rem);
  line-height: 1.04;
  letter-spacing: -0.04em;
  font-weight: 800;
  text-wrap: balance;
}

.career-profession {
  margin-top: 0.65rem;
  color: var(--color-primary);
  font-size: clamp(1.125rem, 2vw, 1.45rem);
  font-weight: 650;
}

.career-description {
  margin-top: 1.1rem;
  max-width: 45ch;
  color: #4a5969;
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
  border-radius: 0.875rem;
  background: var(--site-navy);
  padding: clamp(1.4rem, 4vw, 2.65rem);
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

.career-company span {
  width: 0.46rem;
  height: 0.46rem;
  flex: none;
  border-radius: 50%;
  background: #8eb6ff;
}

.career-feature h2 {
  margin-top: 1.35rem;
  font-size: clamp(1.9rem, 3.4vw, 3.35rem);
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
  margin-top: 1.2rem;
  color: #e0eaff;
  line-height: 1.64;
  font-size: 0.94rem;
  max-width: 48ch;
}

.career-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #577097;
  color: #d0e0ff;
  font-size: 0.79rem;
}

.career-history {
  padding-block: clamp(2.75rem, 5vw, 4.5rem);
  background: var(--site-soft);
}

.career-history h2 {
  font-size: clamp(1.7rem, 3.5vw, 2.75rem);
  font-weight: 750;
  letter-spacing: -0.03em;
}

.career-roles {
  margin-block: 1.35rem 0.8rem;
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

.career-role h3 {
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
}

@media (max-width: 500px) {
  .career-hero {
    gap: 1.75rem;
    padding-block: 7rem 2.5rem;
  }

  .career-portrait {
    width: 3.5rem;
    height: 3.5rem;
    margin-bottom: 0.85rem;
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
