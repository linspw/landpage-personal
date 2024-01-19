<template>
  <app-section
    id="section-skills"
    title="Competências"
    description="Principais habilidades"
    class="pb-16"
  >
    <v-container>
      <v-row ref="currentElement">
        <v-col v-for="skill in skills" :key="skill.title" cols="12" md="6">
          <div class="font-weight-bold mb-4" :class="`text-${skill.color}`">
            {{ skill.title }}
          </div>

          <div class="d-flex flex-column gap-2">
            <div
              v-for="subskill in skill.items"
              :key="subskill.title"
              class="d-flex flex-column skill-item"
            >
              <div class="font-weight-medium mb-1">{{ subskill.title }}</div>

              <div class="d-flex gap-1 flex-wrap">
                <v-chip
                  v-for="item in subskill.items"
                  :key="item"
                  variant="outlined"
                >
                  {{ item }}
                </v-chip>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </app-section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { useElementVisibility } from '@vueuse/core'

const currentElement = ref()
const animatedElement = useRootElement(currentElement)
const targetIsVisible = useElementVisibility(animatedElement as any)

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
        items: ['Node Js', 'SCSS (SASS)', 'Webpack', 'Vite'],
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
        items: ['PYTHON', 'ELIXIR', 'RUBY', 'JAVA', 'TYPESCRIPT'],
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

let animation: gsap.core.Tween

watchEffect(() => {
  if (targetIsVisible.value) {
    const skillsItems = animatedElement.value.querySelectorAll('.skill-item')

    if (animation) animation.restart()
    else {
      animation = gsap.from(skillsItems, {
        autoAlpha: 0,
        y: 20,
        stagger: 0.2, // Atraso entre cada item
        duration: 0.8,
        ease: 'power3.out',
        opacity: 0,
      })
    }
  }
})
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
