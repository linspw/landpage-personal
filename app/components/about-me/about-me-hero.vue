<template>
  <section class="about-me-page-hero relative flex items-center justify-center overflow-hidden">
    <BackgroundWave />

    <UContainer
      class="about-me-page-hero__container relative z-10 mt-24 flex flex-col items-center gap-10 py-24 md:mt-0 md:flex-row md:items-center"
    >
      <div class="avatar-wrapper">
        <div
          class="about-me-page-hero__avatar flex h-48 w-48 items-center justify-center rounded-[2rem] border-4 border-white bg-white md:h-56 md:w-56"
        >
          <AppImage
            cover
            src="/images/avatars/my-photo.jpg"
            alt="Jessé Correia profile picture"
            :height="224"
            :width="224"
            class="rounded-[1.5rem]"
          />
        </div>
      </div>

      <div class="flex w-full max-w-2xl flex-col items-center gap-6 px-4 text-center md:items-start md:px-10 md:text-left">
        <AppTypingEffectAnimation
          text="Jessé Correia"
          tag="h1"
          class="text-3xl font-black text-secondary md:text-5xl"
          :duration="5"
          :remove-cursor-on-end="false"
          restart-on-click
        />

        <p class="text-xl font-semibold text-primary md:text-2xl">
          {{ t('jobTitle') }}
        </p>

        <div class="text-secondary/75">
          <p class="text-base font-medium">
            🇧🇷 Brazilian and Portuguese 🇵🇹
          </p>
          <p class="text-sm">
            <a class="text-primary underline-offset-4 transition-opacity hover:opacity-70" href="mailto:linspw@live.com">linspw@live.com</a>
          </p>
        </div>

        <div class="flex w-full flex-col gap-3 md:flex-row">
          <div class="flex flex-1 flex-wrap items-center justify-center gap-3 md:justify-start">
            <UButton
              href="https://github.com/linspw"
              target="_blank"
              icon="i-fa-brands-github"
              variant="soft"
              color="neutral"
              aria-label="View Jessé Correia's Github profile"
              class="social-btn"
            >
              <span class="ml-2 hidden md:inline">Github</span>
            </UButton>

            <UButton
              href="https://www.linkedin.com/in/jessecorreialive/"
              target="_blank"
              icon="i-fa-brands-linkedin"
              variant="soft"
              color="primary"
              aria-label="View Jessé Correia's LinkedIn profile"
              class="social-btn"
            >
              <span class="ml-2 hidden md:inline">LinkedIn</span>
            </UButton>

            <UTooltip :text="downloadResumeText">
              <UButton
                :href="curriculumLink"
                target="_blank"
                external
                icon="i-heroicons-arrow-down-tray-20-solid"
                variant="soft"
                color="secondary"
                :aria-label="resumeLabel"
                class="social-btn"
              >
                <span class="ml-2 hidden md:inline">
                  {{ t('resume') }}
                </span>
              </UButton>
            </UTooltip>
          </div>

          <div class="flex flex-wrap justify-center gap-2 md:justify-start">
            <UButton href="#section-skills" external size="lg" color="primary" variant="solid">
              {{ $t('homeSections.skills.title') }}
            </UButton>
            <UButton href="#section-experiences" external size="lg" color="primary" variant="ghost">
              {{ $t('homeSections.experiences.title') }}
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n({
  useScope: 'local',
})

const downloadResumeText = computed(() => t('downloadResume', {}))
const resumeLabel = computed(() => t('resume', {}))

const curriculumLink = computed(() => {
  return locale.value === 'pt-BR'
    ? '/files/curriculum_pt_br.pdf'
    : '/files/curriculum_en.pdf'
})
</script>

<i18n lang="json">
{
  "pt-BR": {
    "jobTitle": "Engenheiro de Software Sênior",
    "resume": "Currículo",
    "downloadResume": "Baixar Currículo"
  },
  "en": {
    "jobTitle": "Senior Software Engineer",
    "resume": "Resume",
    "downloadResume": "Download Resume"
  },
  "es": {
    "jobTitle": "Ingeniero de Software Sénior",
    "resume": "Currículum",
    "downloadResume": "Descargar Currículum"
  }
}
</i18n>

<style lang="scss">
.about-me-page-hero {
  position: relative;
}

.about-me-page-hero__container {
  position: relative;
}

.avatar-wrapper {
  position: relative;
  animation: avatarFadeIn 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

.avatar-wrapper::before {
  content: '';
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  border-radius: 2.25rem;
  border: 2px solid rgba(1, 83, 255, 0.15);
  animation: ringPulse 3s ease-in-out infinite;
}

.about-me-page-hero__avatar {
  box-shadow: 
    0 8px 32px -8px rgba(0, 0, 0, 0.12),
    0 4px 12px -2px rgba(0, 0, 0, 0.06);
}

@keyframes avatarFadeIn {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes ringPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.6;
  }
}

.social-btn {
  transition: all 0.25s ease;
}

.social-btn:hover {
  transform: translateY(-2px);
}

</style>

