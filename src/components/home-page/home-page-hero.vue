<template>
  <div class="home-page-hero flex md:items-center justify-center">
    <background-wave />

    <v-container
      class="home-page-hero__container flex flex-col md:flex-row items-center justify-center"
      :class="{
        'home-page-hero__container--with-top-margin': !$display.mdAndUp.value,
      }"
    >
      <v-avatar
        color="white"
        size="200"
        rounded="xl"
        class="elevation-24 mb-8 md:mb-0 animate__animated animate__fadeInTopLeft animate__slow"
      >
        <app-image
          cover
          src="/images/avatars/my-photo.jpg"
          alt="My photo"
          :height="200"
          :width="200"
        />
      </v-avatar>

      <div class="flex flex-col justify-center items-center md:flex-1 px-14">
        <AppTypingEffectAnimation
          text="Jessé Correia"
          tag="h1"
          class="text-h3 text-md-h1 font-weight-bold text-secondary mb-6 text-center"
          :duration="5"
          :remove-cursor-on-end="false"
          restart-on-click
        />

        <div
          class="text-h5 text-md-h3 text-primary flex items-center justify-center md:justify-start mb-12 font-weight-thin text-center"
        >
          {{ t('jobTitle') }}
        </div>

        <div class="flex flex-col flex-md-row justify-center gap-2">
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
              aria-label="Github"
            >
              <template #prepend><v-icon icon="fab fa-github" /></template>

              <template v-if="$display.mdAndUp.value">Github</template>
            </v-btn>

            <v-btn
              rounded="0"
              href="https://www.linkedin.com/in/jessecorreialive/"
              target="_blank"
              aria-label="LinkedIn"
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
    ? '/files/curriculo_2024_pt_br.pdf'
    : '/files/curriculo_2024_en.pdf'
})
</script>

<i18n lang="json">
{
  "pt-BR": {
    "jobTitle": "Engenheiro da Computação e Desenvolvedor Full Stack",
    "resume": "Currículo",
    "downloadResume": "Baixar Currículo",
    "knowMore": "Conheça mais!"
  },
  "en": {
    "jobTitle": "Computer Engineer and Full Stack Developer",
    "resume": "Resume",
    "downloadResume": "Download Resume",
    "knowMore": "Know More!"
  },
  "es": {
    "jobTitle": "Ingeniero en Computación y Desarrollador Full Stack",
    "resume": "Currículum",
    "downloadResume": "Descargar Currículum",
    "knowMore": "¡Conoce más!"
  }
}
</i18n>

<style lang="scss">
.home-page-hero {
  position: relative;
}

.home-page-hero__container {
  position: relative;

  &--with-top-margin {
    margin-top: 80px;
  }
}
</style>
