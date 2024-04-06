<template>
  <app-section class="pb-16">
    <LazyHomePageSkillsSectionRender />
  </app-section>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.home-page-skills-section {
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
