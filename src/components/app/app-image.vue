<script setup lang="ts">
defineProps({
  height: { type: Number, default: 500 },
  src: {
    type: String,
    required: true,
  },
})

const img = useImage()
// const _srcset = computed(() => {
//   return img.getSizes(props.src, {
//     sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
//     modifiers: {
//       format: 'webp',
//       quality: 70,
//       height: props.height,
//     },
//   })
// })
</script>
<template>
  <v-img
    :src="img(src, { height, quality: 70 })"
    :height="height"
    transition="fade-transition"
  >
    <slot />
  </v-img>
</template>
