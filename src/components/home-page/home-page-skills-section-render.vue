<template>
  <v-container>
    <v-row>
      <v-col
        v-for="category in categoriesData"
        :key="category.title"
        cols="12"
      >
        <div class="d-flex align-center mb-4">
          <div
            class="font-weight-bold"
            :class="`text-${category.color}`"
          >
            {{ t(`titles.${category.title}`) }}
          </div>
        </div>

        <v-divider class="mb-4" />

        <div class="d-flex flex-column gap-4 pb-2">
          <div
            v-for="subCategory in category.items"
            :key="subCategory.title"
            class="d-flex flex-column"
          >
            <div class="d-flex align-center mb-2">
              <div class="font-weight-semi-bold">
                {{ t(`subtitles.${subCategory.title}`) }}
              </div>
            </div>

            <div class="d-flex gap-4 flex-wrap">
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
      </v-col>
    </v-row>

  </v-container>
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
</script>

<i18n lang="json" src="./translate-skills-items.json"></i18n>
<i18n lang="json" src="./translate-skills-extras.json"></i18n>
<i18n lang="json" src="./translate-skills-categories.json"></i18n>
