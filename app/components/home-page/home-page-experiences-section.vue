<template>
  <AppSection :title="$t('homeSections.experiences.title')" class="about-experiences">
    <UContainer>
      <div class="experience-shortcuts">
        <a v-if="careerHistory.length" href="#experiencias-anteriores">
          {{ t('experiences.previous') }}
          <UIcon name="i-heroicons-arrow-down-20-solid" aria-hidden="true" />
        </a>
        <a href="#formacao">
          {{ t('experiences.education') }}
          <UIcon name="i-heroicons-arrow-down-20-solid" aria-hidden="true" />
        </a>
      </div>

      <article v-if="currentRole" class="current-experience" aria-labelledby="current-experience-title">
        <div class="current-experience-overview">
          <header>
            <p class="current-experience-company">
              <img
                :src="currentRole.companyMark ?? currentRole.image"
                alt=""
                width="32"
                height="32"
              >
              {{ currentRole.company }}
            </p>
            <h3 id="current-experience-title">{{ currentRole.title }}</h3>
            <p class="experience-meta">{{ currentRole.date }}</p>
            <p class="experience-meta">{{ describeLocation(currentRole) }}</p>
          </header>

          <div class="current-experience-summary">
            <p>{{ currentRole.text }}</p>
            <p class="experience-stack">{{ currentRole.skills.join(' · ') }}</p>
          </div>
        </div>

        <div v-if="currentRole.achievements" id="realizacoes-profissionais" class="current-achievements">
          <h4>{{ t('experiences.achievements') }}</h4>
          <dl class="current-achievements-list">
            <div v-for="(achievement, key) in currentRole.achievements" :key="key">
              <dt>{{ t(`achievements.${key}`) }}</dt>
              <dd>{{ achievement }}</dd>
            </div>
          </dl>
        </div>

        <div v-if="currentRole.recognitions?.length" class="experience-recognitions">
          <h4>
            <UIcon name="i-heroicons-trophy" aria-hidden="true" />
            {{ t('experiences.recognitions') }}
          </h4>
          <ul role="list">
            <li v-for="recognition in currentRole.recognitions" :key="recognition.title">
              <strong>{{ recognition.title }}</strong>
              <p>{{ recognition.description }}</p>
            </li>
          </ul>
        </div>
      </article>

      <section v-if="careerHistory.length" id="experiencias-anteriores" class="career-history" aria-labelledby="career-history-title">
        <h3 id="career-history-title">{{ t('experiences.previous') }}</h3>
        <ol class="career-company-list" role="list">
          <li v-for="company in careerHistory" :key="company.name" class="career-company">
            <header class="company-identity">
              <img :src="company.image" alt="" width="58" height="40" loading="lazy">
              <h4>{{ company.name }}</h4>
            </header>

            <ol class="company-roles" role="list">
              <li v-for="role in company.roles" :key="role.date">
                <div class="company-role-heading">
                  <h5>{{ role.title }}</h5>
                  <p class="experience-meta">{{ role.date }}</p>
                </div>
                <p class="experience-meta">{{ describeLocation(role) }}</p>
                <p class="company-role-description">{{ role.text }}</p>
                <p class="experience-stack">{{ role.skills.join(' · ') }}</p>
              </li>
            </ol>
          </li>
        </ol>
      </section>

      <section id="formacao" class="education-history" aria-labelledby="education-history-title">
        <h3 id="education-history-title">{{ t('experiences.education') }}</h3>
        <ul class="education-list" role="list">
          <li v-for="item in educationItems" :key="item.company">
            <img :src="item.image" alt="" width="64" height="38" loading="lazy">
            <div>
              <h4>{{ t(`experiences.educationItems.${item.key}.title`) }}</h4>
              <p class="education-institution">{{ item.company }}</p>
              <p class="experience-meta">{{ t(`experiences.educationItems.${item.key}.date`) }}</p>
              <p class="education-detail">{{ t(`experiences.educationItems.${item.key}.text`) }}</p>
            </div>
          </li>
        </ul>
      </section>
    </UContainer>
  </AppSection>
</template>

<script setup lang="ts">
import type { ExperienceItem } from '~/composables/use-professional-experience'

const { t } = useI18n({ useScope: 'local' })
const professionalItems = useProfessionalExperience()
const currentRole = computed(() => professionalItems.value.find(role => role.isCurrentJob))
const careerHistory = computed(() => {
  const companies = new Map<string, { name: string; image: string; roles: ExperienceItem[] }>()

  for (const role of professionalItems.value) {
    if (role.isCurrentJob) continue
    const company = companies.get(role.company)
    if (company) {
      company.roles.push(role)
    } else {
      companies.set(role.company, { name: role.company, image: role.image, roles: [role] })
    }
  }

  return [...companies.values()]
})

