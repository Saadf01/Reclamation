<!-- eslint-disable -->
<template>
    <div class="page-container">
        <div class="title">
            <h1>Réclamation</h1>
        </div>

        <div class="info_reclamation">
            <p id="reclamation"><strong>Réclamation :</strong> 906976</p>
            <p id="statut"><strong>Statut :</strong> ....</p>
            <p id="solution"><strong>Solution :</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        </div>

        <div class="sections">
            <Section_Donnees_Generales></Section_Donnees_Generales>
        </div>

        <div class="sections">
            <Section_Dates_Statuts></Section_Dates_Statuts>
            <Section_Donnees_Techniques></Section_Donnees_Techniques>
        </div>

        <div class="sections">
            <Section_Donnees_Organisation></Section_Donnees_Organisation>
            <Section_Dispatching></Section_Dispatching>
        </div>

        <div class="sections">
            <Section_Taches></Section_Taches>
        </div>

        <div class="sections">
            <Section_Pieces_Jointes></Section_Pieces_Jointes>
        </div>

    </div>

    
</template>

<script setup>

import Section_Donnees_Generales from '@/components/Section_Donnees_Generales.vue'
import Section_Dates_Statuts from '@/components/Section_Dates_Statuts.vue';
import Section_Dispatching from '@/components/Section_Dispatching.vue'
import Section_Donnees_Organisation from '@/components/Section_Donnees_Organisation.vue'
import Section_Donnees_Techniques from '@/components/Section_Donnees_Techniques.vue'
import Section_Pieces_Jointes from '@/components/Section_Pieces_Jointes.vue'
import Section_Taches from '@/components/Section_Taches.vue'



</script>

<style lang="scss" scoped>

.page-container {
    background-color: #f0f0f0;
    height: 100%;
    padding: 0rem 2rem;

    .title {
        padding-top: 1rem;
        
        h1 {
            font-size: 1.5rem;
            font-family: 'Poppins', sans-serif;
        }
    }

    .info_reclamation {
        text-align: center;
        padding-bottom: 1.5rem;

        p {
            margin-bottom: 1.8rem;
            
            strong {
                font-weight: bold;
                margin-right: 17px; /* Espace entre "Référence" et le numéro */
            }
        }

        #reclamation {
            font-size: 2rem;
        }

        #statut {
            font-size: 1.4rem;
        }

        #solution {
            text-align: left;
        }

    }

    .sections {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 3rem;
        gap: 2rem;
        position: relative; /* Assurez-vous que les sections sont positionnées de manière relative ou statique */
        z-index: 1; /* Augmentez le z-index si nécessaire pour s'assurer que les sections sont au-dessus des éléments précédents */

    }
}


</style>