<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref, watch, watchEffect } from 'vue'
import ProductsIndexHeader from '@/components/ProductsIndexHeader.vue';
import Loading from '../components/Loading.vue';
import type { ProductInterface } from '@/types';
import { generateProducts } from '../seed/products'

const ProductsIndexGrid = defineAsyncComponent({
  loader: () => import('../components/ProductsIndexGrid.vue'),
  loadingComponent: Loading
})

const state = reactive<{ products: ProductInterface[], search: string }>({
  products: [],
  search: '',
})
const filteredProducts = computed(() => state.products.filter(e => e.name.match(state.search)))
const reset = () => { state.search = '' }

watchEffect(() => state.products = generateProducts())
</script>

<template>
  <div class="container-xl">
    <ProductsIndexHeader @reset="reset" v-model="state.search" />
    <ProductsIndexGrid :products="state.search ? filteredProducts : state.products" :search="state.search" />
  </div>
</template>