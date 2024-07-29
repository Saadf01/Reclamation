<!-- eslint-disable -->
<template>
    <div class="page-container">
        <div class="title">
            <h1>Réclamation</h1>
            <div class="action-buttons">
                <button class="modify-button">Modifier</button>
                <button class="dispatch-button" @click="showPopup = true">Dispatcher</button>
                <select class="status-dropdown">
                    <option value="" disabled selected>Choisissez un statut</option>
                    <option value="En cours de traitement">En cours de traitement</option>
                    <option value="En réexamen">En réexamen</option>
                    <option value="Cloturée">Cloturée</option>
                    <option value="Recours">Recours</option>
                    <option value="Médiation">Médiation</option>
                    <option value="Contentieux">Contentieux</option>
                    <option value="Erronée">Erronée</option>
                </select>
                <button class="validate-button">Valider le statut</button>
            </div>
        </div>

        <div class="info_reclamation">
            <p id="reclamation"><strong>Réclamation :</strong> 906976</p>
            <div class="statut-container">
                <strong>Statut :</strong>
                <div class="div-statut" :style="getStatutStyle('Cloturée')"><span>Cloturée</span></div>
            </div>
            <p id="description_statut"><strong>Description Statut :</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        </div>

        <div class="sections">
            <Section_Donnees_Generales></Section_Donnees_Generales>
            <Section_Dates_Statuts></Section_Dates_Statuts>
        </div>

        <div class="sections">
            <Section_Donnees_Organisation></Section_Donnees_Organisation>
            <Section_Donnees_Techniques></Section_Donnees_Techniques>
        </div>

        <div class="sections">
            <Section_Taches></Section_Taches>
        </div>

        <div class="sections">
            <Section_Pieces_Jointes></Section_Pieces_Jointes>
        </div>

        <div class="sections">
            <Section_Historique></Section_Historique>
        </div>

        <!-- Popup Component -->
        <Popup_Dispatching v-if="showPopup" @close="showPopup = false" />

    </div>
</template>

<script setup>

import { ref } from 'vue';
import Section_Donnees_Generales from '@/components/Section_Donnees_Generales.vue';
import Section_Dates_Statuts from '@/components/Section_Dates_Statuts.vue';
import Section_Donnees_Organisation from '@/components/Section_Donnees_Organisation.vue';
import Section_Donnees_Techniques from '@/components/Section_Donnees_Techniques.vue';
import Section_Pieces_Jointes from '@/components/Section_Pieces_Jointes.vue';
import Section_Taches from '@/components/Section_Taches.vue';
import Section_Historique from '@/components/Section_Historique.vue';
import Popup_Dispatching from '@/components/Popup_Dispatching.vue';

const showPopup = ref(false);

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
    return {
        backgroundColor,
    };
};
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
