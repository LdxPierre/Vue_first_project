<script setup lang="ts">
import { getProducts } from '@/helpers/http';
import ProductsIndexCard from './ProductsIndexCard.vue';
import type { ProductInterface } from '@/types';

defineProps<{
  products: ProductInterface[],
}>()
const emits = defineEmits<{
  (e: 'setProducts', products: ProductInterface[]): void,
  (e: 'setError', value: string): void
}>()

try {
  const response = await getProducts()
  emits('setProducts', response)
} catch (e) {
  emits('setError', 'Erreur lors du chargement initial des produits');
}
</script>

<template>
  <div v-if="products.length" class="products-grid">
    <ProductsIndexCard v-for="product in products" v-bind:key="product.id" :product="product" />
  </div>
  <div v-else class="w-100 h-100 d-flex justify-content-center align-items-center">
    Aucun produit trouvé
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/media-queries';
@import '../assets/css/components/productsIndexGrid';
</style>