<!-- eslint-disable -->
<template>
    <div id="section" ref="section" :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="title_section">
            <button class="section-toggle" @click="ToggleSection">
                <span class="material-icons">arrow_right</span>
                <h2>Données Générales</h2>
            </button>
        </div>

        <div class="donnees">
            <p><strong>ID réclamation :</strong> 029202393</p>
            <p><strong>Réclamant :</strong> 029202393</p>
            <p><strong>Objet :</strong> 029202393</p>
            <p><strong>Responsable :</strong> 029202393</p>
            <p><strong>Identification relai réclamation :</strong> 029202393</p>
            <p><strong>Référence Bureau d'ordre :</strong> 029202393</p>
            <p><strong>Date de réception :</strong> 029202393</p>
            <p><strong>Date de déclaration :</strong> 029202393</p>
            <p><strong>Description :</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            <p><strong>Dispostions particulières :</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            <p><strong>Commentaire :</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>

        </div>
        
    </div>
</template>

<script setup>

import { ref } from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded") === "false")

const ToggleSection = () => {
    is_expanded.value = !is_expanded.value
    localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

<style lang="scss" scoped>

#section {
    background-color: white;
    border-top: 4px solid rgb(0, 147, 215);
    border-radius: 5px;
    width: 100%;
    transition: 0.3s ease-in-out;
    max-height: calc(0rem + 32px);
    position: relative; /* Assurez-vous que les sections sont positionnées de manière relative ou statique */
    z-index: 1; /* Augmentez le z-index si nécessaire pour s'assurer que les sections sont au-dessus des éléments précédents */

    .title_section {
        background-color: rgb(229, 229, 229);

        .section-toggle {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 0.3rem 1rem;
            transition: 0.2s ease-in-out;

            .material-icons {
                font-size: 2rem;
                transition: 0.2s ease-out;
            }

            &:hover {
                h2,
                .material-icons {
                    color: var(--primary);
                }
            }

            &:focus {
                outline: none;
            }

            h2 {
                font-size: 1.1rem;
                font-family: 'Poppins', sans-serif;
                margin-left: 0.2rem;
                transition: 0.2s ease-out;
            }
        }
    }

    .donnees {
        opacity: 0;
        transition: opacity 0.2s ease-out;
        padding: 1rem 1rem;

        p {
            margin-bottom: 10px;
            font-size: 0.9rem;
            font-family: 'Poppins', sans-serif;
            
            strong {
                font-weight: bold;
                margin-right: 10px; /* Espace entre "Référence" et le numéro */
                font-family: 'Poppins', sans-serif;
            }
        }
        
        

    }

    &.is-expanded{
        max-height: 50rem;

        .donnees {
            opacity: 1;
        }

        .material-icons {
            transform: rotate(90deg);
        }
    }
}


</style>