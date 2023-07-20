<script setup lang="ts">
import { generateProducts } from '@/seed/products';
import { computed } from 'vue';
const product = computed(() => generateProducts(1)[0])
</script>

<template>
  <div class="container-xl p-1">
    <div class="d-flex gap-2 align-items-center mb-2">
      <RouterLink :to="{ name: 'products-index' }" active-class="" class="btn btn-outline-secondary rounded-circle">
        <span class="material-symbols-outlined">
          arrow_back
        </span>
      </RouterLink>
      <h1 class="text-primary">{{ product.name }}</h1>
    </div>
  </div>
</template>