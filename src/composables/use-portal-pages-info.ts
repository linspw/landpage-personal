export const usePortalPagesInfo = () => {
  const info = computed(() => {
    return [
      { url: '/', title: 'Sobre mim' },
      { url: '/portifolio', title: 'Portifólio' },
      { url: '/livros', title: 'Livros' },
      { url: '/contato', title: 'Contato' },
    ]
  })

  return info
}
