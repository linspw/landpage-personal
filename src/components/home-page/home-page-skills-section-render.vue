<template>
  <v-container>
    <HomePageSkillsSectionRenderLegend class="mb-10" />

    <v-row>
      <v-col v-for="skill in skills" :key="skill.title" cols="12" md="6">
        <div
          class="font-weight-bold mb-4"
          :class="`text-${skill.color}`"
          data-aos="fade-up"
        >
          {{ t(`titles.${skill.title}`) }}
        </div>

        <div class="d-flex flex-column gap-2">
          <div
            v-for="subskill in skill.items"
            :key="subskill.title"
            class="d-flex flex-column"
          >
            <div class="font-weight-medium mb-1" data-aos="fade-up">
              {{ t(`subtitles.${subskill.title}`) }}
            </div>

            <div class="d-flex gap-1 flex-wrap">
              <v-card
                v-for="(item, index) in subskill.items"
                :key="item"
                class="skill-card"
                data-aos="fade-up"
                tabindex="0"
                :class="{
                  'border-wave': skillsDetailsData[item].expert,
                }"
                :data-aos-delay="50 + index * 50"
                @click.prevent
              >
                <div
                  style="background-color: white; margin: 2px"
                  class="pa-4 rounded-xl"
                >
                  <div class="d-flex gap-2">
                    <v-icon
                      v-if="skillsDetailsData[item]?.icon"
                      :icon="skillsDetailsData[item].icon"
                    />

                    {{ t(`${item}.title`) }}
                  </div>

                  <div class="d-flex align-center gap-2 mt-2">
                    <div class="d-flex flex-column" style="width: 100px">
                      <v-progress-linear
                        :model-value="skillsDetailsData[item].personalGrade"
                        :max="10"
                        color="secondary"
                        height="12"
                        rounded
                      >
                        <template #default>
                          <strong style="font-size: 10px; color: white">
                            {{ getPersonalGrade(item) }}
                          </strong>
                        </template>
                      </v-progress-linear>
                    </div>

                    <div class="d-flex gap-1">
                      <v-chip
                        v-if="getPersonalGrade(item) > 8"
                        color="info"
                        variant="outlined"
                        size="x-small"
                      >
                        PRO

                        <v-icon
                          icon="far fa-star"
                          size="x-small"
                          class="ml-1"
                        />
                      </v-chip>

                      <v-chip
                        v-if="skillsDetailsData[item].inLove"
                        color="error"
                        variant="outlined"
                        size="x-small"
                      >
                        In Love

                        <v-icon
                          icon="fas fa-heart"
                          size="x-small"
                          class="ml-1"
                        />
                      </v-chip>

                      <v-chip
                        v-if="skillsDetailsData[item].experimenting"
                        color="success"
                        variant="outlined"
                        size="x-small"
                      >
                        EXPERIMENTING

                        <v-icon
                          icon="fas fa-flask"
                          size="x-small"
                          class="ml-1"
                        />
                      </v-chip>

                      <v-chip
                        v-if="
                          skillsDetailsData[item].experienceTime &&
                          skillsDetailsData[item].experienceTime! > 2
                        "
                        color="primary"
                        variant="outlined"
                        size="x-small"
                        class="text-uppercase"
                      >
                        {{ skillsDetailsData[item].experienceTime }}
                        {{ t('yearAbbreviation') }}

                        <v-icon
                          icon="fas fa-plus"
                          size="x-small"
                          class="ml-1"
                        />
                      </v-chip>
                    </div>
                  </div>
                </div>
              </v-card>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="isPopupOpen" max-width="400px" :target="btnRef">
      <v-card class="pa-6 mx-2">
        <v-card-title class="text-wrap">
          {{ t(`${selectedSkill}.title`) }}
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { skills } from './skills-data'
import { skillsDetailsData } from './skills-details-data'

const isPopupOpen = ref(false)
const selectedSkill = ref('')
const btnRef = ref()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _handleSelect = ($event: MouseEvent, skill: string) => {
  btnRef.value = $event.target
  isPopupOpen.value = true
  selectedSkill.value = skill
}

const { t } = useI18n({
  useScope: 'local',
})

const getPersonalGrade = (item: keyof typeof skillsDetailsData) => {
  return Math.round(skillsDetailsData[item].personalGrade! * 10) / 10
}

defineEmits(['select-skill'])
</script>

<i18n lang="json" src="./skills-dictionary.json"></i18n>
<i18n lang="json" src="./skills-translate.json"></i18n>
<i18n lang="json" src="./skills-categories.json"></i18n>
