<template>
    <div>
      <!-- Fond grisé pour la sidebar -->
      <div v-if="isVisible" class="overlay" @click="toggleSidebar"></div>
  
      <!-- Sidebar des filtres -->
      <div :class="['filter-sidebar', { 'filter-sidebar-hidden': !isVisible }]">
  
        <div class="filter-title">
          <h2>Tous les filtres</h2>
          <button class="close-button" @click="toggleSidebar"><span class="material-icons">close</span></button>
        </div>
  
        <div class="filter-sections">
          <!-- Sections de filtres -->
          <div class="filter-section">
            <div class="filter-label">
              <label>Société</label>
            </div>
            <div>
              <label class="checkbox-label" for="societe1">Société 1</label>
              <input type="checkbox" id="societe1" value="Societe 1" v-model="filters.societe">
            </div>
            <div>
              <label class="checkbox-label" for="societe2">Société 2</label>
              <input type="checkbox" id="societe2" value="Societe 2" v-model="filters.societe">
            </div>
          </div>
  
          <div class="filter-section">
            <div class="filter-label">
              <label>Domaine</label>
            </div>
            <div>
              <label class="checkbox-label" for="domaine1">Domaine 1</label>
              <input type="checkbox" id="domaine1" value="Domaine 1" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label" for="domaine2">Domaine 2</label>
              <input type="checkbox" id="domaine2" value="Domaine 2" v-model="filters.domaine">
            </div>
          </div>
  
          <div class="filter-section">
            <div class="filter-label">
              <label>Source</label>
            </div>
            <div>
              <label class="checkbox-label" for="source1">Source 1</label>
              <input type="checkbox" id="source1" value="Source 1" v-model="filters.source">
            </div>
            <div>
              <label class="checkbox-label" for="source2">Source 2</label>
              <input type="checkbox" id="source2" value="Source 2" v-model="filters.source">
            </div>
          </div>
  
          <div class="filter-section">
            <div class="filter-label">
              <label>Support</label>
            </div>
            <div>
              <label class="checkbox-label" for="support1">Support 1</label>
              <input type="checkbox" id="support1" value="Support 1" v-model="filters.support">
            </div>
            <div>
              <label class="checkbox-label" for="support2">Support 2</label>
              <input type="checkbox" id="support2" value="Support 2" v-model="filters.support">
            </div>
          </div>
  
          <div class="filter-section" id="last-section">
            <div class="filter-label">
              <label>Date de réception</label>
            </div>
            <input type="date" v-model="filters.date_reception">
          </div>
        </div>
  
        <div class="filter-foot">
          <button class="effacer" @click="resetFilters">Tout Effacer</button>
          <button class="enregistrer" @click="applyFilters">Enregistrer</button>
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FiltreSidebar',
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        filters: {
          societe: [],
          domaine: [],
          source: [],
          support: [],
          date_reception: ''
        }
      };
    },
    methods: {
      toggleSidebar() {
        this.$emit('toggle-sidebar');
      },
      resetFilters() {
        this.filters = {
          societe: [],
          domaine: [],
          source: [],
          support: [],
          date_reception: ''
        };
        this.$emit('reset-filters');
      },
      applyFilters() {
        this.$emit('apply-filters', this.filters);
        this.toggleSidebar();
      }
    }
  };
  </script>
  
  
  <style lang="scss" scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(67, 67, 67, 0.272);
    z-index: 1000;
    transition: 0.2s ease-in-out;
  }
  
  .filter-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 460px;
    height: 100%;
    background: white;
    box-shadow: -1px 0 5px rgba(127, 127, 127, 0.5);
    z-index: 1100;
    transition: 0.3s ease-in-out;
    overflow-y: auto;
  }
  
  .filter-sidebar-hidden {
    transform: translateX(100%);
    transition: 0.2s ease-in-out;
  }
  
  .filter-title {
    position: sticky; /* Rendre la barre de titre fixe */
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between; /* Pour aligner les éléments à l'extrémité */
    border-bottom: 1px solid #ddd;
    padding: 0.5rem 1rem;
    background-color: white; /* Assurer que la barre de titre a un fond */
    z-index: 1002; /* Assurer que la barre de titre est au-dessus du reste du contenu */
  }
  
  .close-button {
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    transition: 0.2s ease-out;
  }
  
  .close-button .material-icons {
    font-size: 1.5rem;
    color: #888;
  }
  
  .close-button:hover {
    background-color: #ececec;
    transition: 0.2s ease-in-out;
  }
  
  .filter-title h2 {
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
  }
  
  .filter-sections {
    padding: 1rem;
  }
  
  .filter-section {
    margin-bottom: 1rem;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
    transition: 0.2s ease-out;
  }

  #last-section {
    border: none;
  }
  
  .filter-label {
    margin-bottom: 1.5rem;
  }
  
  .filter-label label {
    font-family: 'Poppins', sans-serif;
  }
  
  .checkbox-label {
    display: inline-block;
    width: calc(100% - 24px); /* Largeur du label ajustée pour aligner les cases à droite */
    cursor: pointer;
  }
  
  .filter-section input[type="checkbox"] {
    cursor: pointer;
    transform: scale(1.7); /* Taille agrandie des cases à cocher */
    margin-left: 0.5rem;
    margin-right: -1.5rem; /* Ajustement pour aligner les cases à droite */
  }
  
  .filter-section input[type="checkbox"]:hover,
  .filter-section input[type="date"]:hover {
    border: 1px solid #000;
  }
  
  .filter-section input[type="date"] {
    cursor: pointer;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    font-family: 'Poppins', sans-serif;
    width: 100%;
  }
  
  .filter-section input[type="date"]:hover {
    border-color: #000;
  }
  
  .filter-section div {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .filter-foot {
    display: flex;
    justify-content: center;
    padding: 1rem;
    gap: 5rem;
    border-top: 1px solid #ddd;
  }
  
  .filter-foot .effacer {
    color: red;
    background-color: white;
    padding: 0.7rem 1rem;
    border-radius: 10px;
    font-size: 17px;
    font-family: 'Poppins', sans-serif;
    border: 1px solid red; /* Ajout de la bordure */
    transition: 0.2s ease-out;
  }
  
  .filter-foot .effacer:hover {
    background-color: #ebebeb;
  }
  
  .filter-foot .enregistrer {
    color: white;
    background-color: green;
    padding: 0.7rem 1rem;
    border-radius: 10px;
    font-size: 17px;
    font-family: 'Poppins', sans-serif;
    transition: 0.2s ease-out;
  }

  .filter-foot .enregistrer:hover {
    transition: 0.2s ease-out;
    background-color: rgba(0, 128, 0, 0.613);

  }
  </style>
  