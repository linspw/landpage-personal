<template>
  <v-container>
    <v-row>
      <v-col v-for="skill in skills" :key="skill.title" cols="12" md="6">
        <div
          class="font-weight-bold mb-4"
          :class="`text-${skill.color}`"
          data-aos="fade-up"
        >
          {{ skill.title }}
        </div>

        <div class="d-flex flex-column gap-2">
          <div
            v-for="subskill in skill.items"
            :key="subskill.title"
            class="d-flex flex-column"
          >
            <div class="font-weight-medium mb-1" data-aos="fade-up">
              {{ subskill.title }}
            </div>

            <div class="d-flex gap-1 flex-wrap">
              <v-card
                v-for="(item, index) in subskill.items"
                :key="item"
                class="skill-card pa-4"
                data-aos="fade-up"
                :data-aos-delay="50 + index * 50"
                @click="handleSelect($event, item)"
              >
                <div class="d-flex gap-2">
                  <v-icon
                    v-if="skillsDetailsData[item]?.icon"
                    :icon="skillsDetailsData[item].icon"
                  />

                  {{ t(`${item}.title`) }}
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

const handleSelect = ($event: MouseEvent, skill: string) => {
  btnRef.value = $event.target
  isPopupOpen.value = true
  selectedSkill.value = skill
}

const { t } = useI18n({
  useScope: 'local',
})

defineEmits(['select-skill'])
</script>

<i18n lang="json" src="./skills-dictionary.json"></i18n>
