<script setup lang="ts">
import { computed, reactive } from 'vue'
import ProductsIndexHeader from '@/components/ProductsIndexHeader.vue';
import ProductsIndexFilters from '@/components/ProductsIndexFilters.vue';
import ProductsIndexGrid from '@/components/ProductsIndexGrid.vue';
import ProductsIndexGridLoading from '@/components/ProductsIndexGridLoading.vue';
import type { ProductInterface } from '@/types';
import type { FiltersInterface } from '@/types/FiltersInterface';

interface State { products: ProductInterface[], filters: FiltersInterface, error: string }

const state = reactive<State>({
  products: [],
  filters: {
    search: '',
    sort: 'nameAsc',
    minPrice: 1,
    maxPrice: 5000
  },
  error: ''
})
const filteredProducts = computed(() => state.products?.filter(e => e.name.match(state.filters.search) && e.price >= state.filters.minPrice && e.price <= state.filters.maxPrice))
const reset = () => { state.filters.search = '' }
const setProducts = (products: ProductInterface[]) => {
  state.products = products
}
const setError = (value: string) => { state.error = value }
</script>

<template>
  <div class="container-xl">
    <ProductsIndexHeader @reset="reset" v-model="state.filters.search" />
    <ProductsIndexFilters v-model:min-price="state.filters.minPrice" v-model:max-price="state.filters.maxPrice"
      v-model:sort="state.filters.sort" />
    <template v-if="!state.error">
      <Suspense>
        <ProductsIndexGrid :products="filteredProducts" @set-products="setProducts" @setError="setError" />
        <template #fallback>
          <ProductsIndexGridLoading />
        </template>
      </Suspense>
    </template>
    <p v-if="state.error">{{ state.error }}</p>
  </div>
</template>