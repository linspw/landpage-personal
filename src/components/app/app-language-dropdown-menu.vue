<template>
  <v-menu activator="parent" @click.stop>
    <v-list rounded="lg">
      <v-list-item
        v-for="item in items"
        :key="item.code"
        :value="item.code"
        :active="locale == item.code"
        color="primary"
        @click="setLocale(item.code)"
      >
        <v-list-item-title>{{ item.code }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useI18n } from '#i18n'

const { locale, locales, setLocale } = useI18n()
const items = locales
</script>
