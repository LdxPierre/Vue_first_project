<script setup lang="ts">
import NavbarComponent from './components/Navbar/NavbarComponent.vue';
import FooterComponent from './components/Footer/FooterComponent.vue';
</script>

<template>
    <div class="d-flex flex-column min-vh-100">
        <NavbarComponent />
        <main class="flex-grow">
            <RouterView />
        </main>
        <FooterComponent />
    </div>
</template>

<style>
@import './assets/css/styles.scss';
</style>
