<script setup lang="ts">
import { reactive } from 'vue';

defineProps<{
  minPrice: number,
  maxPrice: number,
  sort: string
}>()

defineEmits<{
  (e: 'update:minPrice'): void,
  (e: 'update:maxPrice'): void,
  (e: 'update:sort'): void
}>()

const state = reactive<{ filters: boolean }>({ filters: true })
</script>

<template>
  <div class="filters" :class="{ 'show': state.filters }">
    <div class="filters-header" @click="state.filters = !state.filters">
      <h6>Filtrer les résultats</h6>
      <span class="material-symbols-outlined">
        expand_more
      </span>
    </div>
    <div class="filters-body" ref="filtersRef">
      <div class="filter-item">
        <label for="sort">Trier</label>
        <select name="sort" id="sort" @change="$emit('update:sort', ($event.target as HTMLSelectElement).value)">
          <option value="nameAsc" selected>Nom Asc</option>
          <option value="nameDesc">Nom Desc</option>
          <option value="priceAsc">Prix Asc</option>
          <option value="priceDesc">Prix Desc</option>
        </select>
      </div>
      <div class="filter-item">
        <label for="price-min">Prix mini : {{ minPrice }}</label>
        <input type="range" name="price-min" id="price-min" class="range-min" min="1" max="5000" :value="minPrice"
          @input="$emit('update:minPrice', Number(($event.target as HTMLInputElement).value))">
      </div>
      <div class="filter-item">
        <label for="price-max">Prix max : {{ maxPrice }}</label>
        <input type="range" name="price-max" id="price-max" class="range-max" min="1" max="5000" :value="maxPrice"
          @input="$emit('update:maxPrice', Number(($event.target as HTMLInputElement).value))">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/media-queries';
@import '@/assets/css/variables';
@import '@/assets/css/components/productsIndexFilters.scss';
</style>