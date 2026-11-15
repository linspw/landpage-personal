<template>
  <AppPage with-top-margin>
    <AppSection :title="$t('pages.projects.title')" heading-tag="h1">
      <UContainer class="projects-content">
        <section
          v-if="currentRole?.achievements"
          id="realizacoes"
          aria-labelledby="professional-projects-heading"
        >
          <div class="projects-section-heading">
            <h2 id="professional-projects-heading">{{ t('sections.professional') }}</h2>
            <div class="projects-shortcuts">
              <a href="#projetos-autorais" class="projects-link">
                {{ t('sections.personal') }}
                <UIcon name="i-heroicons-arrow-down-20-solid" aria-hidden="true" />
              </a>
              <a href="#open-source" class="projects-link" :aria-label="t('sections.openSource')">
                Open source
                <UIcon name="i-heroicons-arrow-down-20-solid" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div class="professional-projects">
            <div class="professional-context">
              <div>
                <h3 class="professional-projects-company">
                  <img v-if="currentRole.companyMark" :src="currentRole.companyMark" alt="" width="30" height="30">
                  {{ currentRole.company }}
                </h3>
                <p class="professional-projects-role">{{ currentRole.title }}</p>
              </div>
              <a href="/about-me#realizacoes-profissionais" class="projects-link">
                {{ t('achievements.fullExperience') }}
                <UIcon name="i-heroicons-arrow-right-20-solid" aria-hidden="true" />
              </a>
            </div>
            <div class="professional-charts">
              <figure class="cost-chart">
                <figcaption class="cost-chart-caption">
                  <div>
                    <h3>{{ t('achievements.renderingCost') }}</h3>
                    <p class="cost-chart-unit">{{ t('achievements.costUnit') }}</p>
                  </div>
                  <p class="cost-chart-reduction">
                    <strong>{{ n(estimatedCostReduction, percentFormat) }}</strong>
                    <span>{{ t('achievements.costReduction') }}</span>
                  </p>
                </figcaption>
                <dl class="cost-chart-bars">
                  <div
                    v-for="scenario in costScenarios"
                    :key="scenario.platform"
                    class="cost-chart-bar"
                    :class="{ 'cost-chart-bar--after': scenario.phase === 'after' }"
                    :style="{ '--cost-share': `${scenario.monthlyUsd / costBeforeMigration * 100}%` }"
                  >
                    <dt>
                      {{ scenario.platform }}
                      <span>{{ t(`achievements.costPhase.${scenario.phase}`) }}</span>
                    </dt>
                    <dd>≈ {{ n(scenario.monthlyUsd, usdFormat) }}</dd>
                  </div>
                </dl>
              </figure>

              <figure class="systems-chart">
                <figcaption>
                  <h3>{{ t('achievements.authentication') }}</h3>
                  <p class="systems-chart-value">
                    <strong>{{ n(authenticationSystemCount) }}+</strong>
                    <span>{{ t('achievements.authenticatedSystems') }}</span>
                  </p>
                </figcaption>
                <div class="systems-chart-points" aria-hidden="true">
                  <span v-for="system in authenticationSystemCount" :key="system" />
                </div>
              </figure>
            </div>

            <div class="professional-deliveries">
              <h3>{{ t('achievements.deliveries') }}</h3>
              <dl class="professional-delivery-grid">
                <div
                  v-for="key in deliveryKeys"
                  :key="key"
                  :class="{ 'professional-delivery--tracking': key === 'tracking' }"
                >
                  <dt>{{ t(`achievements.deliveryNames.${key}`) }}</dt>
                  <dd>{{ currentRole.achievements[key] }}</dd>
                </div>
              </dl>
            </div>

            <div v-if="currentRole.recognitions?.length" class="professional-recognitions">
              <h3>
                <UIcon name="i-heroicons-trophy" aria-hidden="true" />
                {{ t('achievements.recognitions') }}
              </h3>
              <ul role="list">
                <li v-for="recognition in currentRole.recognitions" :key="recognition">
                  {{ recognition }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="projetos-autorais" class="personal-projects-section" aria-labelledby="personal-projects-heading">
          <h2 id="personal-projects-heading" class="projects-section-heading">{{ t('sections.personal') }}</h2>

          <div class="personal-projects">
            <article class="featured-project" aria-labelledby="snown-heading">
              <h3 id="snown-heading" class="sr-only">SNOWN</h3>
              <div class="featured-project-brand">
                <img src="/images/projects/snown.svg" alt="" width="1490" height="211">
              </div>
              <div class="featured-project-body">
                <p class="featured-project-meta">{{ t('personalProjects.snown.meta') }}</p>
                <p class="featured-project-description">{{ t('personalProjects.snown.description') }}</p>

                <dl class="featured-project-details">
                  <div>
                    <dt>{{ t('highlights.role') }}</dt>
                    <dd>{{ t('personalProjects.snown.role') }}</dd>
                  </div>
                  <div>
                    <dt>{{ t('highlights.focus') }}</dt>
                    <dd>{{ t('personalProjects.snown.focus') }}</dd>
                  </div>
                </dl>

                <div class="featured-project-footer">
                  <p class="project-stack">React · NestJS · Redis · Yjs</p>
                  <a
                    href="https://snown.com.br/"
                    target="_blank"
                    rel="noopener"
                    class="projects-link featured-project-link"
                  >
                    {{ t('openProject', { name: 'SNOWN' }) }}
                    <UIcon name="i-heroicons-arrow-up-right-20-solid" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>

            <ul class="personal-project-list" role="list">
              <li v-for="project in personalProjects" :key="project.name" class="personal-project">
                <article>
                  <header class="personal-project-heading">
                    <div>
                      <h3>{{ project.name }}</h3>
                      <p>{{ project.meta }}</p>
                    </div>
                    <img v-if="project.imageUrl" :src="project.imageUrl" alt="" width="68" height="38">
                  </header>

                  <p class="project-description">{{ project.description }}</p>
                  <p class="personal-project-detail">{{ project.detail }}</p>
                  <div class="personal-project-footer">
                    <p class="project-stack">{{ project.tags.join(' · ') }}</p>
                    <a
                      v-if="project.linkUrl"
                      :href="project.linkUrl"
                      target="_blank"
                      rel="noopener"
                      class="projects-link"
                    >
                      {{ t('openProject', { name: project.name }) }}
                      <UIcon name="i-heroicons-arrow-up-right-20-solid" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </li>
            </ul>
          </div>
        </section>

        <section id="open-source" class="open-source-projects" aria-labelledby="open-source-heading">
          <h2 id="open-source-heading">{{ t('sections.openSource') }}</h2>
          <ul class="open-source-list" role="list">
            <li v-for="project in openSourceProjects" :key="project.name" class="open-source-project">
              <div class="open-source-identity">
                <img :src="project.imageUrl" alt="" width="52" height="40" loading="lazy">
                <div>
                  <h3>{{ project.name }}</h3>
                  <p>{{ project.meta }}</p>
                </div>
              </div>

              <div class="open-source-description">
                <p class="project-description">{{ project.description }}</p>
                <p class="project-stack">{{ project.tags.join(' · ') }}</p>
              </div>

              <a
                :href="project.linkUrl"
                target="_blank"
                rel="noopener"
                class="projects-link open-source-link"
                :aria-label="t('viewContribution', { name: project.name })"
              >
                {{ t('contributions') }}
                <UIcon name="i-heroicons-arrow-up-right-20-solid" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </section>
      </UContainer>
    </AppSection>
  </AppPage>
</template>

<script setup lang="ts">
useHead({ title: 'pages.projects.title' })

const { t, n } = useI18n({ useScope: 'local' })
const roles = useProfessionalExperience()
const currentRole = computed(() => roles.value.find(role => role.isCurrentJob))
const authenticationSystemCount = 30
// Approximate monthly rendering costs in USD from the November 2026 resume.
const costBeforeMigration = 2390
const costAfterMigration = 300
const estimatedCostReduction = 1 - costAfterMigration / costBeforeMigration
const costScenarios = [
  { platform: 'AWS EKS', phase: 'before', monthlyUsd: costBeforeMigration },
  { platform: 'Cloudflare', phase: 'after', monthlyUsd: costAfterMigration },
]
const percentFormat = { style: 'percent', maximumFractionDigits: 0 } as const
const usdFormat = {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
} as const
const deliveryKeys = ['marketplace', 'tracking', 'media', 'gateway', 'observability'] as const

const personalProjects = computed(() => [
  {
    name: 'Ascent',
    meta: t('personalProjects.ascent.meta'),
    description: t('personalProjects.ascent.description'),
    detail: t('personalProjects.ascent.focus'),
    tags: ['Nuxt', 'Electron', 'Kotlin Multiplatform', 'SQLite', 'WebSocket'],
  },
  {
    name: 'Our Wedding',
    meta: t('personalProjects.ourWedding.meta'),
    description: t('personalProjects.ourWedding.description'),
    detail: t('personalProjects.ourWedding.focus'),
    tags: ['Flutter', 'Dart', 'Firebase', 'BLoC'],
  },
  {
    name: 'Experiment UI',
    meta: t('personalProjects.experiment-ui.meta'),
    description: t('personalProjects.experiment-ui.description'),
    detail: t('personalProjects.experiment-ui.role'),
    linkUrl: 'https://linspw.github.io/experiment-ui/',
    imageUrl: '/images/projects/experiment-ui-light.svg',
    tags: ['Vue 3', 'Vite', 'Storybook'],
  },
])

const repositories = [
  {
    name: 'VueUse',
    key: 'vueuse',
    repository: 'vueuse/vueuse',
    logo: 'vueuse.svg',
    tags: ['Vue', 'DX', 'Toolkit'],
  },
  {
    name: 'Hocuspocus',
    key: 'hocuspocus',
    repository: 'ueberdosis/hocuspocus',
    logo: 'hocuspocus.svg',
    tags: ['WebSocket', 'Yjs', 'DX'],
  },
  {
    name: 'Vuetify Nuxt Module',
    key: 'vuetifyNuxt',
    repository: 'userquin/vuetify-nuxt-module',
    logo: 'vuetify-nuxt-module.svg',
    tags: ['Nuxt', 'Vuetify', 'DX'],
  },
  {
    name: 'Vue Resizables',
    key: 'vueresizable',
    repository: 'alexzhang1030/vue-resizables',
    logo: 'vue-resizable.svg',
    tags: ['Components', 'Vue', 'UX'],
  },
  {
    name: 'Drauu',
    key: 'drauu',
    repository: 'antfu/drauu',
    logo: 'drauu.svg',
    tags: ['Canvas', 'Vue', 'Tooling'],
  },
]

const openSourceProjects = computed(() =>
  repositories.map(({ name, key, repository, logo, tags }) => ({
    name,
    meta: t(`openSourceProjects.${key}.meta`),
    description: t(`openSourceProjects.${key}.description`),
    linkUrl: `https://github.com/${repository}/commits/main/?author=linspw`,
    imageUrl: `/images/projects/${logo}`,
    tags,
  })),
)
</script>

<style scoped>
.projects-content {
  padding-block: 0.75rem clamp(1.5rem, 4vw, 3rem);
}

.projects-content > section {
  scroll-margin-block-start: calc(var(--site-header-height) + 1.25rem);
}

.projects-section-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0 0.75rem;
  margin-bottom: 1.15rem;
}

