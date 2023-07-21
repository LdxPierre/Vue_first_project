<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import ProductsIndexHeader from '@/components/ProductsIndexHeader.vue';
import ProductsIndexGrid from '@/components/ProductsIndexGrid.vue';
import type { ProductInterface } from '@/types';
import { generateProducts } from '../seed/products'

const products = ref<ProductInterface[]>([])
const search = ref('')
const filteredProducts = ref<ProductInterface[]>([])
const reset = () => { search.value = '' }

watchEffect(() => products.value = generateProducts())
watch(search, (newValue) => filteredProducts.value = products.value.filter(e => e.name.match(newValue)))
</script>

<template>
  <div class="container-xl p-1">
    <ProductsIndexHeader @reset="reset" v-model="search" />
    <ProductsIndexGrid :products="search ? filteredProducts : products" :search="search" />
  </div>
</template>