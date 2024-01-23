export const IS_BROWSER = typeof window !== 'undefined'

declare global {
  interface Window {
    msw: any
  }
}
