<template>
  <v-container>
    <HomePageSkillsSectionRenderLegend
      class="mb-10"
      data-aos="fade-up"
      data-aos-once="true"
    />

    <v-row>
      <v-col
        v-for="category in categoriesData"
        :key="category.title"
        cols="12"
        md="6"
      >
        <div class="font-bold mb-4" :class="`text-${category.color}`">
          {{ t(`titles.${category.title}`) }}
        </div>

        <div class="dflex flex-column gap-2">
          <v-list
            v-for="subCategory in category.items"
            :key="subCategory.title"
            class="overflow-visible"
            rounded="xl"
            nav
          >
            <v-list-subheader
              class="font-bold mb-1"
              data-aos="fade-up"
              data-aos-once="true"
            >
              {{ t(`subtitles.${subCategory.title}`) }}
            </v-list-subheader>

            <HomePageSkillsSectionRenderCard
              v-for="(item, index) in subCategory.items"
              :key="item"
              data-aos="fade-up"
              data-aos-once="true"
              :skill-name="t(`${item}.title`)"
              :expert="skillsDetailsData[item].expert"
              :experimenting="skillsDetailsData[item].experimenting"
              :in-love="skillsDetailsData[item].inLove"
              :icon="skillsDetailsData[item].icon"
              :personal-grade="skillsDetailsData[item].personalGrade"
              :experience-time="skillsDetailsData[item].experienceTime"
              :data-aos-delay="50 + index * 50"
              tabindex="0"
              @click="handleSelect($event, item)"
            />
          </v-list>
        </div>
      </v-col>
    </v-row>

    <HomePageSkillsSectionRenderDialog
      v-model="isPopupOpen"
      :selected-skill="selectedSkill"
      :btn-ref="btnRef"
    />
  </v-container>
</template>

<script setup lang="ts">
import { categoriesData } from './categories-data'
import { skillsDetailsData } from './skills-details-data'

const isPopupOpen = ref(false)
const selectedSkill = ref('')
const btnRef = ref()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleSelect = ($event: MouseEvent, skill: string) => {
  btnRef.value = $event.target
  isPopupOpen.value = true
  selectedSkill.value = skill
}

const { t } = useI18n({
  useScope: 'local',
})
</script>

<i18n lang="json" src="./translate-skills-items.json"></i18n>
<i18n lang="json" src="./translate-skills-extras.json"></i18n>
<i18n lang="json" src="./translate-skills-categories.json"></i18n>
