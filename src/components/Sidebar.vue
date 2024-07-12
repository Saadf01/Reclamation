<!-- eslint-disable -->
<template>
    <div>
        <aside ref="sidebar" :class="`${is_expanded ? 'is-expanded' : ''}`">
            <div class="logo">
                <img src="../assets/logo.png" alt="Vue" /> 
            </div>

            <div class="menu-toggle-wrap">
                <button class="menu-toggle" @click="ToggleMenu">
                    <span class="material-icons">menu</span>
                </button>
            </div>

            <h3>Menu</h3>
            <div class="menu">
                <router-link to="/" class="button">
                    <span class="material-icons">home</span>
                    <span class="text">Accueil</span>
                </router-link>
                <router-link to="/ListeReclamations" class="button">
                    <span class="material-icons">visibility</span>
                    <span class="text">Liste des réclamations</span>
                </router-link>
                <router-link to="/CreerReclamation" class="button">
                    <span class="material-icons">edit_square</span>
                    <span class="text">Créer une réclamation</span>
                </router-link>
            </div>
        </aside>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value
    localStorage.setItem("is_expanded", is_expanded.value)
}

const handleClickOutside = (event) => {
    const sidebar = document.querySelector('aside')
    if (sidebar && !sidebar.contains(event.target)) {
        is_expanded.value = false
        localStorage.setItem("is_expanded", is_expanded.value)
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>

aside {
    margin-top: 3.6rem;
    flex-direction: column;
    background-color: var(--dark);
    color: var(--light);
    width: calc(2rem + 32px);
    overflow: hidden;
    min-height: 100vh;
    padding: 1rem;
    transition: 0.2s ease-in-out;
    user-select: none;

    .logo {
        margin-bottom: 1rem;

        img {
            width: 2rem;
        }
    }

    .menu-toggle-wrap {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
        position: relative;
        top: 0;
        transition: 0.2s ease-in-out;

        .menu-toggle {
            transition: 0.2s ease-in-out;
            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-out;
            }

            &:hover {
                .material-icons {
                    color: var(--primary);
                }
            }

            &:focus {
                outline: none;
            }
        }
    }

    h3, .button .text {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    h3 {
        color: var(--grey);
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    .menu {
        margin: 0 -1rem;

        .button {
            display: flex;
            align-items: center;
            text-decoration: none;
            transition: 0.2s ease-in-out;
            padding: 0.5rem 1rem;

            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-in-out;
            }

            .text {
                color: var(--light);
                transition: 0.2s ease-in-out;
                white-space: nowrap; /* Prevent text wrapping */
            }

            &:hover {
                background-color: var(--dark-alt);

                .material-icons, .text {
                    color: var(--primary);
                }
            }

            &.router-link-exact-active {
                background-color: var(--dark-alt);
                border-right: 5px solid var(--primary);

                .material-icons, .text {
                    color: var(--primary);
                }
            }

            &:focus {
                outline: none;
            }
        }
    }
    &.is-expanded {
        width: var(--sidebar-width);

        .menu-toggle-wrap {
            top: -3rem;
        }

        h3, .button .text {
            opacity: 1;
        }

        .button {
            .material-icons {
                margin-right: 1rem;
            }
        }
    }

    @media (max-width: 1024px) {
        position: absolute;
        z-index: 99;
    }
}
</style>
