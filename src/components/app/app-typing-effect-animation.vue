<template>
  <component
    :is="tag"
    ref="textRef"
    class="anime-typewriter"
    @click="restartOnClick && setup()"
  >
    <span
      v-for="(letter, index) in text"
      :key="`${letter}_${index}`"
      style="opacity: 0"
    >
      {{ letter }}
    </span>
  </component>
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
  restartOnClick: {
    type: Boolean,
    default: false,
  },
})

const initialText = computed(() => {
  return replaceLettersWithSpan($props.text)
})

function replaceLettersWithSpan(text: string): string {
  return text.replace(/[^\s]/g, (match) => {
    return `<span style="opacity: 0;">${match}</span>`
  })
}

const setup = () => {
  const cursor = gsap.fromTo(
    textRef.value,
    { '--anime-typewriter-opacity': 1 },
    {
      '--anime-typewriter-opacity': 0,
      ease: 'power2.inOut',
      repeat: -1,
    },
  )

  const tl = gsap.timeline({
    paused: true,
  })

  tl.fromTo(
    textRef.value,
    {
      text: {
        value: initialText.value,
      },
    },
    {
      text: {
        value: $props.text,
        newClass: 'anime-typewriter__text',
        delimiter: '',
      },
      duration: $props.duration, // slow then speeds up easing
      onComplete: () => {
        if ($props.removeCursorOnEnd) {
          cursor.pause().resetTo('--anime-typewriter-opacity', 0).kill()
        }
      },
    },
  )

  tl.play()
}

watchEffect(() => {
  if ($props.text !== undefined && textRef.value) setup()
})
</script>

<style lang="scss">
/* Animation */
:root {
  --anime-typewriter-opacity: 1;
}

.anime-typewriter__text {
  --anime-typewriter-text-opacity: var(--anime-typewriter-opacity);

  &::after {
    opacity: var(--anime-typewriter-text-opacity);
    content: '_';
  }
}
</style>