.projects-shortcuts {
  display: flex;
  flex-wrap: wrap;
  gap: 0 1.25rem;
}

.projects-content h2 {
  color: var(--site-navy);
  font-size: clamp(1.35rem, 2.3vw, 1.75rem);
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.projects-link {
  display: inline-flex;
  width: fit-content;
  min-height: 44px;
  align-items: center;
  gap: 0.45rem;
  border-radius: 0.35rem;
  color: var(--site-link);
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1.3;
  text-underline-offset: 0.25em;
}

.projects-link:hover {
  text-decoration: underline;
}

.projects-link:focus-visible {
  outline: 2px solid var(--site-link);
  outline-offset: 3px;
}

.projects-link .iconify {
  flex: none;
}

.personal-projects {
  display: grid;
  grid-template-columns: minmax(0, 1.17fr) minmax(0, 0.83fr);
  gap: clamp(1.75rem, 4.25vw, 4.25rem);
}

.featured-project {
  display: flex;
  flex-direction: column;
  overflow: clip;
  border-radius: 1rem;
  background: var(--site-navy);
  color: #f5f8ff;
}

.featured-project-brand {
  display: grid;
  min-height: clamp(10rem, 17vw, 15.5rem);
  place-items: center;
  padding: 1.75rem;
  background: radial-gradient(ellipse at center, #234979, var(--site-navy) 75%);
}

.featured-project-brand img {
  width: min(84%, 23.5rem);
  height: auto;
}

.featured-project-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: start;
  padding: 0 clamp(1.25rem, 3.5vw, 2.25rem) clamp(1.25rem, 3.5vw, 2.25rem);
}

.featured-project-meta {
  color: #bed1f3;
  font-size: 0.81rem;
  font-weight: 700;
}

.featured-project-description {
  max-width: 52ch;
  margin-top: 0.6rem;
  font-size: clamp(1rem, 1.6vw, 1.125rem);
  line-height: 1.58;
}

.featured-project-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem clamp(1.5rem, 4vw, 3.75rem);
  margin-top: 1.25rem;
}

