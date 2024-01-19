<template>
  <v-container>
    <app-section
      id="section-solutions"
      title="Soluções"
      description="Conheça nossas principais soluções"
      border
      class="pb-16"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-card
            color="white"
            rounded="xl"
            class="home-page-solutions-section__card pa-10 h-100"
            to="/contato"
          >
            <v-card-item>
              <app-image
                src="/products/web-development.svg"
                :height="90"
                :width="300"
                class="mb-4"
              />

              <h4 class="font-weight-semi-bold text-black mt-auto">
                Criação de Software Web customizado para o seu negócio
              </h4>

              <template #append>
                <div class="d-flex align-center">
                  <v-icon icon="fas fa-chevron-right" />
                </div>
              </template>
            </v-card-item>
          </v-card>
        </v-col>

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
                Nossa Plataforma de gerênciamento de projetos e documentações
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
    </app-section>
  </v-container>
</template>

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
