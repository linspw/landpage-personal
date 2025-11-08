<template>
  <app-page>
    <AboutMeHero id="hero" style="min-height: 100dvh" />

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
      :sections="sectionsWithHero"
    />
  </app-page>
</template>

<script setup lang="ts">

const sections = usePortalHomeSections()

const sectionsWithHero = computed(() => [
  {
    id: 'hero',
    url: '/about-me',
  },
  ...sections.value,
])

const componentsDict = computed(() => ({
  HomePageSkillsSection: resolveComponent('HomePageSkillsSection'),
  HomePageExperiencesSection: resolveComponent('HomePageExperiencesSection'),
}))
</script>