.featured-project-details dt {
  color: #bed1f3;
  font-size: 0.76rem;
}

.featured-project-details dd {
  margin-top: 0.15rem;
  font-size: 0.875rem;
  font-weight: 650;
}

.featured-project-footer {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem 1rem;
  margin-top: auto;
  padding-top: 1.25rem;
}

.featured-project-footer .project-stack {
  color: #d4e3fc;
}

.featured-project-link {
  padding-inline: 0.875rem;
  background: #f0f5ff;
  color: var(--site-navy);
}

.featured-project-link:hover {
  background: #e1ebff;
}

.featured-project-link:focus-visible {
  outline-color: #d4e3fc;
}

.personal-project-list,
.open-source-list {
  border-block-start: 1px solid var(--site-line);
}

.personal-project,
.open-source-project {
  border-block-end: 1px solid var(--site-line);
}

.personal-project {
  padding-block: 1.1rem;
}

.personal-project-heading,
.personal-project-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem 0.85rem;
}

.personal-project-heading h3,
.open-source-identity h3 {
  color: var(--site-navy);
  font-size: 1.32rem;
  font-weight: 750;
  line-height: 1.22;
  letter-spacing: -0.02em;
}

.personal-project-heading p,
.open-source-identity p {
  margin-top: 0.23rem;
  color: var(--site-muted);
  font-size: 0.82rem;
  font-weight: 600;
}

