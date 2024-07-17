<template>
    <div id="section" ref="section" :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="title_section">
            <button class="section-toggle" @click="ToggleSection">
                <span class="material-icons">arrow_right</span>
                <h2>Historique</h2>
            </button>
        </div>

        <div class="donnees">
            <!-- Tableau des réclamations -->
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>ID Réclamation</th>
                        <th>Société</th>
                        <th>Responsable</th>
                        <th>Réclamant</th>
                        <th>Objet</th>
                        <th>Domaine</th>
                        <th>Opération</th>
                        <th>Date de changement de statut</th>
                        <th>Statut</th>
                        <th>Visualiser</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in filteredReclamations" :key="index">
                        <td>{{ item.id_reclamation }}</td>
                        <td>{{ item.societe }}</td>
                        <td>{{ item.responsable }}</td>
                        <td>{{ item.reclamant }}</td>
                        <td>{{ item.objet }}</td>
                        <td>{{ item.domaine }}</td>
                        <td>{{ item.operation }}</td>
                        <td>{{ item.date_changement_statut }}</td>
                        <td><span>{{ item.statut }}</span></td>
                        <td>
                            <div class="voir">
                                <span class="material-icons">visibility</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const is_expanded = ref(localStorage.getItem("is_expanded") === "false");

const filteredReclamations = ref([
    // Ajoutez vos données ici
    {
        id_reclamation: 1,
        societe: 'Société 1',
        responsable: 'Responsable 1',
        reclamant: 'Réclamant 1',
        objet: 'Objet 1',
        domaine: 'Domaine 1',
        operation: 'Opération 1',
        date_changement_statut: '2024-07-01',
        statut: 'Cloturée'
    },

]);

const ToggleSection = () => {
    is_expanded.value = !is_expanded.value;
    localStorage.setItem("is_expanded", is_expanded.value.toString());
};
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

            .voir {
                .material-icons {
                    color:rgb(65, 65, 65);
                    transition: 0.2s ease-out;
                    cursor: pointer;
                    border-radius: 10px;
                    padding: 0.5rem;
                }

                .material-icons:hover {
                    color: blue;
                    background-color: white;
                }
            }
        }
    }

    &.is-expanded {
        max-height: 50rem;

        .donnees {
            display: block; /* Afficher quand agrandi */
        }

        .section-toggle .material-icons {
            transform: rotate(90deg);
        }
    }
}

.statut.en-cours {
    color: orange;
}

.statut.terminee {
    color: green;
}
</style>
