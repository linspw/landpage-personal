export const usePortalPagesInfo = () => {
  const NuxtApp = useNuxtApp()

  // exemplo: NuxtApp.$i18n.t('words.main')
  const info = computed(() => {
    return [
      { url: '/', title: NuxtApp.$i18n.t('pages.aboutMe.title') },
      { url: '/portifolio', title: NuxtApp.$i18n.t('pages.portfolio.title') },
      { url: '/livros', title: NuxtApp.$i18n.t('pages.books.title') },
      { url: '/contato', title: NuxtApp.$i18n.t('pages.contact.title') },
    ]
  })

  return info
}
