<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

const timeout = ref<null | number | undefined>(null)
const show = ref<boolean>(false)

timeout.value = setTimeout(() => {
  show.value = true
}, 200)

onUnmounted(() => {
  timeout.value && clearTimeout(timeout.value)
})
</script>

<template>
  <div v-if="show" class="products-grid">
    <div v-for="n in 10" v-bind:key="n" class="card-loading">
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/media-queries';
@import '../assets/css/components/productsIndexGrid';
</style>
