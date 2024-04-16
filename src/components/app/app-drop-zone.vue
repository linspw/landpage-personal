<template>
  <v-sheet
    class="app-drop-zone p-2 d-flex justify-center align-center text-center"
    :class="{
      'app-drop-zone--is-drag-active': isDragActive,
    }"
    :color="isDragActive ? 'primary' : color"
    v-bind="getRootProps()"
  >
    <input v-bind="getInputProps()" />

    <div class="d-flex flex-column align-center">
      <v-icon icon="fas fa-cloud-arrow-up" class="mb-1" />

      <p>Solte os arquivos aqui ou clique para selecionar.</p>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { useDropzone } from 'vue3-dropzone'

const $emit = defineEmits(['drop-files'])

defineProps({
  color: {
    type: String,
    default: 'secondary',
  },
})

function onDrop(files: File[] | null) {
  $emit('drop-files', files)
}

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
</script>

<style lang="scss">
.app-drop-zone {
  height: 60px;
  font-size: 12px;
  cursor: pointer;

  &--is-drag-active {
    & * {
      pointer-events: none;
    }
  }
}
</style>
