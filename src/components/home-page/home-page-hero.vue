<template>
  <div class="home-page-hero d-flex align-md-center justify-center">
    <background-wave />

    <v-container
      class="home-page-hero__container d-flex flex-column align-center justify-center"
      :class="{
        'home-page-hero__container--with-top-margin': !$display.mdAndUp.value,
      }"
    >
      <h1 class="text-h3 font-weight-bold text-center mb-4">
        Welcome to My personal Website!
      </h1>

      <p class="text-subtitle-1 text-center mb-6">
        My name is <strong>Jessé Correia</strong>. I'm a software engineer crafting innovative solutions.
      </p>

      <v-btn
        color="primary"
        to="/projects"
        rounded="xl"
        size="large"
        aria-label="View Jessé Correia's projects"
      >
        View My Projects
      </v-btn>

      <v-row class="mt-8">
        <v-col cols="12" md="4">
          <v-card class="home-page__options-card pa-2" to="/blog">
            <v-card-title>Blog</v-card-title>
            <v-card-text>
              Explore my thoughts and insights on technology and software development.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="home-page__options-card pa-2" to="/about-me">
            <v-card-title>About Me</v-card-title>
            <v-card-text>
              Learn more about my journey, skills, and experience as a software engineer.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="home-page__options-card pa-2" to="/projects">
            <v-card-title>Projects</v-card-title>
            <v-card-text>
              Discover the innovative projects I've worked on and the technologies I've used.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const $display = useDisplay()


</script>

<i18n lang="json">
{
  "pt-BR": {

  },
  "en": {

  },
  "es": {

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

.home-page__options-card {
  transition: 0.3s;
}
.home-page__options-card:hover {
  transform: scale(1.03);
}
</style>
