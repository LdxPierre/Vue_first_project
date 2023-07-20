<script setup lang="ts">

</script>

<template>
    <header class="bg-primary">
        <nav class="container-xl d-flex align-items-center gap-5 px-1 py-2">
            <router-link to="/" class="fw-bold fs-5 text-light" active-class="">Projet Vue</router-link>
            <ul class="d-flex gap-2 flex-grow">
                <li>
                    <router-link to="/products" class="fw-bold p-2 text-light">Produits</router-link>
                </li>
                <li>
                    <router-link to="/brands" class="fw-bold p-2 text-light">Marques</router-link>
                </li>
            </ul>
            <ul class="d-flex gap-3">
                <li>
                    <span>Panier</span>
                </li>
                <li>
                    <span>Account</span>
                </li>
            </ul>
        </nav>
    </header>
</template>