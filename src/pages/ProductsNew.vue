<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { defineAsyncComponent } from 'vue';

const ProductsForm = defineAsyncComponent({
  loader: () => import('../components/ProductsForm.vue'),
  loadingComponent: LoadingSpinner
})
</script>

<template>
  <div class="container-xl p-1">
    <div class="d-flex align-items-center gap-2 mb-2">
      <RouterLink :to="{ name: 'products-index' }" active-class="" class="btn btn-outline-secondary rounded-circle">
        <span class="material-symbols-outlined">
          arrow_back
        </span>
      </RouterLink>
      <h1 class="text-primary">Nouveau produit</h1>
    </div>
    <ProductsForm />
  </div>
</template>