<script setup lang="ts">
import type { ProductInterface } from '@/types';

interface Props {
  product: ProductInterface
}

defineProps<Props>()

</script>

<template>
  <div>
    <RouterLink :to="{ name: 'products-show', params: { slug: product.slug } }">
      <p>{{ product.name }}</p>
      <p>{{ product.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/components/productsIndexCard';
</style>
