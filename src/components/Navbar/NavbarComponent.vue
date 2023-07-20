<script setup lang="ts">
import { reactive, ref } from 'vue';

const state = reactive({ menuShow: false })

const menuRef = ref<null | HTMLDivElement>(null)

// memory leak
let activeTO: ReturnType<typeof setTimeout>

const showMenu = () => {
    state.menuShow = true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearTimeout(activeTO)
    activeTO = setTimeout(() => {
        menuRef.value?.classList.remove('active')
    }, 1000)
}

const closeMenu = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    target.classList.contains('router-link-active') ? null : state.menuShow = false
}

const handleClickMenuToggler = () => {
    state.menuShow ? state.menuShow = false : showMenu()
}

</script>

<template>
    <header>
        <nav class="container-xl">
            <button type="button" class="toggler toggler-menu" @click="handleClickMenuToggler">
                <span class="material-symbols-outlined">menu</span>
                Menu
            </button>
            <router-link to="/" class="brand" active-class="">Projet Vue</router-link>
            <div class="menu" ref="menuRef" :class="{ 'show active': state.menuShow }">
                <div class="menu-header">
                    <router-link to="/" class="brand" active-class="" @click="closeMenu">
                        Projet Vue
                    </router-link>
                    <button type="button" class="toggler" @click="closeMenu">
                        <span class="material-symbols-outlined">
                            close
                        </span>
                    </button>
                </div>
                <ul class="link-list">
                    <li>
                        <router-link to="/products" @click="closeMenu"> Produits </router-link>
                    </li>
                    <li>
                        <router-link to="/brands" @click="closeMenu">Marques</router-link>
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

<style scoped>
@import '../../scss/navbar.scss';
</style>