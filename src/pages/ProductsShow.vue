<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import DialogBox from '@/components/DialogBox.vue';
import { useFetchProducts } from '@/composables';
import type { ProductInterface } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

interface State {
  deleteModal: boolean
}

const { params } = useRoute()
const state = reactive<State>({
  deleteModal: false
})
const { data, error, isLoading, fetchProducts } = useFetchProducts()
const handleClickDelete = async () => {
  fetchProducts({ method: 'delete', id: (data.value as ProductInterface)._id })
  state.deleteModal = false
  error.value ?? router.push({ name: 'products-index' })
}
const toggleDialog = () => {
  state.deleteModal = !state.deleteModal
}

watchEffect(() => {
  fetchProducts({ slug: Array.isArray(params.slug) ? params.slug[0] : params.slug })
})
</script>

<template>
  <template v-if="!error">
    <LoadingSpinner v-if="isLoading" />
    <div v-else class="container-xl p-1">
      <div class="d-flex gap-2 align-items-center mb-2">
        <RouterLink :to="{ name: 'products-index' }" active-class="" class="btn btn-outline-secondary">
          <span class="material-symbols-outlined">
            arrow_back
          </span>
        </RouterLink>
        <h1 class="text-primary">{{ (data as ProductInterface).name }}</h1>
      </div>
      <p>{{ (data as ProductInterface).price }}</p>
      <div>
        <RouterLink :to="{ name: 'products-create', params: { slug: (data as ProductInterface).slug } }"
          class="btn btn-primary">
          Modifier
        </RouterLink>
        <button type="button" class="btn btn-outline-error" @click="toggleDialog">Supprimer</button>
        <DialogBox :show="state.deleteModal" :title="'Confirmer'" @close-dialog="toggleDialog">
          <template v-slot:message>
            <p>Supprimer le produit ?</p>
          </template>
          <template v-slot:success>
            <button class="btn btn-error" @click="handleClickDelete">Oui</button>
          </template>
        </DialogBox>
      </div>
    </div>
  </template>
  <p class="text-error" v-else>{{ error }}</p>
</template>