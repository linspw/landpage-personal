<template>
  <nav class="app-navigation-buttons" aria-label="Side Section Navigation.">
    <ul class="app-navigation-buttons__list">
      <li
        v-for="(section, index) in sections"
        :key="index"
        class="app-navigation-buttons__list-item"
      >
        <button
          type="button"
          aria-label="Go to first section. Pitch."
          class="app-navigation-buttons__button"
          :class="{
            'app-navigation-buttons__button--current':
              currentSection === section.id,
          }"
          @click="handleClick(section.url)"
        />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

interface Section {
  url: string
  id: string
}

const currentSection = ref('')

const $props = defineProps({
  sections: {
    type: Array as PropType<Section[]>,
    default() {
      return []
    },
  },
})

const handleClick = (fullPath: string) => {
  return navigateTo(fullPath)
}

onMounted(() => {
  $props.sections.forEach((item) => {
    const section = document.getElementById(item.id) as HTMLElement
    useIntersectionObserver(
      section,
      ([{ isIntersecting }]) => {
        if (isIntersecting) currentSection.value = item.id
      },
      {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.4,
      },
    )
  })
})
</script>

<style lang="scss">
.app-navigation-buttons {
  z-index: 999;
  display: flex;
  position: fixed;
  top: 50%;
  color: rgb(var(--v-theme-secondary));
  right: calc(3em + 1em);
  transform: translateX(-50%);
}

.app-navigation-buttons__list {
  width: 0.5em;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.app-navigation-buttons__list-item {
  width: 0.523em;
}

.app-navigation-buttons__button {
  width: 100%;
  display: flex;
  width: inherit;
  cursor: pointer;
  min-height: 2em;
  position: relative;
  color: currentColor;
  transition-delay: 100ms;
  outline-color: transparent;
  background-color: transparent;

  &::after {
    content: '';
    width: 100%;
    height: 0.523em;
    position: absolute;
    background-color: currentColor;
    border: 1px solid currentColor;
    transition: transform 0.2s 100ms;
    transform: rotate(45deg);
  }

  &--current::after {
    transform: rotate(0) scale(2);
    background: transparent;
  }
}
</style>
