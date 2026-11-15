<template>
  <app-section class="home-page-experiences-section py-20">
    <UContainer class="space-y-10">
      <!-- Modern Tab Selector -->
      <div class="flex justify-center">
        <div
          class="tab-container relative inline-flex rounded-2xl border border-slate-200/60 bg-white/80 p-1.5 shadow-lg shadow-primary/5 backdrop-blur-md"
          role="tablist"
        >
          <div
            class="tab-indicator absolute inset-y-1.5 rounded-xl bg-gradient-to-r from-primary to-primary/90 shadow-md shadow-primary/30 transition-all duration-300 ease-out"
            :style="tabIndicatorStyle"
          />
          <button
            v-for="(option, index) in tabOptions"
            :key="option.value"
            :ref="(el) => (tabRefs[index] = el as HTMLButtonElement)"
            class="tab-button relative z-10 flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-300"
            :class="
              tab === option.value
                ? 'text-white'
                : 'text-secondary/70 hover:text-secondary'
            "
            type="button"
            role="tab"
            @click="tab = option.value"
          >
            <i :class="option.icon" class="text-xs" aria-hidden="true" />
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Experience Cards Grid -->
      <div class="experiences-grid">
        <TransitionGroup name="card-list" tag="div" class="space-y-6">
          <article
            v-for="(item, index) in items"
            :key="`${tab}-${item.title}-${index}`"
            class="experience-card group"
          >
            <!-- Timeline Connector -->
            <div class="timeline-connector">
              <div class="timeline-line" />
              <div class="timeline-dot">
                <i :class="item.icon" class="text-xs text-white" aria-hidden="true" />
              </div>
            </div>

            <!-- Card Content -->
            <div class="card-content">
              <!-- Header with Logo and Badges -->
              <div class="card-header">
                <div class="logo-container">
                  <img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.company || item.title"
                    class="company-logo"
                  />
                  <div v-else class="logo-placeholder">
                    <i :class="item.icon" class="text-2xl text-primary/60" />
                  </div>
                </div>

                <div class="header-info">
                  <div class="badges-row">
                    <span class="date-badge">
                      <i class="far fa-calendar-alt mr-1.5" aria-hidden="true" />
                      {{ item.date }}
                    </span>
                    <span
                      v-if="item.isCurrentJob"
                      class="status-badge status-badge--current"
                    >
                      <span class="pulse-dot" />
                      {{ t('badges.current') }}
                    </span>
                    <span
                      v-if="item.workMode"
                      class="status-badge"
                      :class="`status-badge--${item.workMode}`"
                    >
                      <i
                        :class="workModeIcons[item.workMode]"
                        class="mr-1"
                        aria-hidden="true"
                      />
                      {{ t(`badges.${item.workMode}`) }}
                    </span>
                  </div>

                  <h3 class="job-title">{{ item.title }}</h3>
                  
                  <p v-if="item.company" class="company-name">
                    <i class="fas fa-building mr-1.5 text-primary/50" aria-hidden="true" />
                    {{ item.company }}
                    <span v-if="item.location" class="location">
                      · {{ item.location }}
                    </span>
                  </p>
                </div>
              </div>

              <!-- Description -->
              <p v-if="item.text" class="description">
                {{ item.text }}
              </p>

              <!-- Skills Tags -->
              <div v-if="item.skills && item.skills.length" class="skills-container">
                <span
                  v-for="skill in item.skills"
                  :key="skill"
                  class="skill-tag"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </div>
    </UContainer>
  </app-section>
</template>

<script setup lang="ts">
const $display = useDisplay()
const tab = ref<'professionalItems' | 'education'>('professionalItems')
const tabRefs = ref<(HTMLButtonElement | null)[]>([])

const { t } = useI18n({
  useScope: 'local',
})

const workModeIcons: Record<string, string> = {
  remote: 'fas fa-home',
  onsite: 'fas fa-map-marker-alt',
  hybrid: 'fas fa-arrows-alt-h',
}

const tabIndicatorStyle = computed(() => {
  const activeIndex = tabOptions.value.findIndex((opt) => opt.value === tab.value)
  const activeTab = tabRefs.value[activeIndex]
  if (!activeTab) return { left: '6px', width: '120px' }
  return {
    left: `${activeTab.offsetLeft}px`,
    width: `${activeTab.offsetWidth}px`,
  }
})

const tabOptions = computed(() => [
  {
    value: 'professionalItems',
    label: t('experiences.professionalTab'),
    icon: 'fas fa-briefcase',
  },
  {
    value: 'education',
    label: t('experiences.educationTab'),
    icon: 'fas fa-graduation-cap',
  },
])

