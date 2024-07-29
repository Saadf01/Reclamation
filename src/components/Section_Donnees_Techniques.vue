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
            <p><strong>Référence :</strong> 029202393</p>
            <p><strong>Référence :</strong> 029202393</p>
        </div>
        
    </div>
     <!-- Section Données techniques -->
      
      


      <!-- Section traitement reclamation 
      <div class="blue-borders">
        <h2>Détail traitement réclamation</h2>
        <div class="rec-detail">
          <div class="input-box">
            <label for="disp" class="detail">Tâche</label>
            <input type="text" id="disp" v-model="formState.tache">
          </div>
          <div class="input-box">
            <label for="resp-tach" class="detail">Téléphone du responsable de la tâche</label>
            <input type="text" id="resp-tach" v-model="formState.telephoneResponsableTache">
          </div>
          <div class="input-box">
            <label for="hao" class="detail">Entite</label>
            <select id="hao" v-model="formState.centreTraitementhao" @change="clearSortBy">
              <option value="pid">PID</option>
            </select>
          </div>
          <div class="input-box">
            <label for="dao" class="detail">Centre de traitement DAO</label>
            <select id="dao" v-model="formState.centreTraitementdao" @change="clearSortBy">
              <option value="pid">PID</option>
            </select>
          </div>
          <div class="input-box">
            <label for="relai" class="detail">Numéro de relais réclamation</label>
            <input type="text" id="relai" v-model="formState.numeroRelais">
          </div>
        </div>
      </div>-->
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
            margin-bottom: 5px;
            font-size: 0.9rem;
            
            strong {
                font-weight: bold;
                margin-right: 10px; /* Espace entre "Référence" et le numéro */
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