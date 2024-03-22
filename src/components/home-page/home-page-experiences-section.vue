<template>
  <app-section color="secondary-darken-2" class="home-page-experiences-section">
    <v-container>
      <div class="d-flex justify-center mb-10">
        <ClientOnly>
          <v-tabs
            v-model="tab"
            bg-color="primary"
            class="rounded-lg"
            fixed-tabs
          >
            <v-tab value="profissional">{{
              t('experiences.professionalTab')
            }}</v-tab>

            <v-tab value="education">{{ t('experiences.educationTab') }}</v-tab>
          </v-tabs>
        </ClientOnly>
      </div>

      <v-timeline
        line-color="primary"
        :side="!$display.mdAndUp.value ? 'end' : undefined"
      >
        <v-timeline-item
          v-for="(item, i) in items"
          :key="i"
          dot-color="secondary-darken-2"
          fill-dot
          :hide-opposite="!$display.mdAndUp.value"
        >
          <template #opposite>
            <div
              class="pt-1 font-weight-medium text-white"
              v-text="item.date"
            ></div>
          </template>

          <template #icon>
            <v-icon :icon="item.icon" color="white" size="x-small" />
          </template>

          <v-card
            class="pa-6"
            :data-aos="
              !$display.mdAndUp.value
                ? 'fade-left'
                : i % 2 === 0
                  ? 'fade-left'
                  : 'fade-right'
            "
            data-aos-duration="2000"
            :title="item.title"
            :subtitle="item.subtitle"
            :text="item.text"
          >
            <template #prepend>
              <v-img :src="item.image" width="100px" />
            </template>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </app-section>
</template>

<script setup lang="ts">
const $display = useDisplay()
const tab = ref('profissional')

const { t } = useI18n({
  useScope: 'local',
})

const profissionalItems = computed(() => [
  {
    icon: 'fas fa-briefcase',
    date: t('experiences.profissionalItems.item1.date'),
    title: t('experiences.profissionalItems.item1.title'),
    image: '/images/companies/buser.svg',
    subtitle: t('experiences.profissionalItems.item1.subtitle'),
    text: t('experiences.profissionalItems.item1.text'),
  },
  {
    icon: 'fas fa-briefcase',
    date: t('experiences.profissionalItems.item2.date'),
    title: t('experiences.profissionalItems.item2.title'),
    image: '/images/companies/quero_educacao.svg',
    subtitle: t('experiences.profissionalItems.item2.subtitle'),
    text: t('experiences.profissionalItems.item2.text'),
  },
  {
    icon: 'fas fa-briefcase',
    date: t('experiences.profissionalItems.item3.date'),
    title: t('experiences.profissionalItems.item3.title'),
    image: '/images/companies/quero_educacao.svg',
    subtitle: t('experiences.profissionalItems.item3.subtitle'),
    text: t('experiences.profissionalItems.item3.text'),
  },
  {
    icon: 'fas fa-briefcase',
    date: t('experiences.profissionalItems.item4.date'),
    title: t('experiences.profissionalItems.item4.title'),
    image: '/images/companies/quero_educacao.svg',
    subtitle: t('experiences.profissionalItems.item4.subtitle'),
    text: t('experiences.profissionalItems.item4.text'),
  },
])

const educationItems = computed(() => [
  {
    icon: 'fas fa-graduation-cap',
    date: t('experiences.educationItems.item1.date'),
    title: t('experiences.educationItems.item1.title'),
    image: '/images/education/univap.svg',
    subtitle: t('experiences.educationItems.item1.subtitle'),
    text: t('experiences.educationItems.item1.text'),
  },
  {
    icon: 'fas fa-graduation-cap',
    date: t('experiences.educationItems.item2.date'),
    title: t('experiences.educationItems.item2.title'),
    image: '/images/education/logo_etec_cor.png',
    subtitle: t('experiences.educationItems.item2.subtitle'),
    text: t('experiences.educationItems.item2.text'),
  },
  {
    icon: 'fas fa-language',
    date: t('experiences.educationItems.item3.date'),
    title: t('experiences.educationItems.item3.title'),
    image: '/images/education/callan.svg',
    subtitle: t('experiences.educationItems.item3.subtitle'),
    text: t('experiences.educationItems.item3.text'),
  },
])

