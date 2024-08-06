<!-- eslint-disable -->
<template>
    <div class="page-container">
        <div class="title">
            <h1>Réclamation</h1>
            <div class="action-buttons">
                <button v-if="canEdit" class="modify-button">Modifier</button>
                <button v-if="canDispatch" class="dispatch-button" @click="showPopup = true">Dispatcher</button>
                <select v-if="canChangeStatus" class="status-dropdown" v-model="selectedStatus">
                    <option value="">Choisissez un statut</option>
                    <option v-for="status in availableStatuses" :key="status.id" :value="status.id">
                        {{ status.name }}
                    </option>
                </select>
                <button v-if="canChangeStatus" class="validate-button" @click="handleValidateStatus">Valider le statut</button>
            </div>
        </div>

        <div class="info_reclamation">
            <p id="reclamation"><strong>Réclamation :</strong> {{ reclamation.reference }}</p>
            <div class="statut-container">
                <strong>Statut :</strong>
                <div class="div-statut" :style="getStatutStyle(reclamation.statut)"><span>{{ reclamation.statut }}</span></div>
            </div>
            <p id="description_statut"><strong>Description Statut :</strong> {{ reclamation.motif }}</p>
        </div>

        <div class="sections">
            <Section_Donnees_Generales :reclamation-id="route.params.id" />
            <Section_Dates_Statuts :reclamation-id="route.params.id" />
        </div>

        <div class="sections">
            <Section_Donnees_Organisation :reclamation-id="route.params.id" />
            <Section_Donnees_Techniques :reclamation-id="route.params.id" />
        </div>

        <div class="sections">
            <Section_Taches :reclamation-id="route.params.id" />
        </div>

        <div class="sections">
            <Section_Pieces_Jointes :reclamation-id="route.params.id" />
        </div>

        <div class="sections">
            <Section_Historique :reclamation-id="route.params.id" />
        </div>

        <!-- Popup Components -->
        <Popup_Dispatching v-if="showPopup" @close="showPopup = false" />
        <Popup_Statut v-if="showPopupStatut" :selectedStatus="selectedStatus" :availableStatuses="availableStatuses" @close="showPopupStatut = false" 
        @confirm="handleConfirmChange" :reclamation-id="route.params.id" />    
        
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Section_Donnees_Generales from '@/components/Section_Donnees_Generales.vue';
import Section_Dates_Statuts from '@/components/Section_Dates_Statuts.vue';
import Section_Donnees_Organisation from '@/components/Section_Donnees_Organisation.vue';
import Section_Donnees_Techniques from '@/components/Section_Donnees_Techniques.vue';
import Section_Pieces_Jointes from '@/components/Section_Pieces_Jointes.vue';
import Section_Taches from '@/components/Section_Taches.vue';
import Section_Historique from '@/components/Section_Historique.vue';
import Popup_Dispatching from '@/components/Popup_Dispatching.vue';
import Popup_Statut from '@/components/Popup_Statut.vue';

const showPopup = ref(false);
const showPopupStatut = ref(false);
const selectedStatus = ref('');
const reclamation = ref({});
const statuses = ref([]);
const availableStatuses = ref([]);
const canEdit = ref(false);
const canChangeStatus = ref(false);
const canDispatch = ref(false);

const getStatutStyle = (statut) => {
    let backgroundColor = '';
    switch (statut) {
        case 'Cloturée':
        case 'Recours':
        case 'Médiation':
        case 'Contentieux':
            backgroundColor = 'green';
            break;
        case 'En cours de traitement':
        case 'Initiée':
        case 'En réexamen':
            backgroundColor = 'orange';
            break;
        case 'Erronée':
            backgroundColor = 'red';
            break;
        default:
            backgroundColor = 'white';
    }
    return { backgroundColor };
};

const route = useRoute();

