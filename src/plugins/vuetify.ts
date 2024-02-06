import { createVuetify } from 'vuetify'
import type { ThemeDefinition } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import { pt, en, es } from 'vuetify/locale'

export default defineNuxtPlugin((nuxtApp) => {
  const dark: ThemeDefinition = {
    dark: false,
    colors: {
      background: '#FFFFFF',
      'on-background': '#000000',

      surface: '#FFFFFF',

      primary: '#0153FF',
      'on-primary': '#ffffff',

      secondary: '#263238',
      'on-secondary': '#FFFFFF',

      tertiary: '#686868',
      'on-tertiary': '#ffffff',

      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    },
  }
  const vuetify = createVuetify({
    ssr: true,
    icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
        mdi,
      },
    },
    locale: {
      // adapter: createVueI18nAdapter({ i18n, useI18n }) // Currently doesn't work with nuxt
      locale: 'pt-BR',
      messages: { 'pt-BR': pt, en, es, pt },
    },
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark,
      },
      variations: {
        colors: ['primary', 'secondary'],
        lighten: 5,
        darken: 5,
      },
    },
    defaults: {
      VCard: {
        rounded: 'xl',
      },
      VBtn: {
        rounded: 'lg',
      },
    },
  })

  // @ts-ignore
  nuxtApp.vueApp.use(vuetify)
})
