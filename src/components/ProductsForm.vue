<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from "zod";
import { createProduct, getProduct } from '@/helpers/http';
import router from '@/router';

const product = {
  name: undefined,
  price: undefined
}

const initialValues = {
  name: product.name,
  price: product.price
}

const nameIsValid = async (name: string) => {
  return (await getProduct(name).then(result => result)) ? false : true
}

const validationSchema = toTypedSchema(z.object({
  name: z.string({ invalid_type_error: 'Le doit doit être une chaîne de caractères', required_error: 'Veuillez saisir un nom' })
    .min(3, 'Le nom doit comporter au moins 3 caractères')
    .max(100, 'Le nom ne doit pas dépasser 100 caractères')
    .refine(async (name) => await nameIsValid(name), 'Un produit du même nom existe déjà'),
  price: z.number({ invalid_type_error: 'Veuillez saisir un nombre', required_error: 'Veuillez saisir un prix' }).min(1, 'veuillez saisir un nombre'),
}))

const { errors, handleSubmit, isSubmitting, setFieldError } = useForm({ validationSchema, initialValues });
const { value: nameValue } = useField('name')
const { value: priceValue } = useField('price')

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await createProduct(values)
    if (res._id) {
      return router.push({ name: 'products-show', params: { slug: res.slug } })
    } else {
      res.errors.name ? setFieldError('name', res.errors.name.message) : null;
      res.errors.price ? setFieldError('price', res.errors.price.message) : null;
    }
  } catch (e) { console.error(e) }
})
</script>

<template>
  <form>
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
        'Envoi ...' : initialValues.name ? 'Modifier' : 'Ajouter'
      }}</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import '../assets/css/media-queries';
@import '../assets/css/variables';
@import '../assets/css/components/productsForm.scss';
</style>