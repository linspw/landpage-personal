<template>
  <div class="about-me-page-hero d-flex align-md-center justify-center">
    <background-wave />

    <v-container
      class="about-me-page-hero__container d-flex flex-column flex-md-row align-center justify-center"
      :class="{
        'about-me-page-hero__container--with-top-margin': !$display.mdAndUp.value,
      }"
    >
      <v-avatar
        color="white"
        size="200"
        rounded="xl"
        class="elevation-24 mb-8 mb-md-0 animate__animated animate__fadeInTopLeft animate__slow"
      >
        <app-image
          cover
          src="/images/avatars/my-photo.jpg"
          alt="Jessé Correia profile picture"
          :height="200"
          :width="200"
        />
      </v-avatar>

      <div
        class="d-flex flex-column justify-center align-center flex-md-1-1 px-14"
      >
        <AppTypingEffectAnimation
          text="Jessé Correia"
          tag="h1"
          class="text-h5 text-md-h3 font-weight-bold text-secondary mb-6 text-center"
          :duration="5"
          :remove-cursor-on-end="false"
          restart-on-click
        />

        <div
          class="text-h6 text-md-h4 text-primary d-flex flex-column align-center justify-center justify-md-start mb-4 font-weight-thin text-center"
        >
          {{ t('jobTitle') }}
        </div>

        <div class="mb-6 d-flex align-center justify-center flex-column text-center">
          <div class="text-body-1 mt-2">
            🇧🇷 Brazilian and Portuguese 🇵🇹
          </div>
          <div class="text-caption">
            <a class="text-decoration-none" href="mailto:linspw@live.com">linspw@live.com</a>
          </div>
        </div>

        <div class="d-flex flex-column flex-md-row justify-center gap-2">
          <v-btn-group
            color="secondary"
            rounded="xl"
            size="large"
            variant="text"
          >
            <v-btn
              rounded="0"
              href="https://github.com/linspw"
              target="_blank"
              aria-label="View Jessé Correia's Github profile"
            >
              <template #prepend><v-icon icon="fab fa-github" /></template>

              <template v-if="$display.mdAndUp.value">Github</template>
            </v-btn>

            <v-btn
              rounded="0"
              href="https://www.linkedin.com/in/jessecorreialive/"
              target="_blank"
              aria-label="View Jessé Correia's LinkedIn profile"
            >
              <template #prepend><v-icon icon="fab fa-linkedin" /></template>

              <template v-if="$display.mdAndUp.value">LinkedIn</template>
            </v-btn>

            <v-btn
              rounded="0"
              :href="curriculumLink"
              target="_blank"
              :aria-label="t('resume')"
            >
              <template #prepend>
                <v-icon icon="fas fa-cloud-arrow-down" />
              </template>

              <template v-if="$display.mdAndUp.value">
                {{ t('resume') }}
              </template>

              <v-tooltip
                activator="parent"
                location="bottom"
                :title="t('downloadResume')"
              >
                {{ t('downloadResume') }}
              </v-tooltip>
            </v-btn>
          </v-btn-group>

          <v-btn
            color="secondary"
            to="/#section-skills"
            rounded="xl"
            size="large"
            class="order-first order-md-last"
            exact
            :active="false"
            aria-label="Know more about Jessé Correia's skills"
          >
            {{ t('knowMore') }}
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
const $display = useDisplay()

const { t, locale } = useI18n({
  useScope: 'local',
})

const curriculumLink = computed(() => {
  return locale.value === 'pt-BR'
    ? '/files/curriculum_2024_pt_br.pdf'
    : '/files/curriculum_2024_en.pdf'
})
</script>

<i18n lang="json">
{
  "pt-BR": {
    "jobTitle": "Engenheiro de Software",
    "resume": "Currículo",
    "downloadResume": "Baixar Currículo",
    "knowMore": "Conheça mais!"
  },
  "en": {
    "jobTitle": "Software Engineer",
    "resume": "Resume",
    "downloadResume": "Download Resume",
    "knowMore": "Know More!"
  },
  "es": {
    "jobTitle": "Ingeniero de Software",
    "resume": "Currículum",
    "downloadResume": "Descargar Currículum",
    "knowMore": "¡Conoce más!"
  }
}
</i18n>

<style lang="scss">
.about-me-page-hero {
  position: relative;
}

.about-me-page-hero__container {
  position: relative;

  &--with-top-margin {
    margin-top: 80px;
  }
}
</style>