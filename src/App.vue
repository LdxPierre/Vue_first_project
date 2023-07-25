<script setup lang="ts">
import TheFooter from './components/TheFooter.vue';
import TheHeader from './components/TheHeader.vue';
</script>

<template>
    <div class="d-flex flex-column min-vh-100">
        <TheHeader />
        <main class="flex-grow">
            <Suspense>
                <RouterView />
            </Suspense>
        </main>
        <TheFooter />
    </div>
</template>

<style lang="scss">
@import './assets/css/styles.scss';
</style>
