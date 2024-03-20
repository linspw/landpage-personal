<template>
  <div class="d-flex flex-column" style="margin-top: 80px; min-height: 100dvh">
    <app-section
      :title="$t('pages.portfolio.title')"
      :description="$t('pages.portfolio.subtitle')"
      class="fill-height"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card
              color="black"
              rounded="xl"
              class="home-page-solutions-section__card pa-10 h-100"
              href="https://snown.com.br/"
              target="_blank"
            >
              <v-card-item class="h-100">
                <app-image
                  src="/partners/snown.svg"
                  :height="90"
                  :width="300"
                  class="mb-4"
                />

                <h4 class="font-weight-semi-bold text-white">
                  {{ t('description') }}
                </h4>

                <template #append>
                  <div class="d-flex align-center">
                    <v-icon icon="fas fa-chevron-right" />
                  </div>
                </template>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </app-section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'pages.portfolio.title',
})

const { t } = useI18n({
  useScope: 'local',
})
</script>

<style lang="scss">
.home-page-solutions-section__card {
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