.personal-project-heading img {
  object-fit: contain;
}

.project-description {
  max-width: 64ch;
  color: var(--site-ink);
  font-size: 0.925rem;
  line-height: 1.55;
}

.personal-project .project-description {
  margin-top: 0.55rem;
}

.personal-project-detail {
  margin-top: 0.4rem;
  color: var(--site-muted);
  font-size: 0.83rem;
  line-height: 1.5;
}

.personal-project-footer {
  margin-top: 0.35rem;
}

.project-stack {
  color: var(--site-muted);
  font-size: 0.77rem;
  line-height: 1.55;
}

.personal-projects-section,
.open-source-projects {
  margin-top: clamp(3rem, 6vw, 5rem);
}

.professional-projects {
  padding: clamp(1.25rem, 3.5vw, 2.5rem);
  border-radius: 1rem;
  background: var(--site-soft);
}

.professional-context {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem 1.5rem;
}

.professional-projects-company {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--site-navy);
  font-size: 1.15rem;
  font-weight: 750;
}

.professional-projects-role {
  margin-top: 0.4rem;
  color: var(--site-muted);
  font-size: 0.85rem;
  font-weight: 600;
}

.professional-charts,
.professional-delivery-grid,
.professional-recognitions ul {
  --professional-column-gap: clamp(1.25rem, 4vw, 3.25rem);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem var(--professional-column-gap);
}

.professional-charts,
.professional-deliveries,
.professional-recognitions {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-block-start: 1px solid var(--site-line);
}

.professional-charts {
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
}

.professional-charts h3,
.professional-deliveries h3,
.professional-recognitions h3 {
  color: var(--site-navy);
  font-size: 1.035rem;
  font-weight: 750;
  line-height: 1.3;
}

.systems-chart {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  padding-inline-start: var(--professional-column-gap);
  border-inline-start: 1px solid var(--site-line);
}

.systems-chart-value {
  display: grid;
  gap: 0.25rem;
  margin-top: 0.5rem;
  color: var(--site-muted);
  font-size: 0.85rem;
}

