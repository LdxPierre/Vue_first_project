<script setup lang="ts">
import ProductsIndexCard from './ProductsIndexCard.vue';
import type { ProductInterface } from '@/types';

interface Props {
  products: ProductInterface[],
  filteredProducts?: ProductInterface[],
  search?: string,
}

const props = defineProps<Props>()

</script>

<template>
  <div v-if="(!props.search && props.products) || (props.search && props.filteredProducts?.length)" class="products-grid">
    <template v-if="props.search && props.filteredProducts?.length">
      <ProductsIndexCard :products="props.filteredProducts" />
    </template>
    <template v-else-if="!props.search && props.products">
      <ProductsIndexCard :products="props.products" />
    </template>
  </div>
  <div v-else class="w-100 h-100 d-flex justify-content-center align-items-center">
    Aucun produit trouvé
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/media-queries';
@import '../assets/css/components/productsIndexGrid.scss';
</style>