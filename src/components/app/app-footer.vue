<template>
  <footer class="app-footer bg-secondary-darken-2">
    <v-container>
      <v-row>
        <v-col
          v-for="pageInfo in pageInfos"
          :key="pageInfo.title"
          cols="12"
          sm="4"
          md="3"
        >
          <v-list class="bg-secondary-darken-2" nav role="navigation">
            <v-list-item
              class="font-bold"
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

      <p class="app-footer__author text-center italic">
        © 2023 Jessé Correia Lins. Todos os direitos reservados.
      </p>

      <p class="app-footer__author text-center italic">
        Website criado por Jessé Correia Lins
      </p>
    </v-container>
  </footer>
</template>

<script setup lang="ts">
const pageInfos = usePortalPagesInfo()
</script>

<style lang="scss">
.app-footer {
  position: relative;
  flex: 1 0 !important;
}
.app-footer__author {
  font-size: 12px;
}
</style>