.systems-chart-value strong {
  color: var(--site-link);
  font-size: clamp(2.6rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}

.systems-chart-points {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: clamp(0.25rem, 0.75vw, 0.57rem);
}

.systems-chart-points span {
  width: clamp(0.42rem, 1vw, 0.77rem);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--site-link);
}

.cost-chart-caption {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 0.75rem;
}

.cost-chart-caption h3 {
  font-size: clamp(1.035rem, 1.8vw, 1.3rem);
}

.cost-chart-unit {
  margin-top: 0.35rem;
  color: var(--site-muted);
  font-size: 0.8rem;
  line-height: 1.45;
}

.cost-chart-reduction {
  display: grid;
  gap: 0.23rem;
  color: var(--site-link);
  text-align: end;
}

.cost-chart-reduction strong {
  font-size: clamp(1.85rem, 3.3vw, 3.1rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}

.cost-chart-reduction span {
  max-width: 18ch;
  font-size: 0.75rem;
  font-weight: 650;
}

.cost-chart-bars {
  display: grid;
  gap: 0.85rem;
  margin-top: 1.1rem;
}

.cost-chart-bar {
  --cost-bar-color: #7890b3;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  gap: 0.4rem 0.75rem;
  color: var(--site-navy);
  font-size: 0.875rem;
  font-weight: 750;
}

.cost-chart-bar dt span {
  display: inline-block;
  margin-inline-start: 0.3rem;
  color: var(--site-muted);
  font-weight: 500;
}

.cost-chart-bar dd {
  font-size: clamp(0.875rem, 1.65vw, 1.1rem);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.cost-chart-bar::after {
  grid-column: 1 / -1;
  height: 0.7rem;
  border-radius: 0.25rem;
  background: linear-gradient(
    to right,
    var(--cost-bar-color) var(--cost-share),
    #d8e3f1 var(--cost-share)
  );
  content: '';
}

.cost-chart-bar--after {
  --cost-bar-color: var(--site-link);
}

.professional-delivery-grid,
.professional-recognitions ul {
  margin-top: 0.75rem;
  color: var(--site-ink);
  font-size: 0.875rem;
  line-height: 1.55;
}

.professional-delivery-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.professional-delivery--tracking {
  grid-column: span 2;
}

.professional-delivery-grid dt {
  color: var(--site-navy);
  font-weight: 700;
}

.professional-delivery-grid dd {
  max-width: 65ch;
  margin-top: 0.2rem;
}

.professional-recognitions h3 {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.open-source-list {
  margin-top: 1.2rem;
}

.open-source-project {
  display: grid;
  grid-template-columns: minmax(12rem, 0.86fr) minmax(0, 1.65fr) auto;
  align-items: center;
  gap: 0.4rem clamp(1rem, 3vw, 3rem);
  padding-block: 1rem;
}

.open-source-identity {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.open-source-identity img {
  flex: none;
  object-fit: contain;
}

.open-source-identity h3 {
  font-size: 1.02rem;
}

.open-source-description .project-stack {
  margin-top: 0.25rem;
}

@media (max-width: 760px) {
  .personal-projects,
  .professional-charts,
  .professional-recognitions ul {
    grid-template-columns: 1fr;
  }

  .professional-delivery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .professional-delivery--tracking {
    grid-column: auto;
  }

  .systems-chart {
    padding-block-start: 1rem;
    padding-inline-start: 0;
    border-block-start: 1px solid var(--site-line);
    border-inline-start: 0;
  }

  .systems-chart-points {
    gap: 0.45rem;
  }

  .systems-chart-points span {
    width: 0.55rem;
  }

  .featured-project-brand img {
    width: min(84%, 21rem);
  }

  .open-source-project {
    grid-template-columns: minmax(11rem, 0.8fr) minmax(0, 1.2fr);
  }

  .open-source-link {
    grid-column: 2;
  }
}

@media (max-width: 560px) {
  .projects-section-heading {
    margin-bottom: 0.8rem;
  }

  .featured-project-brand {
    min-height: 8.25rem;
  }

  .professional-delivery-grid {
    grid-template-columns: 1fr;
  }

  .open-source-project {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 0.55rem;
    padding-bottom: 0.55rem;
  }

  .open-source-link {
    grid-column: 1;
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "sections": {
      "personal": "Personal projects",
      "professional": "Professional achievements",
      "openSource": "Open-source contributions"
    },
    "achievements": {
      "authentication": "Keycloak authentication",
      "authenticatedSystems": "systems using authentication",
      "renderingCost": "Rendering costs",
      "costUnit": "Marketplace · estimated monthly cost in USD",
      "costReduction": "estimated reduction",
      "costPhase": { "before": "before", "after": "after" },
      "deliveries": "Platform work",
      "deliveryNames": {
        "marketplace": "Marketplace",
        "tracking": "Tracking",
        "media": "Media Hub",
        "gateway": "MCP gateway",
        "observability": "Observability"
      },
      "recognitions": "Recognition",
      "fullExperience": "View full experience"
    },
    "highlights": {
      "role": "Role",
      "focus": "Focus"
    },
    "personalProjects": {
      "snown": {
        "description": "Project management platform with Kanban, real-time collaborative document editing, a shared calendar, and custom permissions.",
        "meta": "Founder · Since 2018",
        "role": "Product & Engineering",
        "focus": "Role- and attribute-based access control"
      },
      "ascent": {
        "description": "An app in development for organizing habits, goals, schedules, and notes across desktop and mobile.",
        "meta": "Personal productivity",
        "focus": "Offline-first use and cross-device sync"
      },
      "ourWedding": {
        "description": "Wedding app with RSVPs, an event calendar, a social feed, and photo sharing.",
        "meta": "Mobile app",
        "focus": "Feature-based architecture and BLoC state management"
      },
      "experiment-ui": {
        "description": "Library with visual components in Vue 3 for rapid testing.",
        "meta": "Experimental Design System • since 2021",
        "role": "Design System Engineer"
      }
    },
    "openSourceProjects": {
      "vueuse": {
        "meta": "Vue ecosystem",
        "description": "Iterating on composables, documentation and accessibility fixes used by millions."
      },
      "hocuspocus": {
        "meta": "Realtime collaboration",
        "description": "DX improvements for collaborative editing servers and TS definitions."
      },
      "vuetifyNuxt": {
        "meta": "Nuxt module",
        "description": "Nuxt module tooling that keeps Vuetify apps fast to scaffold."
      },
      "vueresizable": {
        "meta": "Interaction components",
        "description": "Resizable building blocks with better touch and keyboard support."
      },
      "drauu": {
        "meta": "Creative toolkit",
        "description": "Creative whiteboard toolkit for Vue and Vite starters."
      }
    },
    "openProject": "Open {name}",
    "contributions": "Contributions",
    "viewContribution": "View contributions to {name}"
  },
  "pt-BR": {
    "sections": {
      "personal": "Projetos autorais",
      "professional": "Realizações profissionais",
      "openSource": "Contribuições open source"
    },
    "achievements": {
      "authentication": "Autenticação com Keycloak",
      "authenticatedSystems": "sistemas com autenticação",
      "renderingCost": "Custo de renderização",
      "costUnit": "Marketplace · custo mensal estimado em USD",
      "costReduction": "de redução estimada",
      "costPhase": { "before": "antes", "after": "depois" },
      "deliveries": "Entregas de plataforma",
      "deliveryNames": {
        "marketplace": "Marketplace",
        "tracking": "Tracking",
        "media": "Media Hub",
        "gateway": "Gateway MCP",
        "observability": "Observabilidade"
      },
      "recognitions": "Reconhecimentos",
      "fullExperience": "Ver experiência completa"
    },
    "highlights": {
      "role": "Atuação",
      "focus": "Foco"
    },
    "personalProjects": {
      "snown": {
        "description": "Plataforma de gestão de projetos com Kanban, edição colaborativa de documentos em tempo real, calendário compartilhado e permissões personalizadas.",
        "meta": "Fundador · desde 2018",
        "role": "Produto & Engenharia",
        "focus": "Controle de acesso por papéis e atributos"
      },
      "ascent": {
        "description": "Aplicativo em desenvolvimento para organizar hábitos, metas, agenda e notas no desktop e no celular.",
        "meta": "Produtividade pessoal",
        "focus": "Uso offline e sincronização entre dispositivos"
      },
      "ourWedding": {
        "description": "Aplicativo de casamento com confirmação de presença, calendário do evento, feed e compartilhamento de fotos.",
        "meta": "Aplicativo mobile",
        "focus": "Arquitetura por funcionalidades e gestão de estado com BLoC"
      },
      "experiment-ui": {
        "description": "Biblioteca com componentes visuais em Vue 3 para testes.",
        "meta": "Design System experimental • desde 2021",
        "role": "Design System Engineer"
      }
    },
    "openSourceProjects": {
      "vueuse": {
        "meta": "Ecossistema Vue",
        "description": "Ajustes contínuos em composables, documentação e acessibilidade usados por milhões."
      },
      "hocuspocus": {
        "meta": "Colaboração em tempo real",
        "description": "Melhorias de DX para servidores de edição colaborativa e tipos em TS."
      },
      "vuetifyNuxt": {
        "meta": "Módulo Nuxt",
        "description": "Ferramentas Nuxt que deixam o setup do Vuetify mais rápido."
      },
      "vueresizable": {
        "meta": "Componentes de interação",
        "description": "Componentes redimensionáveis com suporte melhorado a toque e teclado."
      },
      "drauu": {
        "meta": "Toolkit criativo",
        "description": "Toolkit criativo para quadros brancos em projetos Vue e Vite."
      }
    },
    "openProject": "Abrir {name}",
    "contributions": "Contribuições",
    "viewContribution": "Ver contribuições em {name}"
  },
  "es": {
    "sections": {
      "personal": "Proyectos propios",
      "professional": "Logros profesionales",
      "openSource": "Contribuciones open source"
    },
    "achievements": {
      "authentication": "Autenticación con Keycloak",
      "authenticatedSystems": "sistemas con autenticación",
      "renderingCost": "Coste de renderizado",
      "costUnit": "Marketplace · coste mensual estimado en USD",
      "costReduction": "de reducción estimada",
      "costPhase": { "before": "antes", "after": "después" },
      "deliveries": "Entregas de plataforma",
      "deliveryNames": {
        "marketplace": "Marketplace",
        "tracking": "Tracking",
        "media": "Media Hub",
        "gateway": "Gateway MCP",
        "observability": "Observabilidad"
      },
      "recognitions": "Reconocimientos",
      "fullExperience": "Ver experiencia completa"
    },
    "highlights": {
      "role": "Rol",
      "focus": "Enfoque"
    },
    "personalProjects": {
      "snown": {
        "description": "Plataforma de gestión de proyectos con Kanban, edición colaborativa de documentos en tiempo real, calendario compartido y permisos personalizados.",
        "meta": "Fundador · desde 2018",
        "role": "Producto e Ingeniería",
        "focus": "Control de acceso por roles y atributos"
      },
      "ascent": {
        "description": "Aplicación en desarrollo para organizar hábitos, objetivos, agenda y notas en el ordenador y el móvil.",
        "meta": "Productividad personal",
        "focus": "Uso sin conexión y sincronización entre dispositivos"
      },
      "ourWedding": {
        "description": "Aplicación para bodas con confirmación de asistencia, calendario del evento, publicaciones y fotos compartidas.",
        "meta": "Aplicación móvil",
        "focus": "Arquitectura por funcionalidades y gestión de estado con BLoC"
      },
      "experiment-ui": {
        "description": "Biblioteca con componentes visuales en Vue 3 para pruebas.",
        "meta": "Design System experimental • desde 2021",
        "role": "Design System Engineer"
      }
    },
    "openSourceProjects": {
      "vueuse": {
        "meta": "Ecosistema Vue",
        "description": "Mejoras constantes en composables, documentación y accesibilidad usados globalmente."
      },
      "hocuspocus": {
        "meta": "Colaboración en tiempo real",
        "description": "DX para servidores de edición colaborativa y tipos de TypeScript."
      },
      "vuetifyNuxt": {
        "meta": "Módulo Nuxt",
        "description": "Herramientas Nuxt para un arranque más rápido con Vuetify."
      },
      "vueresizable": {
        "meta": "Componentes de interacción",
        "description": "Componentes redimensionables con mejor soporte táctil y de teclado."
      },
      "drauu": {
        "meta": "Toolkit creativo",
        "description": "Toolkit creativo para pizarras en ecosistemas Vue y Vite."
      }
    },
    "openProject": "Abrir {name}",
    "contributions": "Contribuciones",
    "viewContribution": "Ver contribuciones en {name}"
  }
}
</i18n>
