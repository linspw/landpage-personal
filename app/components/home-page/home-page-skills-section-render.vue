<template>
  <UContainer class="space-y-10">
    <section
      v-for="category in categoriesData"
      :key="category.title"
      class="space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200"
    >
      <header class="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <p class="text-xl font-bold" :class="getCategoryColorClass(category.color)">
          {{ t(`titles.${category.title}`) }}
        </p>
      </header>

      <div class="space-y-6">
        <div
          v-for="subCategory in category.items"
          :key="subCategory.title"
          class="space-y-3 rounded-2xl border border-slate-100 bg-white/70 p-4"
        >
          <p class="text-sm font-semibold uppercase tracking-wide text-secondary">
            {{ t(`subtitles.${subCategory.title}`) }}
          </p>

          <div class="flex flex-wrap gap-3">
            <HomePageSkillsSectionRenderCard
              v-for="item in subCategory.items"
              :key="item"
              :skill-name="t(`${item}.title`)"
              :icon="skillsDetailsData[item].icon"
              tabindex="0"
            />
          </div>
        </div>
      </div>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
import { categoriesData } from '../../assets/data/categories-data'
import { skillsDetailsData } from './skills-details-data'

// const isPopupOpen = ref(false)
// const selectedSkill = ref('')
// const btnRef = ref()

 
// const handleSelect = ($event: MouseEvent, skill: string) => {
//   btnRef.value = $event.target
//   isPopupOpen.value = true
//   selectedSkill.value = skill
// }

const { t } = useI18n({
  useScope: 'local',
})

const getCategoryColorClass = (color: string) => {
  const map: Record<string, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
  }

  return map[color] ?? 'text-primary'
}
</script>

<i18n lang="json" src="./translate-skills-items.json"></i18n>
<i18n lang="json" src="./translate-skills-extras.json"></i18n>
<i18n lang="json" src="./translate-skills-categories.json"></i18n>
