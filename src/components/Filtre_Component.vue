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
            <label class="checkbox-label" v-for="societe in societes" :key="societe.id" :value="societe.id">
              <input type="checkbox" v-model="filters.societe">
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
            <label class="checkbox-label" v-for="domaine in domaines" :key="domaine.id" :value="domaine.id">
              <input type="checkbox" v-model="filters.domaine">
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
            <label class="checkbox-label" v-for="source in sources" :key="source.id" :value="source.id">
              <input type="checkbox" v-model="filters.source">
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
            <label class="checkbox-label" v-for="status in statuses" :key="status.id" :value="status.id">
              <input type="checkbox" v-model="filters.statut">
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
            <span>Sélectionner les choix</span>
            <div class="filter-options">
              <label class="checkbox-label">
                <input type="checkbox" value="Date de création">
                Date de création
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="Date de déclaration">
                Date de déclaration
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="Date de réception">
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

    <!-- Bouton Réinitialiser -->
    <div class="filter-foot">
      <button class="effacer" @click="resetFilters">Réinitialiser</button>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
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
      statuses,
      societes,
      domaines,
      sources,
      resetFilters
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
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .date-filters-container .filter-section {
    flex: 1 1 calc(33% - 1rem);
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

</style>
