<template>
  <app-page with-top-margin>
    <app-section
      :title="$t('pages.portfolio.title')"
      :description="$t('pages.portfolio.subtitle')"
      class="fill-height pb-16"
    >
      <v-container>
        <h3 class="mb-4">Personal Projects</h3>

        <v-row>
          <v-col
            v-for="(project, index) in personalProjects"
            :key="index"
            cols="12"
            md="6"
          >
            <portifolio-feature-card
              :color="project.color"
              :link-url="project.linkUrl"
              :image-url="project.imageUrl"
              :description="project.description"
              :tags="project.tags"
            />
          </v-col>
        </v-row>

        <v-divider class="my-16" />

        <h3 class="mb-4">Open Source Contributions</h3>

        <v-row>
          <v-col
            v-for="(project, index) in openSourceProjects"
            :key="index"
            cols="12"
            md="6"
          >
            <portifolio-feature-card
              :color="project.color"
              :link-url="project.linkUrl"
              :image-url="project.imageUrl"
              :description="project.description"
              :tags="project.tags"
            />
          </v-col>
        </v-row>
      </v-container>
    </app-section>
  </app-page>
</template>

<script setup lang="ts">
useHead({
  title: 'pages.portfolio.title',
})

const { t } = useI18n({
  useScope: 'local',
})

const personalProjects = computed(() => [
  {
    color: 'secondary-darken-2',
    linkUrl: 'https://snown.com.br/',
    imageUrl: '/images/portifolio/snown.svg',
    description: t('personalProjects.snown.description'),
    tags: ['collaboration', 'workspace', 'business', 'private'],
  },
  {
    color: 'white',
    linkUrl: 'https://linspw.github.io/experiment-ui/',
    imageUrl: '/images/portifolio/experiment-ui-light.svg',
    description: t('personalProjects.experiment-ui.description'),
    tags: ['ui', 'public', 'open-source', 'experimental'],
  },
])

const openSourceProjects = computed(() => {
  return [
    {
      color: 'white',
      linkUrl: 'https://github.com/vueuse/vueuse/commits/main/?author=linspw',
      imageUrl: '/images/portifolio/vueuse.svg',
      description: '',
      tags: [],
    },
    {
      color: 'white',
      linkUrl:
        'https://github.com/ueberdosis/hocuspocus/commits/main/?author=linspw',
      imageUrl: '/images/portifolio/hocuspocus.svg',
      description: '',
      tags: [],
    },
    {
      color: 'white',
      linkUrl:
        'https://github.com/userquin/vuetify-nuxt-module/commits/main/?author=linspw',
      imageUrl: '/images/portifolio/vuetify-nuxt-module.svg',
      description: '',
      tags: [],
    },
    {
      color: 'white',
      linkUrl:
        'https://github.com/alexzhang1030/vue-resizables/commits/main/?author=linspw',
      imageUrl: '/images/portifolio/vue-resizable.svg',
      description: '',
      tags: [],
    },
    {
      color: 'white',
      linkUrl: 'https://github.com/antfu/drauu/commits/main/?author=linspw',
      imageUrl: '/images/portifolio/drauu.svg',
      description: '',
      tags: [],
    },
  ]
})
</script>

<style lang="scss"></style>

<i18n lang="json">
{
  "en": {
    "personalProjects": {
      "snown": {
        "description": "Collaborative platform I created for companies and individuals. It features project management and documentation tools."
      },
      "experiment-ui": {
        "description": "Library with Visual components in Vue 3 for testing created in 2021."
      }
    }
  },
  "pt-BR": {
    "personalProjects": {
      "snown": {
        "description": "Plataforma Colaborativa que criei para empresas e pessoas. Possui ferramentas de gerenciamento de projetos e documentações."
      },
      "experiment-ui": {
        "description": "Biblioteca com componentes Visuais em Vue 3 para testes criada em 2021."
      }
    }
  },
  "es": {
    "personalProjects": {
      "snown": {
        "description": "Plataforma colaborativa que creé para empresas y personas. Cuenta con herramientas de gestión de proyectos y documentación."
      },
      "experiment-ui": {
        "description": "Biblioteca con componentes Visual en Vue 3 para pruebas creada en 2021."
      }
    }
  }
}
</i18n>
