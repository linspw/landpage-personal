import type { RouterOptions } from '@nuxt/schema'

export default <RouterOptions>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return { el: to.hash, top: 80, behavior: 'smooth' }
    }

    return {
      top: 0,
      behavior: 'smooth',
    }
  },
}
