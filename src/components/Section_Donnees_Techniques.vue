<!-- eslint-disable -->
<template>
    <div id="section" ref="section" :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="title_section">
            <button class="section-toggle" @click="ToggleSection">
                <span class="material-icons">arrow_right</span>
                <h2>Données Techniques</h2>
            </button>
        </div>

        <div class="donnees">
            <p><strong>Domaine :</strong> {{ reclamation.domaine }}</p>
            <p><strong>Réception Bureau d'ordre :</strong> {{ reclamation.receptionBo }}</p>
            <p><strong>Source :</strong> {{ reclamation.source }}</p>
            <p><strong>Support :</strong> {{ reclamation.support }}</p>
            <p><strong>Type du réclamant :</strong> {{ reclamation.reclamantType }}</p>
        </div>
        
    </div>
     
</template>

<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { defineProps } from 'vue';

const props = defineProps({
  reclamationId: {
    type: [String, Number],
    required: true,
  },
});

const reclamation = ref({});

const fetchReclamation = async () => {
  try {
    const response = await axios.get(`https://localhost:7148/api/reclamations/${props.reclamationId}`);
    reclamation.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails:", error);
  }
};

onMounted(fetchReclamation);

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
    width: 50%;
    transition: 0.3s ease-in-out;
    max-height: calc(0rem + 32px);

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