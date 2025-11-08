<template>
  <a
    :href="project.linkUrl"
    target="_blank"
    rel="noopener"
    class="block h-full no-underline"
  >
    <UCard
      :class="[
        'projects-feature-card flex h-full flex-col gap-5 rounded-[1.75rem] border p-6 shadow-lg transition hover:-translate-y-1',
        isDark
          ? 'border-secondary/40 bg-secondary-darken-2 text-white hover:border-secondary-lighten-2/40'
          : 'border-secondary/10 bg-white text-secondary hover:border-primary/40',
      ]"
      :style="project.tint ? { background: project.tint } : undefined"
      :ui="{ body: 'flex flex-col gap-6 h-full' }"
    >
      <header class="flex items-start justify-between gap-4">
        <div>
          <p v-if="project.badge" class="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
            {{ project.badge }}
          </p>
          <h3 class="text-2xl font-bold leading-tight">
            {{ project.name }}
          </h3>
          <p v-if="project.meta" :class="['text-sm', isDark ? 'text-white/80' : 'text-secondary/70']">
            {{ project.meta }}
          </p>
        </div>

        <div
          v-if="project.imageUrl"
          :class="[
            'flex h-16 w-16 items-center justify-center rounded-2xl',
            isDark ? 'bg-white/10' : 'bg-black/5',
          ]"
        >
          <app-image
            :src="project.imageUrl"
            :height="56"
            :width="56"
            :alt="project.name"
            :zoomable="false"
            class="max-h-12 max-w-full"
          />
        </div>
      </header>

      <p v-if="project.description" :class="['text-base leading-relaxed', isDark ? 'text-white/85' : 'text-secondary/80']">
        {{ project.description }}
      </p>

      <dl v-if="project.highlights?.length" class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="highlight in project.highlights"
          :key="highlight.label"
          :class="[
            'rounded-2xl border border-current/10 p-4',
            isDark ? 'bg-white/10' : 'bg-black/5',
          ]"
        >
          <dt :class="['text-xs font-semibold uppercase tracking-wide', isDark ? 'text-white/80' : 'text-secondary/70']">
            {{ highlight.label }}
          </dt>
          <dd :class="['text-xl font-bold', isDark ? 'text-white' : 'text-secondary']">
            {{ highlight.value }}
          </dd>
        </div>
      </dl>

      <div v-if="project.tags?.length" class="flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          :class="[
            'rounded-full border border-current/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide',
            isDark ? 'text-white/80' : 'text-secondary/70',
          ]"
        >
          {{ tag }}
        </span>
      </div>

      <footer
        :class="[
          'mt-auto flex items-center justify-between text-sm font-semibold uppercase tracking-wide',
          isDark ? 'text-white/90' : 'text-primary',
        ]"
      >
        <span>{{ project.ctaLabel || ctaLabel }}</span>
        <UIcon name="i-heroicons-arrow-up-right-20-solid" />
      </footer>
    </UCard>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

interface ProjectCardHighlight {
  label: string
  value: string
}

interface ProjectCardData {
  name: string
  description?: string
  meta?: string
  linkUrl: string
  imageUrl?: string
  tags?: string[]
  badge?: string
  theme?: 'light' | 'dark'
  highlights?: ProjectCardHighlight[]
  tint?: string
  ctaLabel?: string
}

const props = defineProps({
  project: {
    type: Object as PropType<ProjectCardData>,
    required: true,
  },
})

const { t } = useI18n({
  useScope: 'local',
})

const isDark = computed(() => props.project.theme === 'dark')
const ctaLabel = computed(() => t('ctaLabel'))
</script>

<i18n lang="json">
{
  "pt-BR": {
    "ctaLabel": "Ver projeto"
  },
  "en": {
    "ctaLabel": "View project"
  },
  "es": {
    "ctaLabel": "Ver proyecto"
  }
}
</i18n>

<style scoped>
.projects-feature-card {
  backdrop-filter: blur(14px);
}
</style>
