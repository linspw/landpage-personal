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
          <v-col cols="12" md="6">
            <portifolio-feature-card
              color="black"
              link-url="https://snown.com.br/"
              image-url="/images/portifolio/snown.svg"
              :description="t('description')"
              :tags="['private', 'collaboration', 'workspace', 'business']"
            />
          </v-col>

          <v-col cols="12" md="6">
            <portifolio-feature-card
              color="white"
              link-url="https://linspw.github.io/experiment-ui/"
              image-url="/images/portifolio/experiment-ui-light.svg"
              :description="t('description')"
              :tags="['ui', 'public', 'open-source', 'experimental']"
            />
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <h3 class="mb-4">Open Source Contributions</h3>

        <v-row>
          <v-col cols="12" md="6">
            <portifolio-feature-card
              color="black"
              link-url="https://snown.com.br/"
              image-url="/images/portifolio/snown.svg"
              :description="t('description')"
              :tags="['private', 'collaboration', 'workspace', 'business']"
            />
          </v-col>

          <v-col cols="12" md="6">
            <portifolio-feature-card
              color="white"
              link-url="https://linspw.github.io/experiment-ui/"
              image-url="/images/portifolio/experiment-ui-light.svg"
              :description="t('description')"
              :tags="['ui', 'public', 'open-source', 'experimental']"
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
</script>

<style lang="scss"></style>

<i18n lang="json">
{
  "en": {
    "description": "Collaborative platform I created for companies and individuals. It features project management and documentation tools."
  },
  "pt-BR": {
    "description": "Plataforma Colaborativa que criei para empresas e pessoas. Possui ferramentas de gerenciamento de projetos e documentações."
  },
  "es": {
    "description": "Plataforma colaborativa que creé para empresas y personas. Cuenta con herramientas de gestión de proyectos y documentación."
  }
}
</i18n>
