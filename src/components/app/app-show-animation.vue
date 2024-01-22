<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { useElementVisibility } from '@vueuse/core'

const animatedElement = useRootElement()
const targetIsVisible = useElementVisibility(animatedElement as any)

let animation: gsap.core.Tween

watchEffect(() => {
  if (targetIsVisible.value) {
    const skillsItems = animatedElement.value.querySelectorAll('.skill-item')

    if (animation) animation.restart()
    else if (skillsItems.length) {
      animation = gsap.from(skillsItems, {
        autoAlpha: 0,
        y: 20,
        stagger: 0.2, // Atraso entre cada item
        duration: 0.8,
        ease: 'power3.out',
        opacity: 0,
      })
    }
  }
})
</script>
