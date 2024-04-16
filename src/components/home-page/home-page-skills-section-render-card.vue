<template>
  <v-card
    class="skill-card"
    :class="{
      'border-wave': expert,
    }"
  >
    <div style="background-color: white; margin: 2px" class="p-4 rounded-3xl">
      <div class="flex gap-2">
        <v-icon v-if="icon" :icon="icon" />

        {{ skillName }}
      </div>

      <div class="flex items-center gap-2 mt-2">
        <div class="flex flex-col" style="width: 100px">
          <v-progress-linear
            :model-value="personalGrade"
            :max="10"
            color="secondary"
            height="12"
            rounded
            aria-label="Personal grade"
          >
            <template #default>
              <strong style="font-size: 10px; color: white">
                {{ snapPersonalGrade(personalGrade) }}
              </strong>
            </template>
          </v-progress-linear>
        </div>

        <div class="flex gap-1">
          <v-chip
            v-if="personalGrade && personalGrade > 8"
            color="info"
            variant="outlined"
            size="x-small"
          >
            PRO

            <v-icon icon="far fa-star" size="x-small" class="ml-1" />
          </v-chip>

          <v-chip v-if="inLove" color="error" variant="outlined" size="x-small">
            In Love

            <v-icon icon="fas fa-heart" size="x-small" class="ml-1" />
          </v-chip>

          <v-chip
            v-if="experimenting"
            color="success"
            variant="outlined"
            size="x-small"
          >
            EXPERIMENTING

            <v-icon icon="fas fa-flask" size="x-small" class="ml-1" />
          </v-chip>

          <v-chip
            v-if="experienceTime && experienceTime! > 2"
            color="primary"
            variant="outlined"
            size="x-small"
            class="uppercase"
          >
            {{ experienceTime }}

            {{ t('yearAbbreviation') }}

            <v-icon icon="fas fa-plus" size="x-small" class="ml-1" />
          </v-chip>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  skillName: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: undefined,
  },
  experienceTime: {
    type: Number,
    default: undefined,
  },
  personalGrade: {
    type: Number,
    required: true,
  },
  expert: {
    type: Boolean,
    default: undefined,
  },
  experimenting: {
    type: Boolean,
    default: undefined,
  },
  inLove: {
    type: Boolean,
    default: undefined,
  },
})

const { t } = useI18n({
  useScope: 'local',
})

const snapPersonalGrade = (personalGrade: number) => {
  return Math.round(personalGrade! * 10) / 10
}
</script>

<i18n lang="json" src="./translate-skills-extras.json"></i18n>
