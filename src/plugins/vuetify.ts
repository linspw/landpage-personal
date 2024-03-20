// @unocss-include DON'T FORGET TO ADD THIS COMMENT
import { aliases, fa } from 'vuetify/iconsets/fa'
import { pt, en, es } from 'vuetify/locale'

export const getNativeLocale = (defaultLocale = 'pt-BR') => {
  if (!process.client) return defaultLocale
  if (useCookieLocale()?.value?.length) {
    return useCookieLocale().value
  }

  if (navigator.language.split('-')[0]) {
    return navigator.language.split('-')[0]
  }

  return defaultLocale
}

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-ignore
  nuxtApp.hook('vuetify:configuration', ({ vuetifyOptions }) => {
    vuetifyOptions.icons = {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
      },
    }
    vuetifyOptions.locale = {
      // adapter: createVueI18nAdapter({ i18n, useI18n }) // Currently doesn't work with nuxt
      locale: getNativeLocale('pt-BR'),
      messages: { 'pt-BR': pt, en, es, pt },
    }
  })
})
