import { useElementVisibility, useParentElement, until } from '@vueuse/core'

export const useVisibilityOnce = () => {
  const isVisibleNow = useElementVisibility(useParentElement())
  const isVisibleOnce = ref<boolean>(false)

  until(isVisibleNow)
    .toBe(true)
    .then(() => (isVisibleOnce.value = true))

  return {
    isVisibleNow,
    isVisibleOnce,
  }
}
