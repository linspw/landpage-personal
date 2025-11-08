export const usePortalPagesInfo = () => {
  const NuxtApp = useNuxtApp()

  const info = computed(() => {
    return [
      { url: '/', title: NuxtApp.$i18n.t('pages.home.title') },
      { url: '/blog', title: NuxtApp.$i18n.t('pages.blog.title') },
      { url: '/projects', title: NuxtApp.$i18n.t('pages.projects.title') },
      { url: '/books', title: NuxtApp.$i18n.t('pages.books.title') },
      { url: '/about-me', title: NuxtApp.$i18n.t('pages.aboutMe.title') },
    ]
  })

  return info
}
