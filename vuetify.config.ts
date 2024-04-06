// vuetify.config.ts
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
import type { ThemeDefinition } from 'vuetify'

const light: ThemeDefinition = {
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
    warning: '#fda12e',
  },
}

const themes: Record<string, ThemeDefinition> = {
  light,
}

export default defineVuetifyConfiguration({
  labComponents: true,
  directives: true,
  defaults: {
    VToolbar: {
      height: 80,
    },
    VCard: {
      rounded: 'xl',

      VListItem: {
        rounded: 'xl',
      },
    },
    VBtn: {
      rounded: 'lg',
    },
    VTextField: {
      rounded: 'lg',
      variant: 'outlined',
      color: 'primary',
    },
    VSelect: {
      rounded: 'lg',
      variant: 'outlined',
      color: 'primary',
    },
    VList: {
      rounded: 'xl',
    },
    VMenu: {
      VList: {
        rounded: 'xl',
      },
    },
    VPagination: {
      rounded: 'lg',
    },
    VColorPicker: {
      rounded: 'xl',
    },
  },
  theme: {
    defaultTheme: 'light',
    themes,
    variations: {
      colors: ['primary', 'secondary', 'tertiary', 'quaternary'],
      lighten: 5,
      darken: 5,
    },
  },
  icons: false,
})