const professionalItems = useProfessionalExperience()

const educationItems = computed(() => [
  {
    icon: 'fas fa-university',
    date: t('experiences.educationItems.item1.date'),
    title: t('experiences.educationItems.item1.title'),
    company: 'Universidade do Vale do Paraíba',
    image: '/images/education/univap.svg',
    location: t('experiences.educationItems.item1.location'),
    text: t('experiences.educationItems.item1.text'),
    skills: ['C', 'C++', 'Python', 'Algorithms', 'Data Structures'],
  },
  {
    icon: 'fas fa-school',
    date: t('experiences.educationItems.item2.date'),
    title: t('experiences.educationItems.item2.title'),
    company: 'ETEC',
    image: '/images/education/logo_etec_cor.png',
    location: t('experiences.educationItems.item2.location'),
    text: t('experiences.educationItems.item2.text'),
    skills: ['Programming', 'Web Development', 'Databases'],
  },
  {
    icon: 'fas fa-language',
    date: t('experiences.educationItems.item3.date'),
    title: t('experiences.educationItems.item3.title'),
    company: 'Callan Method',
    image: '/images/education/callan.svg',
    location: t('experiences.educationItems.item3.location'),
    text: t('experiences.educationItems.item3.text'),
    isCurrentJob: true,
    skills: ['English', 'Communication'],
  },
])

const items = computed(() => {
  if (tab.value === 'professionalItems') return professionalItems.value
  if (tab.value === 'education') return educationItems.value
  return []
})
</script>

<i18n lang="json">
{
  "pt-BR": {
    "badges": {
      "current": "Atual",
      "remote": "Remoto",
      "onsite": "Presencial",
      "hybrid": "Híbrido"
    },
    "experiences": {
      "title": "Experiências",
      "description": "Profissionais e de Ensino.",
      "professionalTab": "Profissionais",
      "educationTab": "Educacionais",
      "educationItems": {
        "item1": {
          "date": "Janeiro de 2017 - Dezembro de 2022",
          "title": "Engenharia da Computação",
          "location": "São José dos Campos, SP",
          "text": "Graduação Bacharelado em Engenharia da Computação."
        },
        "item2": {
          "date": "Janeiro de 2013 - Dezembro de 2015",
          "title": "Ensino Médio e Técnico em Informática",
          "location": "São Paulo, SP",
          "text": "Ensino médio e técnico em Informática."
        },
        "item3": {
          "date": "Agosto de 2023 - Atualmente",
          "title": "Inglês",
          "location": "Intermediário - Cursando",
          "text": "Proficiência em Leitura: Avançada. Habilidade de Conversação: Intermediária"
        }
      }
    }
  },
  "en": {
    "badges": {
      "current": "Current",
      "remote": "Remote",
      "onsite": "On-site",
      "hybrid": "Hybrid"
    },
    "experiences": {
      "title": "Experiences",
      "description": "Professional and Educational.",
      "professionalTab": "Professional",
      "educationTab": "Educational",
      "educationItems": {
        "item1": {
          "date": "January 2017 - December 2022",
          "title": "Computer Engineering",
          "location": "São José dos Campos, SP",
          "text": "Bachelor's Degree in Computer Engineering."
        },
        "item2": {
          "date": "January 2013 - December 2015",
          "title": "High School and Technical Education in Computing",
          "location": "São Paulo, SP",
          "text": "High School and Technical Education in Computing."
        },
        "item3": {
          "date": "August 2023 - Present",
          "title": "English",
          "location": "Intermediate - In Progress",
          "text": "Reading Proficiency: Advanced. Conversation Skills: Intermediate"
        }
      }
    }
  },
  "es": {
    "badges": {
      "current": "Actual",
      "remote": "Remoto",
      "onsite": "Presencial",
      "hybrid": "Híbrido"
    },
    "experiences": {
      "title": "Experiencias",
      "description": "Profesionales y Educativas.",
      "professionalTab": "Profesionales",
      "educationTab": "Educativas",
      "educationItems": {
        "item1": {
          "date": "Enero de 2017 - Diciembre de 2022",
          "title": "Ingeniería de Computación",
          "location": "São José dos Campos, SP",
          "text": "Licenciatura en Ingeniería de Computación."
        },
        "item2": {
          "date": "Enero de 2013 - Diciembre de 2015",
          "title": "Educación Secundaria y Técnica en Informática",
          "location": "São Paulo, SP",
          "text": "Educación Secundaria y Técnica en Informática."
        },
        "item3": {
          "date": "Agosto de 2023 - Actualidad",
          "title": "Inglés",
          "location": "Intermedio - En Progreso",
          "text": "Competencia de Lectura: Avanzada. Habilidad de Conversación: Intermedio."
        }
      }
    }
  }
}
</i18n>

