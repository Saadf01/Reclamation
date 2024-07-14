<template>
    <div id="section" ref="section" :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="title_section">
            <button class="section-toggle" @click="ToggleSection">
                <span class="material-icons">arrow_right</span>
                <h2>Pièce Jointes</h2>
            </button>
        </div>

        <div class="donnees" :style="{ display: is_expanded ? 'block' : 'none' }">
            <p><strong>Référence :</strong> 029202393</p>
            <p><strong>Référence :</strong> 029202393</p>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded") === "false")

const ToggleSection = () => {
    is_expanded.value = !is_expanded.value
    localStorage.setItem("is_expanded", is_expanded.value.toString())
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
    margin-bottom: 2rem;
    

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
        display: none; /* Masquer par défaut */
        padding: 1rem 1rem;
        transition: display 0.2s ease-out;

        p {
            margin-bottom: 5px;
            font-size: 0.9rem;
            
            strong {
                font-weight: bold;
                margin-right: 10px; /* Espace entre "Référence" et le numéro */
            }
        }
    }

    &.is-expanded {
        max-height: 50rem;

        .donnees {
            display: block; /* Afficher quand agrandi */
        }

        .material-icons {
            transform: rotate(90deg);
        }
    }
}
</style>
