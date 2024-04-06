<template>
  <div data-aos="fade-up">
    <div class="font-weight-semi-bold mb-2 text-tertiary">
      {{ t('titleLegend') }}
    </div>

    <div class="d-flex flex-wrap gap-10">
      <div class="d-flex flex-column align-center gap-1">
        <div style="width: 100px">
          <v-progress-linear
            :model-value="8"
            :max="10"
            color="secondary"
            height="12"
            rounded
          >
            <template #default>
              <strong style="font-size: 10px; color: white">
                {{ 8 }}
              </strong>
            </template>
          </v-progress-linear>
        </div>

        <div class="text-caption text-center font-italic">
          {{ t('legend.domain') }}
        </div>
      </div>

      <div class="d-flex flex-column align-center gap-1">
        <div
          style="position: relative; width: 40px; height: 10px"
          class="border-wave rounded-xl"
        ></div>

        <div class="text-caption text-center font-italic">
          {{ t('legend.expert') }}
        </div>
      </div>

      <div class="d-flex flex-column align-center gap-1">
        <v-chip color="info" variant="outlined" size="x-small">
          PRO

          <v-icon icon="far fa-star" size="x-small" class="ml-1" />
        </v-chip>

        <div class="text-caption text-center font-italic">
          {{ t('legend.highProficiency') }}
        </div>
      </div>

      <div class="d-flex flex-column align-center gap-1">
        <v-chip color="error" variant="outlined" size="x-small">
          In Love

          <v-icon icon="fas fa-heart" size="x-small" class="ml-1" />
        </v-chip>

        <div class="text-caption text-center font-italic">
          {{ t('legend.passionate') }}
        </div>
      </div>

      <div class="d-flex flex-column align-center gap-1">
        <v-chip color="success" variant="outlined" size="x-small">
          EXPERIMENTING

          <v-icon icon="fas fa-flask" size="x-small" class="ml-1" />
        </v-chip>

        <div class="text-caption text-center font-italic">
          {{ t('legend.experimenting') }}
        </div>
      </div>

      <div class="d-flex flex-column align-center gap-1">
        <v-chip
          color="primary"
          variant="outlined"
          size="x-small"
          class="text-uppercase"
        >
          4 {{ t('yearAbbreviation') }}

          <v-icon icon="fas fa-plus" size="x-small" class="ml-1" />
        </v-chip>
        <div class="text-caption text-center font-italic">
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

defineEmits(['select-skill'])
</script>

<i18n lang="json" src="./skills-translate.json"></i18n>
