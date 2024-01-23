import { loadNuxt, buildNuxt } from '@nuxt/kit'

export async function getNuxtViteConfig() {
  const nuxt = await loadNuxt({
    cwd: process.cwd(),
    dev: false,
    overrides: {
      ssr: false,
    },
  })
  return new Promise((resolve, reject) => {
    nuxt.hook('vite:extendConfig', (config) => {
      resolve(config)
      throw new Error('_stop_')
    })
    buildNuxt(nuxt).catch((err) => {
      if (!err.toString().includes('_stop_')) {
        reject(err)
      }
    })
  }).finally(() => nuxt.close())
}
