<template>
  <app-page with-top-margin>
    <app-section
      :title="$t('pages.projects.title')"
      :description="$t('pages.projects.subtitle')"
      class="pb-20"
    >
      <UContainer class="space-y-12">
        <section
          v-for="section in projectSections"
          :key="section.id"
          class="projects-section rounded-[2.5rem] border border-slate-200/80 bg-white/92 p-8 backdrop-blur-sm"
        >
          <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div class="max-w-2xl">
              <p class="text-xs font-semibold uppercase tracking-[0.4em] text-primary/70">
                {{ section.label }}
              </p>
              <h3 class="mt-2 text-3xl font-bold text-secondary">
                {{ section.title }}
              </h3>
              <p class="mt-3 text-base text-secondary/80">
                {{ section.description }}
              </p>
            </div>

            <div
              v-if="section.stats?.length"
              class="grid gap-3 sm:grid-cols-2"
            >
              <div
                v-for="stat in section.stats"
                :key="stat.label"
                class="rounded-2xl border border-primary/10 bg-white/70 px-5 py-4 text-secondary shadow-sm"
              >
                <p class="text-xs font-semibold uppercase tracking-wide text-primary/70">
                  {{ stat.label }}
                </p>
                <p class="text-2xl font-bold text-secondary">
                  {{ stat.value }}
                </p>
              </div>
            </div>
          </div>

          <!-- Mobile: Card Layout -->
          <div class="mt-8 space-y-4 lg:hidden">
            <article
              v-for="project in section.projects"
              :key="`mobile-${project.name}`"
              class="project-card rounded-2xl border border-slate-200/80 bg-white p-5"
            >
              <div class="flex items-start gap-4">
                <div
                  v-if="project.imageUrl"
                  :class="[
                    'projects-logo flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/10',
                    project.logoVariant === 'dark' ? 'bg-black' : 'bg-primary/5',
                  ]"
                >
                  <app-image
                    :src="project.imageUrl"
                    :alt="project.name"
                    :height="40"
                    :width="40"
                    :zoomable="false"
                    class="max-h-10 max-w-full"
                  />
                </div>

                <div class="min-w-0 flex-1">
                  <p v-if="project.badge" class="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/70">
                    {{ project.badge }}
                  </p>
                  <h4 class="text-lg font-bold text-secondary">{{ project.name }}</h4>
                  <p v-if="project.meta" class="text-xs text-secondary/60">
                    {{ project.meta }}
                  </p>
                </div>
              </div>

              <p class="mt-4 text-sm text-secondary/75">
                {{ project.description }}
              </p>

              <div v-if="project.highlights?.length" class="mt-4 flex flex-wrap gap-2">
                <div
                  v-for="highlight in project.highlights"
                  :key="`${project.name}-mobile-${highlight.label}`"
                  class="rounded-xl border border-primary/10 bg-primary/5 px-3 py-2"
                >
                  <p class="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                    {{ highlight.label }}
                  </p>
                  <p class="text-sm font-semibold text-secondary">
                    {{ highlight.value }}
                  </p>
                </div>
              </div>

              <div v-if="project.tags?.length" class="mt-4 flex flex-wrap gap-1.5">
                <span
                  v-for="tag in project.tags"
                  :key="`${project.name}-mobile-${tag}`"
                  class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary/70"
                >
                  {{ tag }}
                </span>
              </div>

              <div class="mt-4">
                <UButton
                  :href="project.linkUrl"
                  target="_blank"
                  rel="noopener"
                  color="primary"
                  variant="soft"
                  size="sm"
                  icon="i-heroicons-arrow-up-right-20-solid"
                  trailing
                  block
                >
                  {{ project.ctaLabel || tableHeaders.view }}
                </UButton>
              </div>
            </article>
          </div>

          <!-- Desktop: Table Layout -->
          <div class="mt-8 hidden overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white lg:block">
            <div class="overflow-x-auto">
              <table class="projects-table w-full text-left">
                <thead>
                  <tr>
                    <th scope="col" class="px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary/60">
                      {{ tableHeaders.project }}
                    </th>
                    <th scope="col" class="px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary/60">
                      {{ tableHeaders.description }}
                    </th>
                    <th scope="col" class="px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary/60">
                      {{ tableHeaders.highlights }}
                    </th>
                    <th scope="col" class="px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary/60">
                      {{ tableHeaders.tags }}
                    </th>
                    <th scope="col" class="px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary/60 text-right">
                      {{ tableHeaders.action }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="project in section.projects"
                    :key="project.name"
                    class="project-row border-t border-slate-100 transition-all duration-300"
                  >
                    <td class="px-6 py-5 align-top">
                      <div class="flex items-start gap-4">
                        <div
                          v-if="project.imageUrl"
                          :class="[
                            'projects-logo flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/10',
                            project.logoVariant === 'dark' ? 'bg-black' : 'bg-primary/5',
                          ]"
                        >
                          <app-image
                            :src="project.imageUrl"
                            :alt="project.name"
                            :height="48"
                            :width="48"
                            :zoomable="false"
                            class="max-h-12 max-w-full"
                          />
                        </div>
                        <div>
                          <p v-if="project.badge" class="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
                            {{ project.badge }}
                          </p>
                          <p class="text-lg font-semibold text-secondary">{{ project.name }}</p>
                          <p v-if="project.meta" class="text-sm text-secondary/70">
                            {{ project.meta }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-5 align-top text-secondary/80">
                      {{ project.description }}
                    </td>
                    <td class="px-6 py-5 align-top">
                      <div class="flex flex-col gap-2">
                        <div
                          v-for="highlight in project.highlights || []"
                          :key="`${project.name}-${highlight.label}`"
                          class="rounded-2xl border border-primary/10 bg-primary/5 px-3 py-2 text-sm"
                        >
                          <p class="text-[11px] font-semibold uppercase tracking-widest text-primary/70">
                            {{ highlight.label }}
                          </p>
                          <p class="text-base font-semibold text-secondary">
                            {{ highlight.value }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-5 align-top">
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="tag in project.tags || []"
                          :key="`${project.name}-${tag}`"
                          class="rounded-full border border-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary/70"
                        >
                          {{ tag }}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-5 align-top text-right">
                      <UButton
                        :href="project.linkUrl"
                        target="_blank"
                        rel="noopener"
                        color="primary"
                        variant="ghost"
                        icon="i-heroicons-arrow-up-right-20-solid"
                      >
                        {{ project.ctaLabel || tableHeaders.view }}
                      </UButton>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </UContainer>
    </app-section>
  </app-page>
</template>

<script setup lang="ts">
useHead({
  title: 'pages.projects.title',
})

const { t } = useI18n({
  useScope: 'local',
})

const tableHeaders = computed(() => ({
  project: t('table.headers.project'),
  description: t('table.headers.description'),
  highlights: t('table.headers.highlights'),
  tags: t('table.headers.tags'),
  action: t('table.headers.action'),
  view: t('table.cta'),
}))

const projectSections = computed(() => {
  const highlightLabels = {
    role: t('highlights.role'),
    stack: t('highlights.stack'),
    focus: t('highlights.focus'),
  }

  return [
    {
      id: 'personal',
      label: t('sections.personal.label'),
      title: t('sections.personal.title'),
      description: t('sections.personal.description'),
      stats: [
        {
          label: t('sections.personal.stats.active'),
          value: t('sections.personal.stats.activeValue'),
        },
        {
          label: t('sections.personal.stats.launches'),
          value: t('sections.personal.stats.launchesValue'),
        },
      ],
      projects: [
        {
          name: 'Snown',
          badge: t('badges.product'),
          meta: t('personalProjects.snown.meta'),
          description: t('personalProjects.snown.description'),
          linkUrl: 'https://snown.com.br/',
          imageUrl: '/images/projects/snown.svg',
          logoVariant: 'dark',
          theme: 'dark' as const,
          highlights: [
            { label: highlightLabels.role, value: t('personalProjects.snown.role') },
            { label: highlightLabels.focus, value: t('personalProjects.snown.focus') },
          ],
          tags: ['Nuxt', 'TypeScript', 'Django', 'NestJS', 'PostgreSQL'],
        },
        {
          name: 'Experiment UI',
          badge: t('badges.designSystem'),
          meta: t('personalProjects.experiment-ui.meta'),
          description: t('personalProjects.experiment-ui.description'),
          linkUrl: 'https://linspw.github.io/experiment-ui/',
          imageUrl: '/images/projects/experiment-ui-light.svg',
          theme: 'light' as const,
          highlights: [
            { label: highlightLabels.role, value: t('personalProjects.experiment-ui.role') },
            { label: highlightLabels.stack, value: 'Vue 3 · Vite · Storybook' },
          ],
          tags: ['Design System', 'Documentation', 'Playground'],
        },
      ],
    },
    {
      id: 'open-source',
      label: t('sections.openSource.label'),
      title: t('sections.openSource.title'),
      description: t('sections.openSource.description'),
      stats: [
        {
          label: t('sections.openSource.stats.repositories'),
          value: t('sections.openSource.stats.repositoriesValue'),
        },
        {
          label: t('sections.openSource.stats.community'),
          value: t('sections.openSource.stats.communityValue'),
        },
      ],
      projects: [
        {
          name: 'VueUse',
          badge: t('badges.openSource'),
          meta: t('openSourceProjects.vueuse.meta'),
          description: t('openSourceProjects.vueuse.description'),
          linkUrl: 'https://github.com/vueuse/vueuse/commits/main/?author=linspw',
          imageUrl: '/images/projects/vueuse.svg',
          theme: 'light' as const,
          tags: ['Vue', 'DX', 'Toolkit'],
          ctaLabel: t('cta.viewContributions'),
        },
        {
          name: 'Hocuspocus',
          badge: t('badges.openSource'),
          meta: t('openSourceProjects.hocuspocus.meta'),
          description: t('openSourceProjects.hocuspocus.description'),
          linkUrl: 'https://github.com/ueberdosis/hocuspocus/commits/main/?author=linspw',
          imageUrl: '/images/projects/hocuspocus.svg',
          theme: 'light' as const,
          tags: ['WebSocket', 'Yjs', 'DX'],
          ctaLabel: t('cta.viewContributions'),
        },
        {
          name: 'Vuetify Nuxt Module',
          badge: t('badges.openSource'),
          meta: t('openSourceProjects.vuetifyNuxt.meta'),
          description: t('openSourceProjects.vuetifyNuxt.description'),
          linkUrl: 'https://github.com/userquin/vuetify-nuxt-module/commits/main/?author=linspw',
          imageUrl: '/images/projects/vuetify-nuxt-module.svg',
          theme: 'light' as const,
          tags: ['Nuxt', 'Vuetify', 'DX'],
          ctaLabel: t('cta.viewContributions'),
        },
        {
          name: 'Vue Resizables',
          badge: t('badges.openSource'),
          meta: t('openSourceProjects.vueresizable.meta'),
          description: t('openSourceProjects.vueresizable.description'),
          linkUrl: 'https://github.com/alexzhang1030/vue-resizables/commits/main/?author=linspw',
          imageUrl: '/images/projects/vue-resizable.svg',
          theme: 'light' as const,
          tags: ['Components', 'Vue', 'UX'],
          ctaLabel: t('cta.viewContributions'),
        },
        {
          name: 'Drauu',
          badge: t('badges.openSource'),
          meta: t('openSourceProjects.drauu.meta'),
          description: t('openSourceProjects.drauu.description'),
          linkUrl: 'https://github.com/antfu/drauu/commits/main/?author=linspw',
          imageUrl: '/images/projects/drauu.svg',
          theme: 'light' as const,
          tags: ['Canvas', 'Vue', 'Tooling'],
          ctaLabel: t('cta.viewContributions'),
        },
      ],
    },
  ]
})
</script>

<style scoped>
.projects-section {
  box-shadow: 
    0 8px 32px -8px rgba(0, 0, 0, 0.08),
    0 4px 12px -2px rgba(0, 0, 0, 0.04);
}

.projects-table th:first-child {
  min-width: 220px;
}

.projects-logo {
  min-width: 3.5rem;
  min-height: 3.5rem;
}

.projects-table td,
.projects-table th {
  border-color: rgba(15, 23, 42, 0.04);
}

.project-row:hover {
  background-color: rgba(1, 83, 255, 0.03);
}

.project-row:hover td:first-child {
  position: relative;
}

.project-row:hover td:first-child::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--color-primary);
  border-radius: 0 2px 2px 0;
}

