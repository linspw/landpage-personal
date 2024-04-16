<template>
  <v-dialog v-model="model" max-width="400px" :target="btnRef">
    <v-card class="p-6 mx-2">
      <v-card-title class="text-wrap">
        <v-icon
          v-if="skillsDetailsData[selectedSkill]?.icon"
          :icon="skillsDetailsData[selectedSkill].icon"
          class="mr-2"
        />

        {{ t(`${selectedSkill}.title`) }}
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { skillsDetailsData } from './skills-details-data'

const model = defineModel({
  type: Boolean,
  required: true,
})

defineProps({
  selectedSkill: {
    type: String,
    default: '',
  },
  btnRef: {
    default: undefined,
    type: Object as PropType<HTMLElement>,
  },
})

const { t } = useI18n({
  useScope: 'local',
})
</script>

<i18n lang="json" src="./translate-skills-items.json"></i18n>