const items = computed(() => {
  if (tab.value === 'profissional') return profissionalItems.value

  if (tab.value === 'education') return educationItems.value

  return []
})
</script>

<i18n lang="json">
{
  "pt-BR": {
    "experiences": {
      "title": "Experiências",
      "description": "Profissionais e de Ensino.",
      "professionalTab": "Profissionais",
      "educationTab": "Educacionais",
      "profissionalItems": {
        "item1": {
          "date": "Janeiro de 2022 - Março de 2023",
          "title": "Desenvolvedor Front-end",
          "subtitle": "BUSER, São José dos Campos - SP\nHOME OFFICE",
          "text": "Atuação como Desenvolvedor Frontend/Fullstack, utilizando tecnologias como Vue.js, Nuxt, Django (Python) na criação de interfaces para soluções B2B. Participação em uma equipe ágil com foco em resultados mensuráveis."
        },
        "item2": {
          "date": "Março de 2021 - Dezembro de 2021",
          "title": "Desenvolvedor Front-end",
          "subtitle": "QUERO EDUCAÇÃO, São José dos Campos\nHOME OFFICE",
          "text": "Desenvolvimento com Vue.js, React, Phoenix (Elixir), Rails (Ruby). Criação de interfaces para os segmentos B2B e B2C."
        },
        "item3": {
          "date": "Março de 2020 - Março de 2021",
          "title": "Estagiário em Desenvolvimento Front-end",
          "subtitle": "QUERO EDUCAÇÃO, São José dos Campos\nHOME OFFICE",
          "text": "Desenvolvendo telas e interfaces para o B2B."
        },
        "item4": {
          "date": "Agosto de 2019 - Março de 2020",
          "title": "Estagiário em SiteOps",
          "subtitle": "QUERO EDUCAÇÃO, São José dos Campos\nPRESENCIAL",
          "text": "Cuidando das principais operações da plataforma web Quero Bolsa."
        }
      },
      "educationItems": {
        "item1": {
          "date": "Janeiro de 2017 - Dezembro de 2022",
          "title": "Engenharia da Computação",
          "subtitle": "São José dos Campos — Graduação Bacharelado",
          "text": "Graduação Bacharelado em Engenharia da Computação."
        },
        "item2": {
          "date": "Janeiro de 2013 - Dezembro de 2015",
          "title": "Ensino Médio e Técnico em Informática",
          "subtitle": "ETEC, São Paulo",
          "text": "Ensino médio e técnico em Informática."
        },
        "item3": {
          "date": "Agosto de 2023 - Agora",
          "title": "Inglês",
          "subtitle": "Intermediário - Cursando",
          "text": "Proficiência em Leitura: Avançada. Habilidade de Conversação: Intermediária"
        }
      }
    }
  },
  "en": {
    "experiences": {
      "title": "Experiences",
      "description": "Professional and Educational.",
      "professionalTab": "Professional",
      "educationTab": "Educational",
      "profissionalItems": {
        "item1": {
          "date": "January 2022 - March 2023",
          "title": "Front-end Developer",
          "subtitle": "BUSER, São José dos Campos - SP\nHOME OFFICE",
          "text": "Worked as a Frontend/Fullstack Developer, using technologies like Vue.js, Nuxt, Django (Python) in creating interfaces for B2B solutions. Participation in an agile team with a focus on measurable results."
        },
        "item2": {
          "date": "March 2021 - December 2021",
          "title": "Front-end Developer",
          "subtitle": "QUERO EDUCAÇÃO, São José dos Campos\nHOME OFFICE",
          "text": "Development with Vue.js, React, Phoenix (Elixir), Rails (Ruby). Creating interfaces for B2B and B2C segments."
        },
        "item3": {
          "date": "March 2020 - March 2021",
          "title": "Front-end Development Intern",
          "subtitle": "QUERO EDUCAÇÃO, São José dos Campos\nHOME OFFICE",
          "text": "Developing screens and interfaces for B2B."
        },
        "item4": {
          "date": "August 2019 - March 2020",
          "title": "SiteOps Intern",
          "subtitle": "QUERO EDUCAÇÃO, São José dos Campos\nON-SITE",
          "text": "Handling the main operations of the Quero Bolsa web platform."
        }
      },
      "educationItems": {
        "item1": {
          "date": "January 2017 - December 2022",
          "title": "Computer Engineering",
          "subtitle": "São José dos Campos — Bachelor's Degree",
          "text": "Bachelor's Degree in Computer Engineering."
        },
        "item2": {
          "date": "January 2013 - December 2015",
          "title": "High School and Technical Education in Computing",
          "subtitle": "ETEC, São Paulo",
          "text": "High School and Technical Education in Computing."
        },
        "item3": {
          "date": "August 2023 - Present",
          "title": "English",
          "subtitle": "Intermediate - In Progress",
          "text": "Reading Proficiency: Advanced. Conversation Skills: Intermediate"
        }
      }
    }
  },
  "es": {
    "experiences": {
      "title": "Experiencias",
      "description": "Profesionales y Educativas.",
      "professionalTab": "Profesionales",
      "educationTab": "Educativas",
      "profissionalItems": {
        "item1": {
          "date": "Enero de 2022 - Marzo de 2023",
          "title": "Desarrollador Front-end",
          "subtitle": "BUSER, São José dos Campos - SP\nHOME OFFICE",
          "text": "Actuación como Desarrollador Frontend/Fullstack, utilizando tecnologías como Vue.js, Nuxt, Django (Python) en la creación de interfaces para soluciones B2B. Participación en un equipo ágil con enfoque en resultados medibles."
        },
        "item2": {
          "date": "Marzo de 2021 - Diciembre de 2021",
          "title": "Desarrollador Front-end",
          "subtitle": "QUERO EDUCAÇÃO, São José dos Campos\nHOME OFFICE",
          "text": "Desarrollo con Vue.js, React, Phoenix (Elixir), Rails (Ruby). Creación de interfaces para los segmentos B2B y B2C."
        },
        "item3": {
          "date": "Marzo de 2020 - Marzo de 2021",
          "title": "Pasante en Desarrollo Front-end",
          "subtitle": "QUERO EDUCAÇÃO, São José dos Campos\nHOME OFFICE",
          "text": "Desarrollando pantallas e interfaces para el B2B."
        },
        "item4": {
          "date": "Agosto de 2019 - Marzo de 2020",
          "title": "Pasante en SiteOps",
          "subtitle": "QUERO EDUCAÇÃO, São José dos Campos\nPRESENCIAL",
          "text": "Cuidando de las principales operaciones de la plataforma web de Quero Bolsa."
        }
      },
      "educationItems": {
        "item1": {
          "date": "Enero de 2017 - Diciembre de 2022",
          "title": "Ingeniería de Computación",
          "subtitle": "São José dos Campos — Licenciatura",
          "text": "Licenciatura en Ingeniería de Computación."
        },
        "item2": {
          "date": "Enero de 2013 - Diciembre de 2015",
          "title": "Educación Secundaria y Técnica en Informática",
          "subtitle": "ETEC, São Paulo",
          "text": "Educación Secundaria y Técnica en Informática."
        },
        "item3": {
          "date": "Agosto de 2023 - Actualidad",
          "title": "Inglés",
          "subtitle": "Intermedio - En Progreso",
          "text": "Competencia de Lectura: Avanzada. Habilidad de Conversación: Intermedio."
        }
      }
    }
  }
}
</i18n>

<style lang="scss">
.home-page-experiences-section {
  & .v-card-item,
  & .v-card-item__content {
    height: 100%;
  }

  & .v-card-item,
  & .v-card-text {
    padding: 0;
  }

  & .v-card-title {
    font-weight: 700;
    white-space: break-spaces;
    line-height: 1;
    margin-bottom: 8px;
  }

  & .v-card-subtitle {
    font-weight: 600;
    white-space: break-spaces;
    color: rgb(var(--v-theme-secondary));
  }

  & .v-card-text {
    margin-top: 14px;
    line-height: 1.5rem !important;
  }
}
</style>
