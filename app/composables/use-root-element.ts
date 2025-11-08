import { getCurrentInstance, onMounted, onUpdated } from 'vue'
import { computedWithControl, unrefElement } from '@vueuse/core'
import type { MaybeElement, VueInstance, MaybeElementRef } from '@vueuse/core'

export function useRootElement<
  T extends MaybeElement = MaybeElement,
  R extends VueInstance = VueInstance,
>(rootComponent?: MaybeElementRef<R>) {
  const vm = getCurrentInstance()!
  const currentElement = computedWithControl(
    () => null,
    () => (rootComponent ? unrefElement(rootComponent) : vm.proxy!.$el) as T,
  )

  onUpdated(currentElement.trigger)
  onMounted(currentElement.trigger)

  return currentElement
}
