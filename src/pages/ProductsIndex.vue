<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
import ProductsIndexHeader from '@/components/ProductsIndexHeader.vue';
import ProductsIndexFilters from '@/components/ProductsIndexFilters.vue';
import ProductsIndexGrid from '@/components/ProductsIndexGrid.vue';
import ProductsIndexGridLoading from '@/components/ProductsIndexGridLoading.vue';
import { useFetchProducts } from '@/composables';
import type { FiltersInterface, ProductInterface } from '@/types';

interface State { filters: FiltersInterface }

const state = reactive<State>({
  filters: {
    search: '',
    sort: 'nameAsc',
    minPrice: 1,
    maxPrice: 5000
  },
})
const { data, error, isLoading, fetchProducts } = useFetchProducts()

const filteredProducts = computed(() =>
  (data.value as ProductInterface[]).filter(e => e.name.match(state.filters.search) && e.price >= state.filters.minPrice && e.price <= state.filters.maxPrice)
)
const reset = () => { state.filters.search = '' }

watchEffect(() => fetchProducts({}))
</script>

<template>
  <div class="container-xl">
    <ProductsIndexHeader @reset="reset" v-model="state.filters.search" />
    <ProductsIndexFilters v-model:min-price="state.filters.minPrice" v-model:max-price="state.filters.maxPrice"
      v-model:sort="state.filters.sort" />
    <template v-if="!error">
      <ProductsIndexGridLoading v-if="isLoading" />
      <ProductsIndexGrid v-else :products="filteredProducts" />
    </template>
    <p class="text-error" v-else>{{ error }}</p>
  </div>
</template>