<template>
  <div class="background-wave" />
</template>

<script setup lang="ts"></script>

<style lang="scss">
.background-wave {
  position: absolute;
  overflow: hidden;
  height: calc(100% + var(--v-layout-top));
  width: 100%;
  top: calc(var(--v-layout-top) * -1);
  left: 0;
}

.background-wave::before {
  content: '';
  background-image: url('/images/backgrounds/background-light.jpg');
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
