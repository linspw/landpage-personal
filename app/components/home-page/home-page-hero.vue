<template>
  <section class="home-page-hero relative flex min-h-[90vh] items-center justify-center overflow-hidden">
    <BackgroundWave />

    <UContainer
      class="hero-content relative z-10 flex w-full flex-col items-center gap-8 py-20 text-center mt-24 lg:mt-0"
    >
      <p class="intro-label text-xs font-semibold uppercase tracking-[0.4em] text-primary">
        {{ t('intro') }}
      </p>

      <h1 class="max-w-3xl text-4xl font-black leading-tight text-secondary md:text-5xl">
        {{ t('title') }}
      </h1>

      <p class="max-w-2xl text-lg text-secondary/75 md:text-xl">
        {{ t('description') }}
      </p>

      <div class="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <UButton
          to="/projects"
          color="primary"
          size="lg"
          icon="i-heroicons-arrow-top-right-on-square-16-solid"
          trailing
          class="cta-primary"
        >
          {{ t('primaryCta') }}
        </UButton>

        <UButton
          to="/about-me"
          color="neutral"
          variant="soft"
          size="lg"
          icon="i-heroicons-user-circle-16-solid"
          class="cta-secondary"
        >
          {{ t('secondaryCta') }}
        </UButton>
      </div>

      <div class="hero-cards grid w-full gap-5 md:grid-cols-3">
        <article
          v-for="(card, index) in cards"
          :key="card.title"
          class="hero-card group rounded-3xl border border-slate-200/80 bg-white/90 p-6 text-left backdrop-blur-sm"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <NuxtLink
            :to="card.to"
            class="flex flex-col gap-4 text-secondary no-underline"
          >
            <div class="flex items-center justify-between gap-2">
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                {{ card.label }}
              </p>
              <i class="fas fa-arrow-right text-sm text-primary/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
            </div>

            <h3 class="text-2xl font-bold text-secondary">
              {{ card.title }}
            </h3>

            <p class="text-base text-secondary/70">
              {{ card.description }}
            </p>
          </NuxtLink>
        </article>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local',
})

const cards = computed(() => [
  {
    label: t('cards.blog.label'),
    title: t('cards.blog.title'),
    description: t('cards.blog.description'),
    to: '/blog',
  },
  {
    label: t('cards.about.label'),
    title: t('cards.about.title'),
    description: t('cards.about.description'),
    to: '/about-me',
  },
  {
    label: t('cards.projects.label'),
    title: t('cards.projects.title'),
    description: t('cards.projects.description'),
    to: '/projects',
  },
])
</script>

<i18n lang="json">
{
  "pt-BR": {
    "intro": "Bem-vindo",
    "title": "Construindo experiências digitais notáveis",
    "description": "Sou Jessé Correia, engenheiro de software apaixonado por criar produtos que unem design cuidadoso e soluções escaláveis.",
    "primaryCta": "Ver projetos",
    "secondaryCta": "Sobre mim",
    "cards": {
      "blog": {
        "label": "Insights",
        "title": "Blog",
        "description": "Pensamentos sobre tecnologia, carreira e comunidade."
      },
      "about": {
        "label": "Perfil",
        "title": "Sobre mim",
        "description": "Conheça minha trajetória profissional e habilidades."
      },
      "projects": {
        "label": "Portfólio",
        "title": "Projetos",
        "description": "Explore o que venho construindo e as tecnologias usadas."
      }
    }
  },
  "en": {
    "intro": "Welcome",
    "title": "Building remarkable digital experiences",
    "description": "I'm Jessé Correia, a software engineer passionate about crafting products that combine thoughtful design with scalable solutions.",
    "primaryCta": "View projects",
    "secondaryCta": "About me",
    "cards": {
      "blog": {
        "label": "Insights",
        "title": "Blog",
        "description": "Thoughts on technology, career, and community."
      },
      "about": {
        "label": "Profile",
        "title": "About me",
        "description": "Learn about my professional journey and skillset."
      },
      "projects": {
        "label": "Portfolio",
        "title": "Projects",
        "description": "Discover what I've been building and the tech behind it."
      }
    }
  },
  "es": {
    "intro": "Bienvenido",
    "title": "Construyendo experiencias digitales notables",
    "description": "Soy Jessé Correia, un ingeniero de software apasionado por crear productos que combinan diseño cuidadoso con soluciones escalables.",
    "primaryCta": "Ver proyectos",
    "secondaryCta": "Sobre mí",
    "cards": {
      "blog": {
        "label": "Ideas",
        "title": "Blog",
        "description": "Reflexiones sobre tecnología, carrera y comunidad."
      },
      "about": {
        "label": "Perfil",
        "title": "Sobre mí",
        "description": "Conoce mi trayectoria profesional y habilidades."
      },
      "projects": {
        "label": "Portafolio",
        "title": "Proyectos",
        "description": "Descubre lo que he estado creando y las tecnologías utilizadas."
      }
    }
  }
}
</i18n>

<style scoped>
.home-page-hero {
  position: relative;
}

.hero-content {
  position: relative;
}

.intro-label {
  letter-spacing: 0.4em;
}

.hero-cards {
  position: relative;
  isolation: isolate;
}

.hero-card {
  box-shadow: 
    0 4px 16px -4px rgba(0, 0, 0, 0.06),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
  animation: cardFadeUp 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  opacity: 0;
}

.hero-card:hover {
  transform: translateY(-6px);
  box-shadow: 
    0 16px 32px -8px rgba(0, 0, 0, 0.1),
    0 6px 12px -3px rgba(0, 0, 0, 0.04);
  border-color: rgba(1, 83, 255, 0.2);
}

@keyframes cardFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cta-primary {
  box-shadow: 0 4px 14px -3px rgba(1, 83, 255, 0.35);
  transition: all 0.3s ease;
}

.cta-primary:hover {
  box-shadow: 0 6px 20px -4px rgba(1, 83, 255, 0.45);
  transform: translateY(-2px);
}

.cta-secondary {
  transition: all 0.3s ease;
}

.cta-secondary:hover {
  transform: translateY(-2px);
}
</style>

