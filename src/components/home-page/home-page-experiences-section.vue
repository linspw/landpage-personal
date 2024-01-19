<template>
  <app-section
    id="section-experiences"
    title="Experiências"
    description="Profissionais e de Ensino."
    color="black"
    class="home-page-experiences-section"
  >
    <v-container>
      <div class="d-flex justify-center mb-10">
        <ClientOnly>
          <v-tabs
            v-model="tab"
            bg-color="primary"
            class="rounded-lg"
            fixed-tabs
          >
            <v-tab value="profissional">Profissionais</v-tab>

            <v-tab value="education">Educação</v-tab>
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
          dot-color="black"
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
import { useDisplay } from 'vuetify'

const $display = useDisplay()
const tab = ref('profissional')

const profissionalItems = [
  {
    icon: 'fas fa-briefcase',
    date: 'Janeiro de 2022 - Março de 2023',
    title: 'Desenvolvedor Front-end',
    image: '/images/companies/buser.svg',
    subtitle: 'BUSER, São José dos Campos - SP\nHOME OFFICE',
    text: 'Atuação como Desenvolvedor Frontend/Fullstack, utilizando tecnologias como Vue.js, Nuxt, Django (Python) na criação de interfaces para soluções B2B. Participação em uma equipe ágil com foco em resultados mensuráveis.',
  },
  {
    icon: 'fas fa-briefcase',
    date: 'Março de 2021 - Dezembro de 2021',
    title: 'Desenvolvedor Front-end',
    image: '/images/companies/quero_educacao.svg',
    subtitle: 'QUERO EDUCAÇÃO, São José dos Campos\nHOME OFFICE',
    text: 'Desenvolvimento com Vue.js, React, Phoenix (Elixir), Rails (Ruby). Criação de interfaces para os segmentos B2B e B2C.',
  },
  {
    icon: 'fas fa-briefcase',
    date: 'Março de 2020 - Março de 2021',
    title: 'Estagiário em Desenvolvimento Front-end',
    image: '/images/companies/quero_educacao.svg',
    subtitle: 'QUERO EDUCAÇÃO, São José dos Campos\nHOME OFFICE',
    text: 'Desenvolvendo telas e interfaces para o B2B.',
  },
  {
    icon: 'fas fa-briefcase',
    date: 'Agosto de 2019 - Março de 2020',
    title: 'Estagiário em SiteOps',
    image: '/images/companies/quero_educacao.svg',
    subtitle: 'QUERO EDUCAÇÃO, São José dos Campos\nPRESENCIAL',
    text: 'Cuidando das principais operações da plataforma web Quero Bolsa.',
  },
]

const educationItems = [
  {
    icon: 'fas fa-graduation-cap',
    date: 'Janeiro de 2017 - Dezembro de 2022',
    title: 'Engenharia da Computação',
    image: '/images/education/univap.svg',
    subtitle: 'São José dos Campos — Graduação Bacharelado',
    text: 'Graduação Bacharelado em Engenharia da Computação.',
  },
  {
    icon: 'fas fa-graduation-cap',
    date: 'Janeiro de 2013 - Dezembro de 2015',
    title: 'Ensino Médio e Técnico em Informática',
    image: '/images/education/logo_etec_cor.png',
    subtitle: 'ETEC, São Paulo',
    text: 'Ensino médio e técnico em Informática.',
  },
  {
    icon: 'fas fa-language',
    date: 'Agosto de 2023 - Agora',
    title: 'Inglês',
    image: '/images/education/callan.svg',
    subtitle: 'Intermediário - Cursando',
    text: 'Proficiência em Leitura: Avançada. Habilidade de Conversação: Intermediária',
  },
]

const items = computed(() => {
  if (tab.value === 'profissional') return profissionalItems

  if (tab.value === 'education') return educationItems

  return []
})
</script>

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
