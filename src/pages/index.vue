<template>
  <div class="d-flex flex-column">
    <home-page-hero />

    <HomePageSkillsSection class="py-16" style="min-height: 100dvh" />

    <HomePageExperiencesSection class="py-16" style="min-height: 100dvh" />

    <home-page-contact-section class="py-16" />

    <app-navigation-buttons v-if="$display.mdAndUp.value" />
  </div>
</template>
<script setup lang="ts">
import { useDisplay } from 'vuetify'

const $display = useDisplay()
</script>
