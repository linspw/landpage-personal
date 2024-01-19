<template>
  <component :is="tag" ref="textRef" class="anim-typewriter" />
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

const textRef = ref()

gsap.registerPlugin(TextPlugin)

const $props = defineProps({
  text: {
    default: '',
    type: String,
  },
  tag: {
    default: 'span',
    type: String,
  },
  removeCursorOnEnd: {
    default: true,
    type: Boolean,
  },
  duration: {
    type: Number,
    default: 8,
  },
})

const setup = () => {
  const cursor = gsap.to(textRef.value, {
    '--anim-typewriter-opacity': 0,
    ease: 'power2.inOut',
    repeat: -1,
  })

  const tl = gsap.timeline({
    paused: true,
  })

  tl.to(textRef.value, {
    text: $props.text,
    duration: $props.duration, // slow then speeds up easing
    onComplete: () => {
      if ($props.removeCursorOnEnd) {
        cursor.pause().resetTo('--anim-typewriter-opacity', 0).kill()
      }
    },
  })

  tl.play()
}

watchEffect(() => {
  if ($props.text !== undefined && textRef.value) setup()
})
</script>

<style lang="scss" scoped>
/* Animation */
.anim-typewriter {
  --anim-typewriter-opacity: 1;

  &::after {
    opacity: var(--anim-typewriter-opacity);
    content: '_';
  }
}
</style>
