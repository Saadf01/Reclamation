<template>
    <div class="app">
        <!-- Header -->
        <Header @toggle-sidebar="ToggleMenu" />

        <!-- Contenu principal avec Sidebar et router-view -->
        <div class="content">
            <!-- Sidebar -->
            <Sidebar id="sidebar"/>

            <!-- Contenu principal avec router-view -->
            <main>
                <router-view />
            </main>
        </div>
    </div>
</template>


<script setup>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import { ref } from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value
    localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

<style lang="scss">
:root {
    --primary: #4ade80;
    --primary-alt: #22c55e;
    --grey: #64748b;
    --dark: #1e293b;
    --dark-alt: #334155;
    --light: #f1f5f9;
    --sidebar-width: 300px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fira sans', sans-serif;
}

body {
    background: var(--light);
}

button {
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
}

.app {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .content {
        display: flex;
        flex: 1; /* Permet au contenu principal de prendre tout l'espace restant */
        margin-top: 3.7rem;

    }

    main {
        flex: 1; /* Contenu principal s'étend pour remplir l'espace restant */
        
        @media (max-width: 1024px) {
            padding-left: 4rem;
        }
    }
}
</style>
