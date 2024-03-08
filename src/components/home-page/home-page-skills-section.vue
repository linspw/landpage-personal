<template>
  <app-section class="pb-16">
    <v-container>
      <v-row>
        <v-col v-for="skill in skills" :key="skill.title" cols="12" md="6">
          <div
            class="font-weight-bold mb-4"
            :class="`text-${skill.color}`"
            data-aos="fade-up"
          >
            {{ skill.title }}
          </div>

          <div class="d-flex flex-column gap-2">
            <div
              v-for="subskill in skill.items"
              :key="subskill.title"
              class="d-flex flex-column"
            >
              <div class="font-weight-medium mb-1" data-aos="fade-up">
                {{ subskill.title }}
              </div>

              <div class="d-flex gap-1 flex-wrap" data-aos="fade-up">
                <v-card v-for="item in subskill.items" :key="item" class="pa-4">
                  {{ item }}
                </v-card>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </app-section>
</template>

<script setup lang="ts">
const skills = [
  {
    title: 'FRONTEND',
    color: 'blue-accent-4',
    items: [
      {
        title: 'Languages',
        items: ['HTML', 'CSS', 'Javascript', 'Typescript'],
      },
      {
        title: 'Frameworks',
        items: ['Vue', 'React (JSX/TSX)', 'NUXT (SSR)', 'NEXT (SSR)'],
      },
      {
        title: 'Tools',
        items: [
          'Node Js',
          'SCSS (SASS)',
          'Webpack',
          'Vite',
          'I18N (Internationalization)',
        ],
      },
      {
        title: 'Design',
        items: ['Experiência com Design System', 'Criação de Telas', 'UX e UI'],
      },
      {
        title: 'Testing',
        items: ['Jest/Vitest', 'Testing Library', 'Cypress (e2e)', 'TDD'],
      },
      {
        title: 'Others',
        items: [
          'Websockets',
          'Collaborative Software (YJS)',
          'Web Components (conhecimento básico)',
          'SEO',
        ],
      },
    ],
  },
  {
    title: 'BACKEND',
    color: 'red',
    items: [
      {
        title: 'Languages',
        items: ['Python', 'Elixir', 'Ruby', 'Java', 'Typescript'],
      },
      {
        title: 'Frameworks',
        items: [
          'Phoenix (Elixir)',
          'Rails (Ruby)',
          'NestJs/Express (Node Js)',
          'Django (Python)',
        ],
      },
      {
        title: 'Databases',
        items: [
          'SQL',
          'PostgreSQL',
          'Conhecimento inicial em banco NOSQL (mongodb)',
          'PRISMA',
        ],
      },
      { title: 'Messaging', items: ['Conhecimento básico em Celery e Kafka'] },
    ],
  },
  {
    title: 'MOBILE',
    color: 'deep-orange',
    items: [
      {
        title: 'Development',
        items: ['React Native', 'IONIC Vue', 'Capacitor'],
      },
      { title: 'Knowledge', items: ['Conhecimentos em PWA (Básico)'] },
    ],
  },
  {
    title: 'PROCESSOS, ARQUITETURA E ENGENHARIA',
    color: 'black',
    items: [
      {
        title: 'Processes',
        items: ['VSM', 'Mapa de Processos', 'Fluxogramas (BPMN) da Engenharia'],
      },
      {
        title: 'DesignPatterns',
        items: [
          'Padrões de Design: MVC, Solids, Domain Driven Design, Atomic Design',
          'Engenharia de Software',
        ],
      },
    ],
  },
  {
    title: 'OUTROS CONHECIMENTOS',
    color: 'blue-grey-lighten-1',
    items: [
      { title: 'AWS', items: ['Conhecimento em ECS, EC2, S3, ALB (AWS)'] },
      {
        title: 'DevOps',
        items: ['Docker (uso e dockerização de aplicações)', 'Kubernetes'],
      },
      { title: 'VersionControl', items: ['Controle de Versão: Git, Semver'] },
      {
        title: 'DesignTools',
        items: ['Ferramentas de Design: Conhecimento Básico em Figma'],
      },
      {
        title: 'DevelopmentPractices',
        items: ['Práticas de Desenvolvimento: TDD, Clean Code'],
      },
      { title: 'CI/CD', items: ['CI/CD com GitHub Actions'] },
    ],
  },
]
</script>

<style lang="scss">
.home-page-skills-section {
  & .v-card-item,
  & .v-card-item__content {
    height: 100%;
  }

  & .v-card-item {
    padding: 0;
  }

  & .v-card-item__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
