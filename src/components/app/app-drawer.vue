<template>
  <v-navigation-drawer v-model="drawer" temporary location="right">
    <v-list role="navigation">
      <v-list-subheader role="contentinfo">Menu</v-list-subheader>

      <v-list-item to="/">Home</v-list-item>

      <v-list-item to="/sobre-nos">Sobre nós</v-list-item>

      <v-list-item to="/contato">Contato</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const drawer = useVModel(props, 'modelValue', emit)
</script>
