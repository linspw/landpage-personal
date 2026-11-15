<template>
  <AppSection :title="$t('homeSections.skills.title')" class="about-skills-section">
    <HomePageSkillsSectionRender />
  </AppSection>
</template>

<style scoped>
.about-skills-section {
  scroll-margin-block-start: var(--site-header-height);
}
</style>
