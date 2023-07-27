<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { deleteProduct, getProduct } from '@/helpers/http';
import DialogBox from '@/components/DialogBox.vue';
import type { ProductInterface } from '@/types';

interface State {
  product: ProductInterface,
  deleteModal: boolean
}

const { params } = useRoute()
const state = reactive<State>({
  product: { name: '', slug: '', _id: '', price: 0 },
  deleteModal: false
})
const handleClickDelete = async () => {
  try {
    await deleteProduct(state.product._id)
    router.push({ name: 'products-index' })
    state.deleteModal = !state.deleteModal
  } catch (e) {
    console.error(e)
  }
}
const toggleDialog = () => {
  state.deleteModal = !state.deleteModal
}
watchEffect(async () => state.product = await getProduct((params as { slug: string }).slug))
</script>

<template>
  <div class="container-xl p-1">
    <div class="d-flex gap-2 align-items-center mb-2">
      <RouterLink :to="{ name: 'products-index' }" active-class="" class="btn btn-outline-secondary">
        <span class="material-symbols-outlined">
          arrow_back
        </span>
      </RouterLink>
      <h1 class="text-primary">{{ state.product.name }}</h1>
    </div>
    <p>{{ state.product.price }}</p>
    <div>
      <RouterLink :to="{ name: 'products-create', params: { slug: state.product.slug } }" class="btn btn-primary">
        Modifier</RouterLink>
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