<template>
  <app-section
    id="section-produtos"
    title="Produtos"
    description="Explore nossa variedade de produtos!"
  >
    <v-container>
      <v-row>
        <v-col
          v-for="product in listOfProducts"
          :key="product.name"
          cols="12"
          sm="4"
          class="home-page-products-section__column d-flex my-10"
        >
          <v-sheet
            class="home-page-products-section__card d-flex flex-column justify-space-between"
            color="secondary"
            rounded="xl"
            elevation="2"
          >
            <div
              class="home-page-products-section__card-container-image mt-n14"
            >
              <app-image
                :src="product.image"
                width="100%"
                :height="180"
                class="home-page-products-section__card-image"
                :alt="`${product.name} product image`"
                inline
              />
            </div>

            <p
              class="font-family-red-hat-display text-center font-weight-black pa-2"
            >
              {{ product.name }}
            </p>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </app-section>
</template>

<script setup lang="ts">
const listOfProducts = [
  {
    name: 'Product1',
    image: '/products/product-1.png',
  },
  { name: 'Product2', image: '/products/product-2.png' },
  { name: 'Product3', image: '/products/product-3.png' },
]
</script>

<style lang="scss">
.home-page-products-section__column {
  height: 200px;
}

.home-page-products-section__card {
  width: 100%;
  height: 100%;
  position: relative;
}

.home-page-products-section__card-container-image {
  position: relative;
}

.home-page-products-section__card-container-image:after {
  content: '';
  position: absolute;
  bottom: 7%;
  left: 30%;
  width: 40%;
  height: 4%;
  border-radius: 50%;
  box-shadow: 0px 10px 5px rgb(var(--v-theme-background));
}
</style>
