<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { generateProducts } from '../seed/products'
import type { ProductInterface } from '@/types';
const products = ref<ProductInterface[]>([])
const search = ref('')
const fiteredProducts = ref<ProductInterface[]>([])
watchEffect(() => products.value = generateProducts())
watch(search, (newValue) => fiteredProducts.value = products.value.filter(e => e.name.match(newValue)))
const reset = () => { search.value = '' }
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
    <div class="products-grid">
      <template v-if="search">
        <RouterLink v-for="product in fiteredProducts" v-bind:key="product.id"
          :to="{ name: 'products-show', params: { slug: product.slug } }">
          <div>
            <p>{{ product.name }}</p>
            <p>{{ product.price }}</p>
          </div>
        </RouterLink>
      </template>
      <template v-else>
        <RouterLink v-for="product in products" v-bind:key="product.id"
          :to="{ name: 'products-show', params: { slug: product.slug } }">
          <div>
            <p>{{ product.name }}</p>
            <p>{{ product.price }}</p>
          </div>
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/components/productsList.scss';
</style>
