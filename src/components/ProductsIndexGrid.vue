<script setup lang="ts">
import ProductsIndexCard from './ProductsIndexCard.vue';
import type { ProductInterface } from '@/types';

defineProps<{
  products: ProductInterface[],
}>()
</script>

<template>
  <div v-if="products.length" class="products-grid">
    <ProductsIndexCard v-for="product in products" v-bind:key="product._id" :product="product" />
  </div>
  <div v-else class="w-100 h-100 d-flex justify-content-center align-items-center">
    Aucun produit trouvé
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/media-queries';
@import '../assets/css/components/productsIndexGrid';
</style>