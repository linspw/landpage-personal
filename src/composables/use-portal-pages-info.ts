export const usePortalPagesInfo = () => {
  const NuxtApp = useNuxtApp()

  const info = computed(() => {
    return [
      { url: '/', title: NuxtApp.$i18n.t('pages.aboutMe.title') },
      { url: '/portfolio', title: NuxtApp.$i18n.t('pages.portfolio.title') },
      { url: '/books', title: NuxtApp.$i18n.t('pages.books.title') },
      { url: '/contact', title: NuxtApp.$i18n.t('pages.contact.title') },
    ]
  })

  return info
}
