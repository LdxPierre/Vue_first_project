<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from "zod";

const product = {
  name: undefined,
  price: undefined
}

const initialValues = {
  name: product.name,
  price: product.price
}

const validationSchema = toTypedSchema(z.object({
  name: z.string({ invalid_type_error: 'Le doit doit être une chaîne de caractères', required_error: 'Veuillez saisir un nom' }).min(3, 'Le nom doit comporter au moins 3 caractères').max(100, 'Le nom ne doit pas dépasser 100 caractères'),
  price: z.number({ invalid_type_error: 'Veuillez saisir un nombre', required_error: 'Veuillez saisir un prix' }).min(1, 'veuillez saisir un nombre'),
}))

const { errors, handleSubmit, isSubmitting } = useForm({ validationSchema, initialValues });
const { value: nameValue } = useField('name')
const { value: priceValue } = useField('price')

const onSubmit = handleSubmit(values => new Promise<void>((resolve) => {
  setTimeout(() => {
    resolve();
    console.log(values);
  }, 2000)
}))
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