function describeLocation(role: ExperienceItem) {
  const mode = role.workMode ? t(`workModes.${role.workMode}`) : ''
  return mode && mode !== role.location ? `${role.location} · ${mode}` : role.location
}

const educationItems = [
  { key: 'item1', company: 'Universidade do Vale do Paraíba', image: '/images/education/univap.svg' },
  { key: 'item2', company: 'ETEC Zona Leste', image: '/images/education/logo_etec_cor.png' },
  { key: 'item3', company: 'Callan Method', image: '/images/education/callan.svg' },
]
</script>

<style scoped>
.about-experiences {
  scroll-margin-block-start: var(--site-header-height);
}

.about-experiences.app-section {
  background: var(--site-canvas);
}

.experience-shortcuts {
  display: flex;
  flex-wrap: wrap;
  gap: 0 1rem;
  margin-bottom: 0.75rem;
}

.experience-shortcuts a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 0.35rem;
  color: var(--site-link);
  font-size: 0.85rem;
  font-weight: 700;
  text-underline-offset: 0.25em;
}

.experience-shortcuts a:hover {
  text-decoration: underline;
}

.experience-shortcuts a:focus-visible {
  outline: 2px solid var(--site-link);
  outline-offset: 3px;
}

.current-experience {
  padding: clamp(1.2rem, 3.6vw, 2.5rem);
  border-radius: 1rem;
  background: var(--site-soft);
  color: var(--site-ink);
}

.current-experience-overview {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.3fr);
  gap: 1rem clamp(1.5rem, 4.2vw, 3.75rem);
}

.current-experience-company {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--site-navy);
  font-size: 0.9rem;
  font-weight: 750;
}

.current-experience-company img {
  flex: none;
  object-fit: contain;
}

.current-experience h3 {
  margin-top: 0.75rem;
  margin-bottom: 0.55rem;
  color: var(--site-navy);
  font-size: clamp(1.55rem, 3.4vw, 2.55rem);
  font-weight: 750;
  line-height: 1.08;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.experience-meta,
.experience-stack {
  color: var(--site-muted);
  font-size: 0.8rem;
  line-height: 1.55;
}

.experience-meta + .experience-meta {
  margin-top: 0.18rem;
}

.current-experience-summary {
  align-self: center;
  font-size: clamp(0.95rem, 1.5vw, 1.08rem);
  line-height: 1.65;
}

.current-experience-summary > p:first-child {
  max-width: 57ch;
}

.experience-stack {
  margin-top: 0.55rem;
}

.current-achievements,
.experience-recognitions {
  margin-top: clamp(1.25rem, 2.9vw, 1.9rem);
  padding-top: 1.15rem;
  border-top: 1px solid var(--site-line);
}

.current-achievements,
.career-history,
.education-history {
  scroll-margin-block-start: calc(var(--site-header-height) + 1rem);
}

.current-experience h4,
.company-identity h4,
.education-list h4 {
  color: var(--site-navy);
  font-size: 1.08rem;
  font-weight: 750;
  line-height: 1.3;
}

.current-achievements-list,
.experience-recognitions ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem clamp(1.5rem, 4vw, 3rem);
  margin-top: 0.8rem;
}

.current-achievements-list dt,
.experience-recognitions strong {
  color: var(--site-navy);
  font-size: 0.875rem;
  font-weight: 750;
}

.current-achievements-list dd,
.experience-recognitions p {
  max-width: 64ch;
  margin-top: 0.18rem;
  font-size: 0.875rem;
  line-height: 1.55;
}

.experience-recognitions h4 {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.experience-recognitions h4 .iconify {
  color: var(--site-link);
}

.career-history,
.education-history {
  margin-top: clamp(2.6rem, 5.8vw, 4.6rem);
}

.career-history h3,
.education-history h3 {
  margin-bottom: 1rem;
  color: var(--site-navy);
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.career-company-list,
.education-list {
  border-top: 1px solid var(--site-line);
}

.career-company,
.education-list li {
  padding-block: clamp(1.15rem, 2.6vw, 1.8rem);
  border-bottom: 1px solid var(--site-line);
}

.career-company {
  display: grid;
  grid-template-columns: minmax(10rem, 1fr) minmax(0, 3fr);
  gap: 1rem clamp(1.5rem, 4.2vw, 3.75rem);
}

.company-identity {
  display: flex;
  align-items: center;
  align-self: start;
  gap: 0.8rem;
}

.company-identity img,
.education-list img {
  flex: none;
  object-fit: contain;
  object-position: left center;
}

.company-identity img {
  width: 3.625rem;
  height: 2.5rem;
}

.education-list img {
  width: 4rem;
  height: 2.375rem;
}

.company-roles > li + li {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--site-line);
}

.company-role-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.2rem 1rem;
}

