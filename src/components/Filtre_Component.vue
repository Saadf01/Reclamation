<template>
  <div>
    <!-- Conteneur Principal -->
    <div class="filters-container">
      <!-- Filtre Société -->
      <div class="filter-section">
        <div class="filter-label">
          <span class="material-icons">apartment</span>
          <label>Société</label>
        </div>
        <div class="filter-trigger">
          <span>Sélectionner les choix</span>
          <div class="filter-options">
            <label class="checkbox-label" v-for="societe in societes" :key="societe.id">
              <input 
                type="checkbox" 
                :value="societe.id" 
                v-model="filters.societe">
              {{ societe.nom }}
            </label>
          </div>
        </div>
      </div>

      <!-- Filtre Domaine -->
      <div class="filter-section">
        <div class="filter-label">
          <span class="material-icons">category</span>
          <label>Domaine</label>
        </div>
        <div class="filter-trigger">
          <span>Sélectionner les choix</span>
          <div class="filter-options">
            <label class="checkbox-label" v-for="domaine in domaines" :key="domaine.id">
              <input 
                type="checkbox" 
                :value="domaine.id" 
                v-model="filters.domaine">
              {{ domaine.nom }}
            </label>
          </div>
        </div>
      </div>

      <!-- Filtre Source -->
      <div class="filter-section">
        <div class="filter-label">
          <span class="material-icons">source</span>
          <label>Source</label>
        </div>
        <div class="filter-trigger">
          <span>Sélectionner les choix</span>
          <div class="filter-options">
            <label class="checkbox-label" v-for="source in sources" :key="source.id">
              <input 
                type="checkbox" 
                :value="source.id" 
                v-model="filters.source">
              {{ source.nom }}
            </label>
          </div>
        </div>
      </div>

      <!-- Filtre Statut -->
      <div class="filter-section">
        <div class="filter-label">
          <span class="material-icons">description</span>
          <label>Statut</label>
        </div>
        <div class="filter-trigger">
          <span>Sélectionner les choix</span>
          <div class="filter-options">
            <label class="checkbox-label" v-for="status in statuses" :key="status.id">
              <input 
                type="checkbox" 
                :value="status.id" 
                v-model="filters.statut">
              {{ status.name }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtres de Date -->
      <div class="date-filters">

        <div class="date-filters-container">
          <!-- Filtre Type de Date -->
          <div class="filter-section">

            <div class="filter-label">
              <span class="material-icons">description</span>
              <label>Type de date</label>
            </div>

            <div class="filter-trigger">
              <span>Sélectionner un choix</span>
              <div class="filter-options">
                <label class="radio-label">
                  <input 
                    type="radio" 
                    value="Date de création" 
                    v-model="filters.date_type">
                  Date de création
                </label>
                <label class="radio-label">
                  <input 
                    type="radio" 
                    value="Date de déclaration" 
                    v-model="filters.date_type">
                  Date de déclaration
                </label>
                <label class="radio-label">
                  <input 
                    type="radio" 
                    value="Date de réception" 
                    v-model="filters.date_type">
                  Date de réception
                </label>
              </div>
            </div>
          </div>


        <!-- Filtre Date de Début -->
        <div class="filter-section">
          <div class="filter-label">
            <span class="material-icons">calendar_today</span>
            <label>Date de début</label>
          </div>
          <input type="date" v-model="filters.date_debut" class="date-input">
        </div>

        <!-- Filtre Date de Fin -->
        <div class="filter-section">
          <div class="filter-label">
            <span class="material-icons">calendar_today</span>
            <label>Date de fin</label>
          </div>
          <input type="date" v-model="filters.date_fin" class="date-input">
        </div>
      </div>
    </div>

    <!-- Affichage des Filtres Sélectionnés -->
    <div v-if="hasSelectedFilters" class="filters-selected">
      <div v-if="selectedFilters.societe.length" class="selected-filter-group">
        <span class="filter-group-label">Société:</span>
        <div class="selected-options">
          <span v-for="societe in selectedFilters.societe" :key="societe.id" class="selected-option">
            {{ societe.nom }}
            <span class="remove-option" @click="removeFilter('societe', societe.id)">
              <span class="material-icons">close</span>
            </span>
          </span>
        </div>
      </div>

      <div v-if="selectedFilters.domaine.length" class="selected-filter-group">
        <span class="filter-group-label">Domaine:</span>
        <div class="selected-options">
          <span v-for="domaine in selectedFilters.domaine" :key="domaine.id" class="selected-option">
            {{ domaine.nom }}
            <span class="remove-option" @click="removeFilter('domaine', domaine.id)">
              <span class="material-icons">close</span>
            </span>
          </span>
        </div>
      </div>

      <div v-if="selectedFilters.source.length" class="selected-filter-group">
        <span class="filter-group-label">Source:</span>
        <div class="selected-options">
          <span v-for="source in selectedFilters.source" :key="source.id" class="selected-option">
            {{ source.nom }}
            <span class="remove-option" @click="removeFilter('source', source.id)">
              <span class="material-icons">close</span>
            </span>
          </span>
        </div>
      </div>

      <div v-if="selectedFilters.statut.length" class="selected-filter-group">
        <span class="filter-group-label">Statut:</span>
        <div class="selected-options">
          <span v-for="statut in selectedFilters.statut" :key="statut.id" class="selected-option">
            {{ statut.name }}
            <span class="remove-option" @click="removeFilter('statut', statut.id)">
              <span class="material-icons">close</span>
            </span>
          </span>
        </div>
      </div>

      <!-- Ajouter les filtres de date sélectionnés -->
      <div v-if="filters.date_type" class="selected-filter-group">
        <span class="filter-group-label">Type de date:</span>
        <div class="selected-options">
          <span class="selected-option">{{ filters.date_type }}</span>
        </div>
      </div>

      <div v-if="filters.date_debut" class="selected-filter-group">
        <span class="filter-group-label">Date de début:</span>
        <div class="selected-options">
          <span class="selected-option">{{ filters.date_debut }}</span>
        </div>
      </div>

      <div v-if="filters.date_fin" class="selected-filter-group">
        <span class="filter-group-label">Date de fin:</span>
        <div class="selected-options">
          <span class="selected-option">{{ filters.date_fin }}</span>
        </div>
      </div>
    </div>


    <!-- Bouton Réinitialiser -->
    <div class="filter-foot">
      <button class="effacer" @click="resetFilters">Réinitialiser</button>
    </div>
  </div>
</template>



<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default {
  name: 'FiltreSidebar',
  setup() {
    const filters = ref({
      societe: [],
      domaine: [],
      source: [],
      statut: [],
      date_debut: '',
      date_fin: ''
    });

    const statuses = ref([]);
    const domaines = ref([]);
    const societes = ref([]);
    const sources = ref([]);

    const resetFilters = () => {
      filters.value = {
        societe: [],
        domaine: [],
        source: [],
        statut: [],
        date_debut: '',
        date_fin: ''
      };
    };

    const removeFilter = (type, id) => {
      filters.value[type] = filters.value[type].filter(value => value !== id);
    };

    const selectedFilters = computed(() => {
      return {
        societe: societes.value.filter(societe => filters.value.societe.includes(societe.id)),
        domaine: domaines.value.filter(domaine => filters.value.domaine.includes(domaine.id)),
        source: sources.value.filter(source => filters.value.source.includes(source.id)),
        statut: statuses.value.filter(status => filters.value.statut.includes(status.id))
      };
    });

    const hasSelectedFilters = computed(() => {
      return filters.value.societe.length > 0 || 
             filters.value.domaine.length > 0 || 
             filters.value.source.length > 0 || 
             filters.value.statut.length > 0 || 
             filters.value.date_debut || 
             filters.value.date_fin;
    });

    const fetchStatuses = async () => {
      try {
        const response = await axios.get('https://localhost:7148/api/statuts');
        statuses.value = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des statuts:", error);
      }
    };

    const fetchSocietes = async () => {
      try {
        const response = await axios.get('https://localhost:7148/api/societes');
        societes.value = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des societes:", error);
      }
    };

    const fetchDomaines = async () => {
      try {
        const response = await axios.get('https://localhost:7148/api/domaines');
        domaines.value = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des domaines:", error);
      }
    };

    const fetchSources = async () => {
      try {
        const response = await axios.get('https://localhost:7148/api/sources');
        sources.value = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des sources:", error);
      }
    };

    onMounted(() => {
      fetchStatuses();
      fetchSocietes();
      fetchDomaines();
      fetchSources();
    });

    return {
      filters,
      selectedFilters,
      hasSelectedFilters,
      resetFilters,
      removeFilter,
      statuses,
      societes,
      domaines,
      sources
    };
  }
};
</script>




<style lang="scss" scoped>
.filters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 5px;
  margin-bottom: 5px;
}

