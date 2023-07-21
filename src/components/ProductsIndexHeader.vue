<script setup lang="ts">
interface Props {
  modelValue: string,
}
interface Emits {
  (e: 'reset'): void,
  (e: 'update:modelValue', value: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="top-bar">
    <h1>Produits</h1>
    <div class="button-group">
      <button type="button" @click="$emit('reset')" class="btn btn-outline-error">
        <span class="material-symbols-outlined">
          close
        </span>
      </button>
      <input type="text" name="search" id="search" class="form-input" placeholder="Rechercher" :value="modelValue"
        @keyup="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)">
      <RouterLink :to="{ name: 'products-create' }" class="btn btn-secondary">Nouveau</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/media-queries';
@import '../assets/css/components/productsIndexHeader';
</style>