<style scoped>
.home-page-experiences-section {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 255, 0.98) 100%
  );
}

/* Tab Container */
.tab-container {
  position: relative;
}

.tab-indicator {
  z-index: 0;
}

.tab-button {
  min-width: 140px;
  justify-content: center;
}

/* Experience Card */
.experience-card {
  display: flex;
  gap: 1.5rem;
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: var(--delay);
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Timeline */
.timeline-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 48px;
}

.timeline-line {
  width: 2px;
  flex-grow: 1;
  background: linear-gradient(
    180deg,
    var(--color-primary) 0%,
    rgba(1, 83, 255, 0.2) 100%
  );
  border-radius: 1px;
}

.timeline-dot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, #0066ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 
    0 4px 12px -2px rgba(1, 83, 255, 0.4),
    0 0 0 4px rgba(1, 83, 255, 0.1);
  transition: all 0.3s ease;
}

.experience-card:hover .timeline-dot {
  transform: scale(1.1);
  box-shadow: 
    0 6px 16px -2px rgba(1, 83, 255, 0.5),
    0 0 0 6px rgba(1, 83, 255, 0.15);
}

/* Card Content */
.card-content {
  flex: 1;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 255, 0.9) 100%
  );
  border: 1px solid rgba(1, 83, 255, 0.08);
  border-radius: 1.25rem;
  padding: 1.5rem;
  backdrop-blur: 12px;
  box-shadow: 
    0 4px 24px -4px rgba(0, 0, 0, 0.06),
    0 2px 8px -2px rgba(0, 0, 0, 0.03);
  transition: all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.card-content:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 12px 32px -8px rgba(1, 83, 255, 0.15),
    0 4px 16px -4px rgba(0, 0, 0, 0.08);
  border-color: rgba(1, 83, 255, 0.15);
}

/* Card Header */
.card-header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.logo-container {
  flex-shrink: 0;
}

.company-logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: 12px;
  background: white;
  padding: 6px;
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.1);
}

.logo-placeholder {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8faff 0%, #e8efff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-info {
  flex: 1;
  min-width: 0;
}

/* Badges */
.badges-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.date-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-secondary);
  opacity: 0.7;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 9999px;
  background: rgba(100, 116, 139, 0.1);
  color: #64748b;
}

.status-badge--current {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%);
  color: #059669;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  margin-right: 6px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

.status-badge--remote {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%);
  color: #4f46e5;
}

.status-badge--onsite {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%);
  color: #d97706;
}

.status-badge--hybrid {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%);
  color: #0891b2;
}

/* Job Info */
.job-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-secondary);
  line-height: 1.3;
  margin-bottom: 0.25rem;
}

.company-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-secondary);
  opacity: 0.8;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.location {
  font-weight: 500;
  opacity: 0.7;
}

/* Description */
.description {
  margin-top: 1rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-secondary);
  opacity: 0.75;
}

/* Skills */
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.skill-tag {
  display: inline-flex;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-primary);
  background: linear-gradient(135deg, rgba(1, 83, 255, 0.08) 0%, rgba(1, 83, 255, 0.04) 100%);
  border: 1px solid rgba(1, 83, 255, 0.1);
  border-radius: 9999px;
  transition: all 0.2s ease;
}

.skill-tag:hover {
  background: linear-gradient(135deg, rgba(1, 83, 255, 0.15) 0%, rgba(1, 83, 255, 0.1) 100%);
  border-color: rgba(1, 83, 255, 0.2);
  transform: translateY(-1px);
}

/* Transitions */
.card-list-enter-active,
.card-list-leave-active {
  transition: all 0.4s ease;
}

.card-list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.card-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .experience-card {
    flex-direction: column;
    gap: 0;
  }

  .timeline-connector {
    flex-direction: row;
    width: 100%;
    height: 48px;
    padding-left: 0.5rem;
  }

  .timeline-line {
    width: auto;
    height: 2px;
    flex-grow: 0;
    width: 20px;
  }

  .card-header {
    flex-direction: column;
    gap: 0.75rem;
  }

  .company-logo,
  .logo-placeholder {
    width: 48px;
    height: 48px;
  }

  .job-title {
    font-size: 1.125rem;
  }

  .tab-button {
    min-width: auto;
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
  }
}
</style>
