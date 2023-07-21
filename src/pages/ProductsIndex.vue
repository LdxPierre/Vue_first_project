<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import ProductsIndexGrid from '@/components/ProductsIndexGrid.vue';
import { generateProducts } from '../seed/products'
import type { ProductInterface } from '@/types';

const products = ref<ProductInterface[]>([])
const search = ref('')
const filteredProducts = ref<ProductInterface[]>([])
const reset = () => { search.value = '' }
watchEffect(() => products.value = generateProducts())
watch(search, (newValue) => filteredProducts.value = products.value.filter(e => e.name.match(newValue)))
</script>

<template>
  <div class="container-xl p-1">
    <div class="top-bar">
      <h1>Produits</h1>
      <div class="button-group">
        <button type="button" v-show="search" @click="reset" class="btn btn-outline-error">
          <span class="material-symbols-outlined">
            close
          </span>
        </button>
        <input type="text" name="search" id="search" class="form-input" placeholder="Rechercher" v-model="search">
        <RouterLink :to="{ name: 'products-create' }" class="btn btn-secondary">Nouveau</RouterLink>
      </div>
    </div>
    <ProductsIndexGrid :products="products" :search="search" :filtered-products="filteredProducts" />
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/components/productsList.scss';
</style>
