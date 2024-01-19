import { fileURLToPath } from 'url'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  css: [
    '@assets/styles/index.scss',
    '@fortawesome/fontawesome-free/css/all.css',
  ],
  alias: {
    '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
  },
  build: {
    transpile: ['vuetify'],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) =>
        ['swiper-container', 'swiper-slide'].includes(tag),
    },
  },
  hooks: {
    'vite:extendConfig': (config) => {
      config!.plugins!.push(
        vuetify({
          autoImport: true,
          // styles: {
          //   configFile: resolve('./src/assets/styles/vuetify-settings.scss'),
          // },
        }),
      )
    },
  },
  vite: {
    plugins: [svgLoader({})],
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
    'nuxt-lazy-hydrate',
    [
      'nuxt-mail',
      {
        message: {
          to: process.env.EMAIL_APP_DESTINATION,
        },
        smtp: {
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_APP_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
          },
        },
      },
    ],
  ],
  googleFonts: {
    families: {
      Montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  devtools: { enabled: true },
})