.company-role-heading h5 {
  color: var(--site-navy);
  font-size: 0.98rem;
  font-weight: 750;
}

.company-role-description,
.education-detail {
  max-width: 68ch;
  margin-top: 0.45rem;
  color: var(--site-ink);
  font-size: 0.9rem;
  line-height: 1.55;
}

.education-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: clamp(1rem, 3vw, 2rem);
}

.education-list li {
  display: grid;
  align-content: start;
  gap: 0.65rem;
}

.education-institution {
  margin-top: 0.3rem;
  color: var(--site-ink);
  font-size: 0.85rem;
  font-weight: 650;
}

.education-institution + .experience-meta {
  margin-top: 0.25rem;
}

@media (max-width: 760px) {
  .current-experience-overview,
  .career-company,
  .education-list {
    grid-template-columns: 1fr;
  }

  .education-list li {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.75rem;
  }
}

@media (max-width: 570px) {
  .current-achievements-list,
  .experience-recognitions ul {
    grid-template-columns: 1fr;
  }
}
</style>

<i18n lang="json">
{
  "pt-BR": {
    "experiences": {
      "achievements": "Realizações profissionais",
      "recognitions": "Reconhecimentos",
      "educationItems": {
        "item1": {
          "date": "Janeiro de 2017 - Dezembro de 2022",
          "title": "Engenharia da Computação",
          "text": "Bacharelado em Engenharia da Computação."
        },
        "item2": {
          "date": "Janeiro de 2013 - Dezembro de 2015",
          "title": "Ensino Médio e Técnico em Informática",
          "text": "Formação técnica em Informática integrada ao ensino médio."
        },
        "item3": {
          "date": "Agosto de 2023 - Atualmente",
          "title": "Inglês",
          "text": "Leitura e compreensão oral avançadas, com conversação intermediária."
        }
      },
      "previous": "Experiências anteriores",
      "education": "Formação e idiomas"
    },
    "workModes": {
      "remote": "Remoto",
      "onsite": "Presencial",
      "hybrid": "Híbrido"
    },
    "achievements": {
      "edge": "Migração para a Cloudflare",
      "auth": "Autenticação",
      "marketplace": "Marketplace",
      "tracking": "Tracking",
      "media": "Media Hub",
      "gateway": "Gateway MCP",
      "observability": "Observabilidade"
    }
  },
  "en": {
    "experiences": {
      "achievements": "Professional achievements",
      "recognitions": "Recognition",
      "educationItems": {
        "item1": {
          "date": "January 2017 - December 2022",
          "title": "Computer Engineering",
          "text": "Bachelor’s degree in Computer Engineering."
        },
        "item2": {
          "date": "January 2013 - December 2015",
          "title": "High School and Technical Education in Computing",
          "text": "Technical education in computing alongside high school."
        },
        "item3": {
          "date": "August 2023 - Present",
          "title": "English",
          "text": "Advanced reading and listening comprehension, with intermediate conversation."
        }
      },
      "previous": "Previous experience",
      "education": "Education and languages"
    },
    "workModes": {
      "remote": "Remote",
      "onsite": "On-site",
      "hybrid": "Hybrid"
    },
    "achievements": {
      "edge": "Cloudflare migration",
      "auth": "Authentication",
      "marketplace": "Marketplace",
      "tracking": "Tracking",
      "media": "Media Hub",
      "gateway": "MCP gateway",
      "observability": "Observability"
    }
  },
  "es": {
    "experiences": {
      "achievements": "Logros profesionales",
      "recognitions": "Reconocimientos",
      "educationItems": {
        "item1": {
          "date": "Enero de 2017 - Diciembre de 2022",
          "title": "Ingeniería de Computación",
          "text": "Licenciatura en Ingeniería de Computación."
        },
        "item2": {
          "date": "Enero de 2013 - Diciembre de 2015",
          "title": "Educación Secundaria y Técnica en Informática",
          "text": "Formación técnica en informática integrada a la educación secundaria."
        },
        "item3": {
          "date": "Agosto de 2023 - Actualidad",
          "title": "Inglés",
          "text": "Lectura y comprensión oral avanzadas, con conversación intermedia."
        }
      },
      "previous": "Experiencia anterior",
      "education": "Formación e idiomas"
    },
    "workModes": {
      "remote": "Remoto",
      "onsite": "Presencial",
      "hybrid": "Híbrido"
    },
    "achievements": {
      "edge": "Migración a Cloudflare",
      "auth": "Autenticación",
      "marketplace": "Marketplace",
      "tracking": "Tracking",
      "media": "Media Hub",
      "gateway": "Gateway MCP",
      "observability": "Observabilidad"
    }
  }
}
</i18n>
