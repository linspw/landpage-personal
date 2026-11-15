import { fileURLToPath } from 'node:url'
import svgLoader from 'vite-svg-loader'

const siteUrl = 'https://jesse-correia.vercel.app'
const mailDestination = process.env.EMAIL_APP_DESTINATION
const mailUser = process.env.EMAIL_APP_USER
const mailPassword = process.env.EMAIL_APP_PASSWORD
const mailConfigured =
  process.env.EMAIL_APP_ENABLED === 'true' &&
  Boolean(mailDestination && mailUser && mailPassword)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@assets/css/tailwind.css',
    '@assets/styles/index.scss',
    '@fortawesome/fontawesome-free/css/all.css',
    'animate.css/animate.min.css',
  ],

  alias: {
    '@assets': fileURLToPath(new URL('./app/assets', import.meta.url)),
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

  vite: {
    plugins: [svgLoader()],
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/i18n',
    '@nuxt/test-utils/module',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    'nuxt-aos',
    mailConfigured && [
      'nuxt-mail',
      {
        message: { to: mailDestination, from: mailUser },
        smtp: { service: 'gmail', auth: { user: mailUser, pass: mailPassword } },
      },
    ],
    '@nuxt/eslint',
  ],

  fonts: {
    families: [
      {
        name: 'Open Sans',
        provider: 'google',
        global: true,
        weights: ['300 800'],
        styles: ['normal', 'italic'],
        subsets: ['latin', 'latin-ext'],
      },
    ],
  },

  site: { url: siteUrl },

  routeRules: {
    '/files/curriculum_2024_pt_br.pdf': { redirect: '/files/curriculum_pt_br.pdf' },
    '/files/curriculum_2024_en.pdf': { redirect: '/files/curriculum_en.pdf' },
  },

  runtimeConfig: {
    public: { mailConfigured },
  },

  i18n: {
    baseUrl: siteUrl,
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'pt-BR',
        name: 'Português',
        file: 'pt-BR.json',
        language: 'pt-BR',
        isCatchallLocale: true,
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        language: 'en-US',
      },
      {
        code: 'es',
        name: 'Español',
        file: 'es.json',
        language: 'es-ES',
      },
    ],
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
  compatibilityDate: '2024-10-07',
})
