<template>
  <section
    class="app-section"
    :class="
      customColor ? `app-section--custom-color-${customColor}` : undefined
    "
  >
    <UContainer class="app-section__header" data-aos="fade" data-aos-once="true">
      <nav
        v-if="breadcrumbs.length"
        class="app-section__breadcrumbs"
        aria-label="Breadcrumb"
      >
        <ol>
          <li v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.title">
            <NuxtLink
              v-if="breadcrumb.to"
              :to="breadcrumb.to"
              class="app-section__breadcrumb-link"
            >
              {{ breadcrumb.title }}
            </NuxtLink>
            <span v-else class="app-section__breadcrumb-link">
              {{ breadcrumb.title }}
            </span>

            <span v-if="index < breadcrumbs.length - 1" class="app-section__breadcrumb-separator">
              /
            </span>
          </li>
        </ol>
      </nav>

      <h2
        v-if="title"
        class="app-section__title mb-2 text-2xl font-bold uppercase text-secondary md:text-3xl"
      >
        {{ title }}
      </h2>

      <p v-if="description" class="text-lg font-medium text-tertiary md:text-xl">
        {{ description }}
      </p>
    </UContainer>

    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: undefined,
  },
  description: {
    type: String,
    default: undefined,
  },
  breadcrumbs: {
    type: Array as () => { title: string; to?: string }[],
    default: () => [],
  },
  customColor: {
    type: String,
    default: undefined,
  },
})
</script>

<style scoped>
.app-section {
  position: relative;
  isolation: isolate;
  backdrop-filter: saturate(180%) blur(12px);
  padding: 48px 0;
  background-color: rgba(255, 255, 255, 0.88);
  color: #263238;
}

.app-section--custom-color-gradient-primary {
  background: linear-gradient(
    125deg,
    #ffffff 0%,
    rgba(1, 83, 255, 0.08) 90%
  );
  color: #263238;
}

.app-section--custom-color-white {
  background-color: rgba(255, 255, 255, 0.92);
  color: #263238;
}

.app-section__header {
  text-align: left;
  margin-bottom: 20px;
}

.app-section__title {
  position: relative;
  display: inline-block;
}

.app-section__title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 48px;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: 2px;
}

.app-section__breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #0153ff;
  padding: 0;
  margin: 0 0 0.75rem 0;
  list-style: none;
}

.app-section__breadcrumb-link {
  text-decoration: none;
  color: inherit;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.app-section__breadcrumb-link:hover {
  opacity: 0.7;
}

.app-section__breadcrumb-separator {
  color: rgba(1, 83, 255, 0.5);
}
</style>

