<template>
  <div class="products-grid">
    <div v-for="n in 10" v-bind:key="n" class="card-loading">
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/media-queries';
@import '../assets/css/components/productsIndexGrid';
</style>
