import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt',
    setupFiles: ['./tests/unit/setup.ts'],
    env: {
      NODE_ENV: 'test',
      EMAIL_APP_PASSWORD: 'wonu zcgq bxcl dwja',
      EMAIL_APP_USER: 'linshnt@gmail.com',
      EMAIL_APP_DESTINATION: 'linspw@live.com',
    },
    onConsoleLog: (log) => {
      // Silence logs coming from vue <Suspense> is experimental, and stdout | unknown component before it
      if (log.includes('<Suspense')) return false
    },
  },
})
