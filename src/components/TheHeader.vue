<script setup lang="ts">
import { reactive, ref } from 'vue';

const state = reactive({ menuShow: false })
const menuRef = ref<null | HTMLElement>()
const toggleMenu = () => {
    state.menuShow = !state.menuShow
}
</script>

<template>
    <header>
        <nav class="container-xl">
            <button type="button" class="toggler toggler-menu" @click="toggleMenu">
                <span class="material-symbols-outlined">menu</span>
                Menu
            </button>
            <router-link :to="{ name: 'home-page' }" class="brand" active-class="">Projet Vue</router-link>
            <Teleport to="body">
                <div v-if="state.menuShow" class="calc" @click="toggleMenu"></div>
                <Transition>
                    <div class="menu" v-if="state.menuShow" ref="menuRef">
                        <div class="menu-header">
                            <router-link :to="{ name: 'home-page' }" class="brand" active-class="" @click="toggleMenu">
                                Projet Vue
                            </router-link>
                            <button type="button" class="toggler" @click="toggleMenu">
                                <span class="material-symbols-outlined">
                                    close
                                </span>
                            </button>
                        </div>
                        <ul class="link-list">
                            <li>
                                <router-link :to="{ name: 'products-index' }" @click="toggleMenu"> Produits </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'brands-index' }" @click="toggleMenu">Marques</router-link>
                            </li>
                        </ul>
                    </div>
                </Transition>
            </Teleport>
            <div class="menu-medium">
                <ul>
                    <li>
                        <router-link :to="{ name: 'products-index' }"> Produits </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'brands-index' }">Marques</router-link>
                    </li>
                </ul>
            </div>
            <button type="button" class="toggler">
                <span class="material-symbols-outlined">
                    account_circle
                </span>
                Profil
            </button>
        </nav>
    </header>
</template>

<style scoped lang="scss">
@import '../assets/css/variables';
@import '../assets/css/media-queries';
@import '../assets/css/components/header';
</style>