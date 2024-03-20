<template>
  <div class="d-flex flex-column" style="margin-top: -80px">
    <HomePageHero id="hero" style="min-height: 100dvh" />

    <template v-for="section in sections" :key="section.id">
      <component
        :is="componentsDict[section.component as keyof typeof componentsDict]"
        :id="section.id"
        :title="section.title"
        :description="section.description"
        class="py-16"
        style="min-height: 100dvh"
      />
    </template>

    <app-navigation-buttons
      v-if="$display.mdAndUp.value"
      :sections="sectionsWithHero"
    />
  </div>
</template>

<script setup lang="ts">
const $display = useDisplay()

const sections = usePortalHomeSections()

const sectionsWithHero = computed(() => [
  {
    id: 'hero',
    url: '/',
  },
  ...sections.value,
])

const componentsDict = computed(() => ({
  HomePageSkillsSection: resolveComponent('HomePageSkillsSection'),
  HomePageExperiencesSection: resolveComponent('HomePageExperiencesSection'),
  HomePageContactSection: resolveComponent('HomePageContactSection'),
}))
</script>
