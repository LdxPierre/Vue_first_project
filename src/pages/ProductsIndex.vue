<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
import ProductsIndexHeader from '@/components/ProductsIndexHeader.vue';
import ProductsIndexFilters from '@/components/ProductsIndexFilters.vue';
import ProductsIndexGrid from '@/components/ProductsIndexGrid.vue';
import ProductsIndexGridLoading from '@/components/ProductsIndexGridLoading.vue';
import { useProducts } from '@/composables';
import type { FiltersInterface, ProductInterface } from '@/types';

interface State { filters: FiltersInterface, products: ProductInterface[], error: string, isLoading: boolean }

const state = reactive<State>({
  filters: {
    search: '',
    sort: 'nameAsc',
    minPrice: 1,
    maxPrice: 5000
  },
  products: [],
  error: '',
  isLoading: false
})
const { getProducts } = useProducts()

const filteredProducts = computed(() =>
  state.products.filter(e => e.name.match(state.filters.search) && e.price >= state.filters.minPrice && e.price <= state.filters.maxPrice)
)
const reset = () => { state.filters.search = '' }

watchEffect(async () => {
  try {
    state.isLoading = true
    const res = await getProducts()
    if (res.length) {
      state.products = res
    } else if (res.message) {
      state.error = res.message
    } else {
      console.log(res)
    }
  } catch (e) {
    console.log(e)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <div class="container-xl">
    <ProductsIndexHeader @reset="reset" v-model="state.filters.search" />
    <ProductsIndexFilters v-model:min-price="state.filters.minPrice" v-model:max-price="state.filters.maxPrice"
      v-model:sort="state.filters.sort" />
    <template v-if="!state.error">
      <ProductsIndexGridLoading v-if="state.isLoading" />
      <ProductsIndexGrid v-else :products="filteredProducts" />
    </template>
    <p class="text-error" v-else>{{ state.error }}</p>
  </div>
</template>