/* Mobile card styles */
.project-card {
  box-shadow: 
    0 2px 8px -2px rgba(0, 0, 0, 0.05),
    0 1px 3px -1px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 20px -6px rgba(0, 0, 0, 0.1),
    0 4px 8px -2px rgba(0, 0, 0, 0.04);
  border-color: rgba(1, 83, 255, 0.15);
}
</style>

<i18n lang="json">
{
  "en": {
    "table": {
      "headers": {
        "project": "Project",
        "description": "Description",
        "highlights": "Highlights",
        "tags": "Tags",
        "action": "Action"
      },
      "cta": "Open project"
    },
    "sections": {
      "personal": {
        "label": "Author projects",
        "title": "Personal builds that power my day-to-day",
        "description": "Concepts that started as experiments and evolved into products used for collaboration, experimentation, and testing new stacks.",
        "stats": {
          "active": "Active initiatives",
          "activeValue": "2",
          "launches": "Product launches",
          "launchesValue": "4+"
        }
      },
      "openSource": {
        "label": "Community",
        "title": "Open-source contributions & maintainer work",
        "description": "I dedicate time to help libraries ship better DX, docs, and accessibility. Here are a few highlights.",
        "stats": {
          "repositories": "Repositories",
          "repositoriesValue": "5",
          "community": "Years contributing",
          "communityValue": "8"
        }
      }
    },
    "badges": {
      "product": "Product",
      "designSystem": "Design System",
      "openSource": "Open Source"
    },
    "cta": {
      "viewContributions": "See contributions"
    },
    "highlights": {
      "role": "Role",
      "stack": "Stack",
      "focus": "Focus"
    },
    "personalProjects": {
      "snown": {
        "description": "Collaborative platform I created for companies and individuals. It features project management and documentation tools.",
        "meta": "Founder • 2018 — today",
        "role": "Product & Engineering",
        "focus": "Knowledge + collaboration hub"
      },
      "experiment-ui": {
        "description": "Library with visual components in Vue 3 for rapid testing.",
        "meta": "Experimental Design System • since 2021",
        "role": "Design System Engineer",
        "focus": "Sandbox for Vue UI ideas"
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
    }
  },
  "pt-BR": {
    "table": {
      "headers": {
        "project": "Projeto",
        "description": "Descrição",
        "highlights": "Destaques",
        "tags": "Tags",
        "action": "Ação"
      },
      "cta": "Abrir projeto"
    },
    "sections": {
      "personal": {
        "label": "Projetos autorais",
        "title": "Construções pessoais que me acompanham",
        "description": "Iniciativas que nasceram como experimentos e viraram produtos para colaboração, validação de ideias e testes de novas stacks.",
        "stats": {
          "active": "Iniciativas ativas",
          "activeValue": "2",
          "launches": "Lançamentos",
          "launchesValue": "4+"
        }
      },
      "openSource": {
        "label": "Comunidade",
        "title": "Contribuições em open source",
        "description": "Dedico tempo para melhorar bibliotecas com foco em DX, documentação e acessibilidade. Estes são alguns destaques.",
        "stats": {
          "repositories": "Repositórios",
          "repositoriesValue": "5",
          "community": "Anos contribuindo",
          "communityValue": "8"
        }
      }
    },
    "badges": {
      "product": "Produto",
      "designSystem": "Design System",
      "openSource": "Open Source"
    },
    "cta": {
      "viewContributions": "Ver contribuições"
    },
    "highlights": {
      "role": "Atuação",
      "stack": "Stack",
      "focus": "Foco"
    },
    "personalProjects": {
      "snown": {
        "description": "Plataforma colaborativa que criei para empresas e pessoas. Possui ferramentas de gerenciamento de projetos e documentações.",
        "meta": "Founder • 2018 — atual",
        "role": "Produto & Engenharia",
        "focus": "Hub de conhecimento"
      },
      "experiment-ui": {
        "description": "Biblioteca com componentes visuais em Vue 3 para testes.",
        "meta": "Design System experimental • desde 2021",
        "role": "Design System Engineer",
        "focus": "Playground para ideias de UI"
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
    }
  },
  "es": {
    "table": {
      "headers": {
        "project": "Proyecto",
        "description": "Descripción",
        "highlights": "Destacados",
        "tags": "Tags",
        "action": "Acción"
      },
      "cta": "Abrir proyecto"
    },
    "sections": {
      "personal": {
        "label": "Proyectos propios",
        "title": "Construcciones personales que uso a diario",
        "description": "Iniciativas que comenzaron como experimentos y hoy apoyan colaboración, validación e investigación de nuevas stacks.",
        "stats": {
          "active": "Iniciativas activas",
          "activeValue": "2",
          "launches": "Lanzamientos",
          "launchesValue": "4+"
        }
      },
      "openSource": {
        "label": "Comunidad",
        "title": "Aportes a proyectos open source",
        "description": "Dedico tiempo a mejorar bibliotecas con foco en DX, documentación y accesibilidad. Estos son algunos destacados.",
        "stats": {
          "repositories": "Repositorios",
          "repositoriesValue": "5",
          "community": "Años contribuyendo",
          "communityValue": "8"
        }
      }
    },
    "badges": {
      "product": "Producto",
      "designSystem": "Design System",
      "openSource": "Open Source"
    },
    "cta": {
      "viewContributions": "Ver contribuciones"
    },
    "highlights": {
      "role": "Rol",
      "stack": "Stack",
      "focus": "Enfoque"
    },
    "personalProjects": {
      "snown": {
        "description": "Plataforma colaborativa que creé para empresas y personas. Cuenta con herramientas de gestión de proyectos y documentación.",
        "meta": "Founder • 2018 — hoy",
        "role": "Producto e Ingeniería",
        "focus": "Hub de conocimiento"
      },
      "experiment-ui": {
        "description": "Biblioteca con componentes visuales en Vue 3 para pruebas.",
        "meta": "Design System experimental • desde 2021",
        "role": "Design System Engineer",
        "focus": "Laboratorio de ideas UI"
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
    }
  }
}
</i18n>
