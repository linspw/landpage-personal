import { fileURLToPath } from 'url'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  css: [
    'vuetify/styles',
    '@assets/styles/index.scss',
    '@fortawesome/fontawesome-free/css/all.css',
    'animate.css/animate.min.css',
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
  features: {
    inlineStyles: false, // or a function to determine inlining
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [svgLoader({})],
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/i18n',
    '@nuxt/test-utils/module',
    '@nuxtjs/sitemap',
    'nuxt-aos',
    'vuetify-nuxt-module',
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
  vuetify: {
    moduleOptions: {
      /* other module options */
      styles: {
        configFile: 'assets/styles/vuetify-settings.scss',
      },
      ssrClientHints: {
        viewportSize: true,
      },
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  devtools: { enabled: true },
})
