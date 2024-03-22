<template>
  <div class="background-wave" />
</template>

<script setup lang="ts">
const img = useImage()

const _src = computed(() => {
  const config = { quality: 100 }

  return `url(${img('/images/backgrounds/background-light.jpg', config)})`
})
</script>

<style lang="scss">
.background-wave {
  --image-url: v-bind('_src');
  position: absolute;
  overflow: hidden;
  height: 100dvh;
  width: 100dvw;
  top: 0;
  left: 0;
}

.background-wave::before {
  content: '';
  background-image: var(--image-url);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-clip: border-box;
  animation: zoomin 20s ease infinite alternate;
  animation-delay: 120ms;
  animation-fill-mode: forwards;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

@keyframes zoomin {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.4);
  }
}
</style>
