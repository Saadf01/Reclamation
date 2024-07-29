<!-- eslint-disable -->
<template>
    <div id="section" ref="section" :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="title_section">
            <button class="section-toggle" @click="ToggleSection">
                <span class="material-icons">arrow_right</span>
                <h2>Dispatching</h2>
            </button>
        </div>

        <div class="donnees">
            <p><strong>Dispatching :</strong> 029202393</p>
            <p><strong>Date de réponse souhaitée :</strong> 029202393</p>
            <p><strong>Nom de l'opération :</strong> 029202393</p>
            <p><strong>Ville concernée :</strong> 029202393</p>
        </div>
        
    </div>
    <transition name="fade">
        <div v-if="showDispatchSection" class="blue-borders">
          <h2>Dispatching</h2>
          <div class="rec-detail">
            <div class="input-box">
              <label for="disp" class="detail">Dispatching</label>
              <select id="disp">
                <option value="sao">SAO</option>
                <option value="hao">HAO</option>
              </select>
            </div>
            <div class="input-box">
              <label for="filial" class="detail">Filiale</label>
              <select id="filial">
                <option value="Anciennes">Réclamations les plus anciennes</option>
              </select>
            </div>
            <div class="input-box">
              <label for="source" class="detail">Agence</label>
              <input type="text" id="source" name="source">
            </div>
            <div class="input-box">
              <label for="date-rep" class="detail">Date réponse souhaitée</label>
              <input type="date" id="date-rep" name="date-rep">
            </div>
          </div>
        </div>
      </transition>
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