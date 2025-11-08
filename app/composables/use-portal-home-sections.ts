export const usePortalHomeSections = () => {
  const NuxtApp = useNuxtApp()

  const items = computed(() => [
    {
      id: 'section-skills',
      url: '/about-me#section-skills',
      title: NuxtApp.$i18n.t('homeSections.skills.title'),
      description: NuxtApp.$i18n.t('homeSections.skills.description'),
      component: 'HomePageSkillsSection',
    },
    {
      id: 'section-experiences',
      url: '/about-me#section-experiences',
      title: NuxtApp.$i18n.t('homeSections.experiences.title'),
      description: NuxtApp.$i18n.t('homeSections.experiences.description'),
      component: 'HomePageExperiencesSection',
    },
  ])

  return items
}