const fetchReclamationDetails = async () => {
    const reclamationId = route.params.id;
    try {
        const response = await axios.get(`https://localhost:7148/api/reclamations/${reclamationId}`);
        if (response.data) {
            reclamation.value = response.data;
            updatePermissions(response.data.statut);
            updateAvailableStatuses(response.data.statut);
        } else {
            console.error("Données inattendues dans la réponse:", response);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des détails de la réclamation:", error);
    }
};

const fetchStatuses = async () => {
    try {
        const response = await axios.get('https://localhost:7148/api/statuts');
        statuses.value = response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des statuts:", error);
    }
};

const updatePermissions = (statut) => {
    switch (statut) {
        case 'Cloturée':
        case 'Médiation':
        case 'Recours':
        case 'Contentieux':
            canEdit.value = false;
            canChangeStatus.value = true;
            canDispatch.value = true;
            break;
        case 'En réexamen':
            canEdit.value = true;
            canChangeStatus.value = true;
            canDispatch.value = true;
            break;
        case 'Erronée':
            canEdit.value = false;
            canChangeStatus.value = false;
            canDispatch.value = false;
            break;
        default:
            canEdit.value = true;
            canChangeStatus.value = true;
            canDispatch.value = true;
            break;
    }
};

const updateAvailableStatuses = (currentStatus) => {
    switch (currentStatus) {
        case 'Cloturée':
        case 'Médiation':
        case 'Recours':
        case 'Contentieux':
            availableStatuses.value = [
                { id: 7, name: 'En réexamen' }
            ];
            break;
        case 'En réexamen':
            availableStatuses.value = [
                { id: 3, name: 'Cloturée' },
                { id: 4, name: 'Médiation' },
                { id: 5, name: 'Recours' },
                { id: 6, name: 'Contentieux' },
                { id: 8, name: 'Erronée' }
            ];
            break;
        case 'Erronée':
            availableStatuses.value = [];
            break;
        default:
            availableStatuses.value = [
                { id: 1, name: 'En cours de traitement' },
                { id: 3, name: 'Cloturée' },
                { id: 4, name: 'Médiation' },
                { id: 5, name: 'Recours' },
                { id: 6, name: 'Contentieux' },
                { id: 8, name: 'Erronée' }
            ];
            break;
    }
};

const handleValidateStatus = () => {
    if (selectedStatus.value) {
        showPopupStatut.value = true;
    } else {
        alert('Veuillez sélectionner un statut.');
    }
};

const handleConfirmChange = ({ status, motif }) => {
    reclamation.value.statut = statuses.value.find((s) => s.id === status).name;
    reclamation.value.motif = motif;
    fetchReclamationDetails(); // Rafraîchir les détails de la réclamation après confirmation
};

onMounted(() => {
    fetchReclamationDetails();
    fetchStatuses();
});
</script>


<style lang="scss" scoped>
.page-container {
    background-color: #f0f0f0;
    height: 100%;
    padding: 0rem 2rem;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;

        h1 {
            font-size: 1.5rem;
            font-family: 'Poppins', sans-serif;
        }

        .action-buttons {
            display: flex;
            align-items: center;
            gap: 1rem;

            button, select {
                font-family: 'Poppins', sans-serif;
                padding: 0.5rem 1rem;
                font-size: 1rem;
                cursor: pointer;
            }

            .modify-button {
                background-color: #ffcc00;
                border: none;
                color: white;
                border-radius: 5px;
                transition: 0.2s ease-in-out; 
            }

            .modify-button:hover {
                background-color: #ffcc009d;
            }

            .dispatch-button {
                background-color: #00ccff;
                border: none;
                color: white;
                border-radius: 5px;
                transition: 0.2s ease-in-out; 
            }

            .dispatch-button:hover {
                background-color: #00ccff95;
            }

            .status-dropdown {
                padding: 0.5rem;
                border: 1px solid #ddd;
                border-radius: 5px;
            }

            .validate-button {
                background-color: #00cc66;
                border: none;
                color: white;
                border-radius: 5px;
                transition: 0.2s ease-in-out; 
            }

            .validate-button:hover {
                background-color: #00cc669c;
            }
        }
    }

    .info_reclamation {
        text-align: center;
        padding-bottom: 1.5rem;
        margin-top: 4rem;

        p {
            margin-bottom: 1.8rem;
            font-family: 'Poppins', sans-serif;
            
            strong {
                font-weight: bold;
                margin-right: 17px;
                font-family: 'Poppins', sans-serif;
            }
        }

        .statut-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1.8rem;

            strong {
                font-family: 'Poppins', sans-serif;
                font-size: 1.5rem;
            }
        }

        .div-statut {
            padding: 0.7rem 1.5rem;
            color: white;
            border-radius: 30px;

            span {
                font-family: 'Poppins', sans-serif;
                font-size: 1.5rem;
            }
        }

        #reclamation {
            font-size: 2rem;
        }

        #statut {
            font-size: 1.4rem;
        }

        #description_statut {
            text-align: left;
            font-family: 'Poppins', sans-serif;
        }
    }

    .sections {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 3rem;
        gap: 2rem;
        position: relative;
        z-index: 1;
    }
}
</style>
