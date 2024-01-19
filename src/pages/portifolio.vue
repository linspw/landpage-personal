<template>
  <div class="d-flex flex-column py-16 gap-16 fill-height">
    <app-section
      id="section-portifolio"
      title="Portifólio"
      description="Conheça mais sobre meus trabalhos Públicos Pessoais"
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
                  Plataforma Colaborativa que criei para empresas e pessoas.
                  Possui ferramentas de gerênciamento de projetos e
                  documentações
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
  title: 'Portifólio',
})

const books = [
  {
    title: 'Desenvolvimento Pessoal',
    items: [
      { title: 'Os 7 Hábitos das Pessoas Altamente Eficazes' },
      { title: 'Como fazer Amigos e Influenciar pessoas' },
    ],
  },
]
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
