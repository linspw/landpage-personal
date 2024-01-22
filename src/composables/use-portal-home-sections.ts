export const usePortalHomeSections = () => {
  const NuxtApp = useNuxtApp()

  const items = computed(() => [
    {
      id: 'section-skills',
      url: '/#section-skills',
      title: NuxtApp.$i18n.t('homeSections.skills.title'),
      description: NuxtApp.$i18n.t('homeSections.skills.description'),
      component: 'HomePageSkillsSection',
    },
    {
      id: 'section-experiences',
      url: '/#section-experiences',
      title: NuxtApp.$i18n.t('homeSections.experiences.title'),
      description: NuxtApp.$i18n.t('homeSections.experiences.description'),
      component: 'HomePageExperiencesSection',
    },
    {
      id: 'section-contact',
      url: '/#section-contact',
      title: NuxtApp.$i18n.t('homeSections.contact.title'),
      description: NuxtApp.$i18n.t('homeSections.contact.description'),
      component: 'HomePageContactSection',
    },
  ])

  return items
}
