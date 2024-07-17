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
                    <tr v-for="(task, index) in tasks" :key="index">
                        <td>{{ task.designation }}</td>
                        <td>{{ task.dispatchingHAO }}</td>
                        <td>{{ task.dispatchingSAO }}</td>
                        <td>{{ task.startDate }}</td>
                        <td>{{ task.endDate }}</td>
                        <td>{{ task.employee }}</td>
                        <td>{{ task.importance }}</td>
                        <td>{{ task.status }}</td>
                        <td>{{ task.progress }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded") === "false")

const tasks = ref([
    {
        designation: 'Tâche 1',
        dispatchingHAO: 'PIDS',
        dispatchingSAO: 'DCD',
        startDate: '2024-07-01',
        endDate: '2024-07-05',
        employee: 'Salarié 1',
        importance: 'Haute',
        status: 'En cours',
        progress: '50%'
    },
    {
        designation: 'Tâche 2',
        dispatchingHAO: 'IG',
        dispatchingSAO: 'SUPPORT',
        startDate: '2024-07-06',
        endDate: '2024-07-10',
        employee: 'Salarié 2',
        importance: 'Moyenne',
        status: 'Terminée',
        progress: '100%'
    }
    // Ajoutez d'autres tâches si nécessaire
])

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
