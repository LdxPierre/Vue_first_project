<script setup lang="ts">
import { reactive, ref } from 'vue';

const state = reactive({ menuShow: false })
const menuRef = ref<null | HTMLElement>()
const toggleMenu = (e: Event) => {
    const target = e.target as HTMLElement
    e.stopPropagation();
    target != menuRef.value
        ? state.menuShow = !state.menuShow
        : null
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
            <div v-show="state.menuShow" class="calc" @click="toggleMenu">
                <Transition>
                    <div class="menu" v-show="state.menuShow" ref="menuRef">
                        <div class="menu-header">
                            <router-link :to="{ name: 'home-page' }" class="brand" active-class="">
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
                                <router-link :to="{ name: 'products-index' }"> Produits </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'brands-index' }">Marques</router-link>
                            </li>
                        </ul>
                    </div>
                </Transition>
            </div>
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