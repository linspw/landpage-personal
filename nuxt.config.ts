import { fileURLToPath } from 'url'
import svgLoader from 'vite-svg-loader'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import vuetifySass from '@paro-paro/vite-plugin-vuetify-sass'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  css: [
    'vuetify/styles',
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

  vite: {
    plugins: [svgLoader({})],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/i18n',
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
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        const url = fileURLToPath(
          new URL('./src/assets/styles/vuetify-settings.scss', import.meta.url),
        )
        // @ts-expect-error
        config.plugins.push(
          vuetify({
            autoImport: true,
          }),
          vuetifySass({
            configFile: url,
          }),
        )
      })
    },
  ],
  googleFonts: {
    families: {
      'Open+Sans': {
        wght: [300, 400, 500, 600, 700, 800],
        ital: [300, 400, 500, 600, 700, 800],
      },
    },
  },
  i18n: {
    baseUrl: 'https://snown.com.br',
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'pt-BR',
        file: 'pt-BR.json',
        iso: 'pt-BR',
        isCatchallLocale: true,
      },
      {
        code: 'en',
        file: 'en.json',
        iso: 'en-US',
      },
      {
        code: 'es',
        file: 'es.json',
        iso: 'es-ES',
      },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'pt-BR',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  devtools: { enabled: true },
})
