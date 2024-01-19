<template>
  <v-footer color="grey-darken-4">
    <v-container>
      <v-row>
        <v-col cols="12" sm="4" md="3">
          <v-list class="bg-grey-darken-4" nav role="navigation">
            <v-list-item
              class="font-weight-bold"
              to="/"
              :active="false"
              rounded="lg"
            >
              Home
            </v-list-item>

            <v-list-item to="/#section-solutions" rounded="lg" :active="false">
              Soluções
            </v-list-item>

            <v-list-item to="/#section-partners" rounded="lg" :active="false">
              Parceiros
            </v-list-item>

            <v-list-item to="/#section-contact" rounded="lg" :active="false">
              Contato
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" sm="4" md="3">
          <v-list class="bg-grey-darken-4" nav role="navigation">
            <v-list-item
              class="font-weight-bold"
              to="/sobre-nos"
              :active="false"
              rounded="lg"
            >
              Sobre nós
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" sm="4" md="3">
          <v-list class="bg-grey-darken-4" nav role="navigation">
            <v-list-item
              class="font-weight-bold"
              to="/contato"
              :active="false"
              rounded="lg"
            >
              Contato
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-divider class="my-4" />

      <p class="app-footer__author text-center font-italic">
        © 2023 MainProject. Todos os direitos reservados.
      </p>

      <p class="app-footer__author text-center font-italic">
        Website criado por MainProject
      </p>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.app-footer__author {
  font-size: 12px;
}
</style>
