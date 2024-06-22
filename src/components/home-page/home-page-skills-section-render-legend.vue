<template>
  <div>
    <div class="font-semibold mb-2 text-tertiary">
      {{ t('titleLegend') }}
    </div>

    <div class="flex flex-wrap gap-10">
      <div class="flex flex-col items-center gap-1">
        <div style="width: 100px">
          <v-progress-linear
            :model-value="8"
            :max="10"
            color="secondary"
            height="12"
            aria-label="Personal grade Legend"
            rounded
          >
            <template #default>
              <strong style="font-size: 10px; color: white">
                {{ 8 }}
              </strong>
            </template>
          </v-progress-linear>
        </div>

        <div class="text-xs text-center italic">
          {{ t('legend.domain') }}
        </div>
      </div>

      <div class="flex flex-col items-center gap-1">
        <div
          style="position: relative; width: 40px; height: 10px"
          class="border-wave rounded-3xl"
        ></div>

        <div class="text-xs text-center italic">
          {{ t('legend.expert') }}
        </div>
      </div>

      <div class="flex flex-col items-center gap-1">
        <v-chip color="info" variant="outlined" size="x-small">
          PRO

          <v-icon icon="far fa-star" size="x-small" class="ml-1" />
        </v-chip>

        <div class="text-xs text-center italic">
          {{ t('legend.highProficiency') }}
        </div>
      </div>

      <div class="flex flex-col items-center gap-1">
        <v-chip color="error" variant="outlined" size="x-small">
          In Love

          <v-icon icon="fas fa-heart" size="x-small" class="ml-1" />
        </v-chip>

        <div class="text-xs text-center italic">
          {{ t('legend.passionate') }}
        </div>
      </div>

      <div class="flex flex-col items-center gap-1">
        <v-chip color="success" variant="outlined" size="x-small">
          EXPERIMENTING

          <v-icon icon="fas fa-flask" size="x-small" class="ml-1" />
        </v-chip>

        <div class="text-xs text-center italic">
          {{ t('legend.experimenting') }}
        </div>
      </div>

      <div class="flex flex-col items-center gap-1">
        <v-chip
          color="primary"
          variant="outlined"
          size="x-small"
          class="uppercase"
        >
          4 {{ t('yearAbbreviation') }}

          <v-icon icon="fas fa-plus" size="x-small" class="ml-1" />
        </v-chip>
        <div class="text-xs text-center italic">
          {{ t('legend.experience') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local',
})
</script>

<i18n lang="json" src="./translate-skills-extras.json"></i18n>
