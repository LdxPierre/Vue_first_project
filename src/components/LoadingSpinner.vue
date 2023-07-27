<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

const timeout = ref<number | undefined>(undefined)
const showSpinner = ref(false)
timeout.value = setTimeout(() => {
  showSpinner.value = true
}, 200)
onUnmounted(() => clearTimeout(timeout.value))
</script>

<template>
  <div v-if="showSpinner" class="h-100 d-flex justify-content-center align-items-center">
    <span class="material-symbols-outlined spinner">
      progress_activity
    </span>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/utils/loading';
</style>