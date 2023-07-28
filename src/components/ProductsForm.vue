<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from "zod";
import { useProducts } from '@/composables';
import LoadingSpinner from './LoadingSpinner.vue';
import type { ProductInterface } from '@/types';

interface State {
  product: ProductInterface | null
  errors: string[]
  isLoading: boolean
}

const validationSchema = toTypedSchema(z.object({
  name: z.string({ invalid_type_error: 'Le doit doit être une chaîne de caractères', required_error: 'Veuillez saisir un nom' })
    .min(3, 'Le nom doit comporter au moins 3 caractères')
    .max(100, 'Le nom ne doit pas dépasser 100 caractères'),
  price: z.number({ invalid_type_error: 'Veuillez saisir un nombre', required_error: 'Veuillez saisir un prix' }).min(1, 'veuillez saisir un nombre'),
}))

const state = reactive<State>({
  product: null,
  errors: [],
  isLoading: false
})
const { getProduct, postProduct, patchProduct } = useProducts()
const { params } = useRoute()
const { errors, handleSubmit, isSubmitting, setFieldError } = useForm({ validationSchema });
const { value: nameValue } = useField('name')
const { value: priceValue } = useField('price')

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = state.product ? await patchProduct(state.product._id, values) : await postProduct(values)
    if (res._id) {
      return router.push({ name: 'products-show', params: { slug: res.slug } })
    } else {
      res.errors.name ? setFieldError('name', res.errors.name.message) : null;
      res.errors.price ? setFieldError('price', res.errors.price.message) : null;
    }
  } catch (e) { console.error(e) }
})

onBeforeMount(async () => {
  if (params.slug) {
    try {
      state.isLoading = true
      const res = await getProduct(params.slug.toString())
      if (res._id) {
        state.product = res
        nameValue.value = state.product?.name
        priceValue.value = state.product?.price
      } else if (res.message) {
        state.errors.push(res.message)
      } else {
        console.log(res)
      }
    } catch (e) {
      console.log(e)
    } finally {
      state.isLoading = false
    }
  }
})
</script>

<template>
  <template v-if="!state.errors.length">
    <LoadingSpinner v-if="state.isLoading"></LoadingSpinner>
    <form v-else>
      <div>
        <label for="name">Nom du produit</label>
        <input type="text" name="name" id="name" v-model="nameValue" :class="{ 'is-not-valid': errors.name }"
          autocomplete="off" autofocus>
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>
      <div>
        <label for="price">Prix</label>
        <input type="number" name="price" id="price" v-model="priceValue" :class="{ 'is-not-valid': errors.price }"
          autocomplete="off">
        <span class="error" v-if="errors.price">{{ errors.price }}</span>
      </div>
      <div>
        <button type="submit" @click="onSubmit" :class="{ 'disabled': isSubmitting }" :disabled="isSubmitting">{{
          isSubmitting ?
          'Envoi ...' : state.product?._id ? 'Modifier' : 'Ajouter'
        }}</button>
      </div>
    </form>
  </template>
  <template v-else>
    <p v-for="error in state.errors" :key="error">{{ error }}</p>
  </template>
</template>

<style scoped lang="scss">
@import '../assets/css/media-queries';
@import '../assets/css/variables';
@import '../assets/css/components/productsForm.scss';
</style>