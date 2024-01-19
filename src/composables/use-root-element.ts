import { getCurrentInstance, onMounted, onUpdated } from 'vue'
import type { ComponentPublicInstance, MaybeRefOrGetter } from 'vue'
import { computedWithControl, toValue } from '@vueuse/core'
import type { ComputedRefWithControl } from '@vueuse/core'

export function useRootElement<T extends Element = Element>(
  rootComponent?: MaybeRefOrGetter<ComponentPublicInstance>,
): ComputedRefWithControl<T> {
  const vm = getCurrentInstance()!
  const currentElement = computedWithControl(
    () => null,
    () =>
      (rootComponent?.value ? toValue(rootComponent).$el : vm.proxy!.$el) as T,
  )

  onUpdated(currentElement.trigger)
  onMounted(currentElement.trigger)

  return currentElement
}
