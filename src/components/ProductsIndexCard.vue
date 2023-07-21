<script setup lang="ts">
import type { ProductInterface } from '@/types';

interface Props {
  products: ProductInterface[]
}

const props = defineProps<Props>()

</script>

<template>
  <RouterLink v-for="product in props.products" v-bind:key="product.id"
    :to="{ name: 'products-show', params: { slug: product.slug } }">
    <div>
      <p>{{ product.name }}</p>
      <p>{{ product.price }}</p>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
@import '../assets/css/components/productsIndexCard';
</style>
