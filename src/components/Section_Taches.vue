<!-- eslint-disable -->
<template>
    <div id="section" ref="section" :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="title_section">
            <button class="section-toggle" @click="ToggleSection">
                <span class="material-icons">arrow_right</span>
                <h2>Tâches</h2>
            </button>
        </div>

        <div class="donnees">
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Désignation</th>
                        <th>Point de dispatching HAO</th>
                        <th>Point de dispatching SAO</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Salarié</th>
                        <th>Importance</th>
                        <th>Statut</th>
                        <th>Avancement</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tache in taches" :key="tache.id">
                        <td>{{ tache.titre }}</td>
                        <td>{{ tache.pointDispatchingHAO }}</td>
                        <td>{{ tache.pointDispatchingSAO }}</td>
                        <td>{{ tache.dateDebut }}</td>
                        <td>{{ tache.dateFin }}</td>
                        <td>{{ tache.nomResponsable }} {{ tache.prenomResponsable }}</td>
                        <td>{{ tache.importance }}</td>
                        <td>{{ tache.statut }}</td>
                        <td>{{ tache.avancement }}%</td>
                    </tr>
                </tbody>
            </table>
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
const taches = ref([]);

const fetchReclamation = async () => {
  try {
    const response = await axios.get(`https://localhost:7148/api/reclamations/${props.reclamationId}`);
    reclamation.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails:", error);
  }
};

const fetchTaches = async () => {
    try {
        const response = await axios.get(`https://localhost:7148/api/taches/by-reclamation/${props.reclamationId}`);
        taches.value = response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des taches:", error);
    }
};

onMounted(() => {
    fetchReclamation();
    fetchTaches();
});

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

        .styled-table {
            width: 100%;
            border-collapse: collapse;

            th, td {
                padding: 12px;
                border: 1px solid #ddd;
                text-align: left;
            }

            th {
                background-color: #f2f2f2;
            }

            tr:nth-child(even) {
                background-color: #f9f9f9;
            }

            tr:hover {
                background-color: #f1f1f1;
            }
        }
    }

    &.is-expanded {
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
