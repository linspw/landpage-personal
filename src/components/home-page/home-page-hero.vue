<template>
  <div class="home-page-hero d-flex align-md-center justify-center">
    <background-wave />

    <v-container
      class="d-flex flex-column flex-md-row align-center justify-center"
    >
      <v-avatar
        color="white"
        size="200"
        rounded="xl"
        class="elevation-24 mb-8 mb-md-0 animate__animated animate__fadeInTopLeft animate__slow"
      >
        <v-img cover src="/images/avatars/my-photo.jpg"></v-img>
      </v-avatar>

      <div
        class="d-flex flex-column justify-center align-center flex-md-1-1 px-14"
      >
        <AppTypingEffectAnimation
          text="Jessé Correia"
          tag="h1"
          class="text-h3 text-md-h1 font-weight-bold text-secondary mb-6 text-center"
          :duration="5"
          :remove-cursor-on-end="false"
        />

        <div
          class="text-h5 text-md-h3 text-primary d-flex align-center justify-center justify-md-start mb-12 font-weight-thin text-center"
        >
          {{ t('jobTitle') }}
        </div>

        <div class="d-flex flex-column flex-md-row justify-center gap-2">
          <v-btn-group
            color="secondary"
            rounded="xl"
            size="large"
            variant="text"
          >
            <v-btn rounded="0" href="https://github.com/linspw" target="_blank">
              <template #prepend><v-icon icon="fab fa-github" /></template>

              <template v-if="$display.mdAndUp.value">Github</template>
            </v-btn>

            <v-btn
              rounded="0"
              href="https://www.linkedin.com/in/jessecorreialive/"
              target="_blank"
            >
              <template #prepend><v-icon icon="fab fa-linkedin" /></template>

              <template v-if="$display.mdAndUp.value">LinkedIn</template>
            </v-btn>

            <v-btn
              rounded="0"
              href="/files/curriculo_2024_pt_br.pdf"
              target="_blank"
            >
              <template #prepend>
                <v-icon icon="fas fa-cloud-arrow-down" />
              </template>

              <template v-if="$display.mdAndUp.value">
                {{ t('resume') }}
              </template>

              <v-tooltip activator="parent" location="bottom">
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

const { t } = useI18n({
  useScope: 'local',
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
  min-height: calc(100dvh - 80px);

  & .v-container {
    position: relative;
  }
}
</style>