.filter-section {
  flex: 1 1 calc(25% - 1rem);
}

.filter-label {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  gap: 0.6rem;
}

.filter-label .material-icons {
  color: rgb(30, 72, 197);
  font-size: 20px;
}

.filter-label label {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
}

.filter-trigger {
  position: relative;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 7px;
  background: #ffffff;
  width: 100%;
}

.filter-trigger span {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #2b2b2bd6;
}

.filter-options {
  display: none;
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 100%;
  top: 100%;
  left: 0;
}

.filter-trigger:hover .filter-options,
.filter-trigger:focus-within .filter-options {
  display: block;
}

.checkbox-label {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
  font-size: 13px;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 0.5rem;
}

.date-filters {
  margin-top: 1rem;
}

.date-filters-container {
  display: flex; /* Aligner les champs de date horizontalement */
  gap: 1rem; /* Espacement entre les champs */
}

.date-filters-container .filter-section {
  flex: 1; /* Chaque champ occupe un espace égal */
}

.radio-label {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 13px;
  cursor: pointer;
}

.radio-label input[type="radio"] {
  margin-right: 0.5rem;
}

.date-input {
  width: 100%;
  border: 1px solid #ddd;
  padding: 0.43rem;
  font-family: 'Poppins', sans-serif;
  border-radius: 5px;
  color: #2b2b2bd6;
}

.date-input:hover {
  border-color: #000;
}

.filter-foot {
  display: flex;
  justify-content: right;
  padding: 1rem;
  gap: 5rem;
}

.effacer {
  padding: 0.5rem 1rem;
  border: 1px solid;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  background-color: #f44336;
  color: white;
}

.effacer:hover {
  color: #f44336;
  background-color: white;
  border: 1px solid #f44336;
}

.filters-selected {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.selected-filter-group {
  margin-bottom: 10px;
}

.filter-group-label {
  font-weight: bold;
  margin-right: 10px;
}

.selected-options {
  display: inline-block;
}

.selected-option {
  display: inline-block;
  background-color: #e0e0e0;
  border-radius: 4px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.remove-option .material-icons {
  cursor: pointer;
  margin-left: 5px;
  color: red;
  border-radius: 30px;
  padding: 3px 3px;
  font-size: 15px;
}

.remove-option .material-icons:hover {
  background-color: #9b9b9b;
}

</style>
