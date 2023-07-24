<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, watchEffect } from 'vue'
import ProductsIndexHeader from '@/components/ProductsIndexHeader.vue';
import ProductsIndexFilters from '@/components/ProductsIndexFilters.vue';
import Loading from '../components/ProductsIndexGridLoading.vue';
import { generateProducts } from '../seed/products'
import type { ProductInterface } from '@/types';
import type { FiltersInterface } from '@/types/FiltersInterface';

interface State { products: ProductInterface[], filters: FiltersInterface }

const ProductsIndexGrid = defineAsyncComponent({
  loader: () => import('../components/ProductsIndexGrid.vue'),
  loadingComponent: Loading
})

const state = reactive<State>({
  products: [],
  filters: {
    search: '',
    sort: 'nameAsc',
    minPrice: 1,
    maxPrice: 100
  }
})
const filteredProducts = computed(() => state.products.filter(e => e.name.match(state.filters.search) && e.price >= state.filters.minPrice && e.price <= state.filters.maxPrice))
const reset = () => { state.filters.search = '' }

watchEffect(() => state.products = generateProducts())
</script>

<template>
  <div class="container-xl">
    <ProductsIndexHeader @reset="reset" v-model="state.filters.search" />
    <ProductsIndexFilters v-model:min-price="state.filters.minPrice" v-model:max-price="state.filters.maxPrice"
      v-model:sort="state.filters.sort" />
    <ProductsIndexGrid :products="filteredProducts" />
  </div>
</template>