<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useProducts } from '@/composables';
import DialogBox from '@/components/DialogBox.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import type { ProductInterface } from '@/types';

interface State {
  product: ProductInterface | null
  error: string[]
  deleteModal: boolean
  isLoading: boolean
}

const { params } = useRoute()
const state = reactive<State>({
  product: null,
  error: [],
  deleteModal: false,
  isLoading: false
})
const { getProduct, deleteProduct } = useProducts()
const handleClickDelete = async () => {
  state.error = []
  if (state.product) {
    const res = await deleteProduct(state.product._id)
    if (res.success) {
      router.push({ name: 'products-index' })
    } else {
      state.deleteModal = false
      state.error.push('Erreur lors de la suppression')
    }
  }
}
const toggleDialog = () => {
  state.deleteModal = !state.deleteModal
}

onBeforeMount(async () => {
  try {
    state.isLoading = true
    const res = await getProduct(params.slug.toString())
    if (res._id) {
      state.product = res
    } else if (res.message || res.errors) {
      res.errors && state.error.push(res.errors)
      res.message && state.error.push(res.message)
    } else {
      console.log(res)
    }
  } catch (e) {
    console.log(e);
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <LoadingSpinner v-if="state.isLoading" />
  <div v-else class="container-xl p-1">
    <div class="d-flex gap-2 align-items-center mb-2">
      <RouterLink :to="{ name: 'products-index' }" active-class="" class="btn btn-outline-secondary">
        <span class="material-symbols-outlined">
          arrow_back
        </span>
      </RouterLink>
      <h1 class="text-primary">{{ state.product?.name }}</h1>
    </div>
    <p>{{ state.product?.price }}</p>
    <div>
      <RouterLink :to="{ name: 'products-edit', params: { slug: state.product?.slug } }" class="btn btn-primary">
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
  <template v-if="state.error.length">
    <p v-for="error in state.error" :key="error">{{ error }}</p>
  </template>
</template>