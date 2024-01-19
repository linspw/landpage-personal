<template>
  <v-footer color="grey-darken-4">
    <v-container>
      <v-row>
        <v-col
          v-for="pageInfo in pageInfos"
          :key="pageInfo.title"
          cols="12"
          sm="4"
          md="3"
        >
          <v-list class="bg-grey-darken-4" nav role="navigation">
            <v-list-item
              class="font-weight-bold"
              :to="pageInfo.url"
              :active="false"
              rounded="lg"
            >
              {{ pageInfo.title }}
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-divider class="my-4" />

      <p class="app-footer__author text-center font-italic">
        © 2023 Jessé Correia Lins. Todos os direitos reservados.
      </p>

      <p class="app-footer__author text-center font-italic">
        Website criado por Jessé Correia Lins
      </p>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const pageInfos = usePortalPagesInfo()
</script>

<style lang="scss">
.app-footer__author {
  font-size: 12px;
}
</style>
