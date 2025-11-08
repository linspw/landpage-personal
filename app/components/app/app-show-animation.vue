<template>
  <slot />
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { useElementVisibility, useParentElement } from '@vueuse/core'

const parentElement = useParentElement()
const targetIsVisible = useElementVisibility(parentElement)

let animation: gsap.core.Tween

watchEffect(() => {
  if (targetIsVisible.value) {
    const skillsItems = parentElement.value!.querySelectorAll('.animated-show')

    if (animation) animation.restart()
    else if (skillsItems.length) {
      animation = gsap.fromTo(
        skillsItems,
        {
          autoAlpha: 0,
          y: 60,
          opacity: 0,
        },
        {
          autoAlpha: 1,
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1, // Atraso entre cada item
          ease: 'power4.out',
        },
      )
    }
  }
})
</script>
