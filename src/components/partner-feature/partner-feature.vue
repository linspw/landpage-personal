<template>
  <v-fade-transition>
    <swiper-container
      v-if="isVisibleOnce"
      :modules="[Autoplay, Navigation, Pagination, FreeMode]"
      grab-cursor
      :slides-per-view="numberOfItemsPerColumn"
      :speed="10000"
      :space-between="20"
      :pagination="{ clickable: false }"
      :autoplay="{
        delay: 1,
        disableOnInteraction: true,
      }"
      :navigation="{ enabled: true }"
      :free-mode="{ enabled: true }"
      @touchstart.stop
      @touchmove.stop
      @touchend.stop
    >
      <swiper-slide
        v-for="partner in listOfPartners"
        :key="partner.name"
        class="pa-2"
      >
        <v-card
          class="partner-feature__card d-flex flex-column align-center pa-4"
          color="white"
          rounded="xl"
          elevation="2"
          :href="partner.href"
          target="_blank"
        >
          <app-image
            :src="partner.image"
            :alt="`${partner.name} logo`"
            :width="160"
            :height="140"
            class="home-page-products-section__card-image"
          />

          <span class="font-weight-semi-bold text-center">
            {{ partner.name }}
          </span>
        </v-card>
      </swiper-slide>
    </swiper-container>
  </v-fade-transition>
</template>

<script setup lang="ts">
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules'
import { useDisplay } from 'vuetify'
import { register } from 'swiper/element/bundle'

const { isVisibleOnce } = useVisibilityOnce()

register()

const $display = useDisplay()

const listOfPartners = [
  {
    name: 'SNOWN',
    image: '/partners/snown-light.svg',
    href: 'https://snown.com.br',
  },
  {
    name: 'Invent LAB',
    image: '/partners/invent-lab.png',
    href: 'https://inventlab.tech',
  },
]

const numberOfItemsPerColumn = computed(() => {
  if ($display.lgAndUp.value) return 6
  if ($display.mdAndUp.value) return 4
  if ($display.smAndUp.value) return 3

  return 2
})
</script>

<style lang="scss">
.partner-feature__card {
  height: 100%;
  min-height: 200px;
  width: 100%;
  max-width: min-content;
}

swiper-container {
  --swiper-pagination-bottom: 0;
  --swiper-navigation-sides-offset: 0;
  --swiper-navigation-size: 30px;
  --swiper-theme-color: rgb(var(--v-theme-primary)) !important;
}

swiper-container .swiper-button-next,
swiper-container .swiper-button-prev {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 24px 16px;
  border-radius: 8px;
}

.swiper-wrapper {
  transition-timing-function: linear !important;
}
</style>
