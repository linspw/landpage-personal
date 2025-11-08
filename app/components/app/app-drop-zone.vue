<template>
  <div
    class="app-drop-zone flex cursor-pointer items-center justify-center rounded-2xl border border-dashed p-3 text-center text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    :class="[
      color === 'primary'
        ? 'border-primary/40 text-primary'
        : 'border-secondary/40 text-secondary',
      isDragActive ? 'app-drop-zone--is-drag-active border-primary bg-primary/10 text-primary' : 'bg-white/80 hover:border-primary/60 hover:bg-primary/5',
    ]"
    v-bind="getRootProps()"
  >
    <input v-bind="getInputProps()" />

    <div class="flex flex-col items-center gap-1">
      <i class="fas fa-cloud-arrow-up text-lg" aria-hidden="true" />
      <p>Solte os arquivos aqui ou clique para selecionar.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDropzone } from 'vue3-dropzone'

const emit = defineEmits(['drop-files'])

defineProps({
  color: {
    type: String,
    default: 'secondary',
  },
})

function onDrop(files: File[] | null) {
  emit('drop-files', files)
}

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
</script>

<style scoped>
.app-drop-zone {
  min-height: 60px;
}

.app-drop-zone--is-drag-active * {
  pointer-events: none;
}
</style>
