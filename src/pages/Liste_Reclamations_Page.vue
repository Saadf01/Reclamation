<template>
  <div :class="['page-container', { 'sidebar-open': isFilterSidebarVisible }]">
    <div class="title">
      <h1>Liste des réclamations</h1>
    </div>

    <div class="blue-border">
      <h2>Rechercher une réclamation</h2>

      <!-- Barre de recherche -->
       <div class="search-div">
        <input v-model="searchQuery" type="text" placeholder="Rechercher..." class="search-bar">
       </div>

      <div class="filter">
        <!-- Composant Filtre -->
        <FiltreComponent :isVisible="isFilterSidebarVisible" @reset-filters="resetFilters" @apply-filters="applyFilters" />
      </div>

      <!-- Tableau des réclamations -->
      <table class="styled-table">
        <thead>
          <tr>
            <th @click="sortTable('reference')">Réference <span class="material-icons">{{ getSortIcon('reference') }}</span></th>
            <th @click="sortTable('societe')">Société <span class="material-icons">{{ getSortIcon('societe') }}</span></th>
            <th @click="sortTable('responsable')">Responsable <span class="material-icons">{{ getSortIcon('responsable') }}</span></th>
            <th @click="sortTable('reclamant')">Réclamant <span class="material-icons">{{ getSortIcon('reclamant') }}</span></th>
            <th @click="sortTable('objet')">Objet <span class="material-icons">{{ getSortIcon('objet') }}</span></th>
            <th @click="sortTable('domaine')">Domaine <span class="material-icons">{{ getSortIcon('domaine') }}</span></th>
            <th @click="sortTable('source')">Source <span class="material-icons">{{ getSortIcon('source') }}</span></th>
            <th @click="sortTable('date_creation')">Date de création <span class="material-icons">{{ getSortIcon('date_creation') }}</span></th>
            <th @click="sortTable('date_reception')">Date de réception <span class="material-icons">{{ getSortIcon('date_reception') }}</span></th>
            <th @click="sortTable('date_declaration')">Date de déclaration <span class="material-icons">{{ getSortIcon('date_declaration') }}</span></th>
            <th @click="sortTable('statut')">Statut <span class="material-icons">{{ getSortIcon('statut') }}</span></th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reclamation in reclamations" :key="reclamation.id">
            <td>{{ reclamation.reference }}</td>
            <td>{{ reclamation.societe }}</td>
            <td>{{ reclamation.responsableNom }} {{ reclamation.responsablePrenom }}</td>
            <td>{{ reclamation.reclamantNom }} {{ reclamation.reclamantPrenom }}</td>
            <td>{{ reclamation.objet }}</td>
            <td>{{ reclamation.domaine }}</td>
            <td>{{ reclamation.source }}</td>
            <td>{{ reclamation.dateCreation }}</td>
            <td>{{ reclamation.dateReception }}</td>
            <td>{{ reclamation.dateDeclaration }}</td>
            <td><div :class="['statut', getStatusClass(reclamation.statut)]"><span>{{ reclamation.statut }}</span></div></td>
            <td>

              <div class="action-menu" @mouseleave="closeDropdown">

                <button class="action-menu-button" @click="toggleDropdown">
                  <span class="action">Action</span>
                  <span class="material-icons">arrow_drop_down</span>
                </button>

                <ul v-if="dropdownOpen" class="dropdown">
                  <li>
                    <router-link :to="`/VisualiserReclamation/${reclamation.id}`" class="button">
                      <span class="text">Visualiser</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/`" class="button">
                      <span class="text">Modifier</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/`" class="button">
                      <span class="text">Dispatcher</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/`" class="button">
                      <span class="text">Tâches</span>
                    </router-link>
                  </li>
                </ul>

              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Contrôles de pagination -->
      <div class="pagination">
        <button class="previous-button" @click="prevPage" :disabled="currentPage === 1">Précédent</button>
        <div class="page-buttons">
          <button
            v-for="page in getPageButtons"
            :key="page"
            @click="setPage(page)"
            :class="{ active: page === currentPage }"
          >
            {{ page }}
          </button>
        </div>
        <button class="next-button" @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
        <div class="items-per-page-selector">
          <span>Afficher</span>
          <select v-model="itemsPerPage" @change="updateItemsPerPage">
            <option v-for="option in [10, 15, 20, 25, 30]" :key="option" :value="option">{{ option }}</option>
          </select>
          <span>réclamations par page</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FiltreComponent from '@/components/Filtre_Component.vue';
import axios from 'axios';

export default {
  name: 'Liste_Reclamations_Page',
  components: {
    FiltreComponent
  },
  data() {
    return {
      sortBy: 'reference',
      sortDirection: 'asc',
      isFilterSidebarVisible: false,
      dropdownOpen: false,
      searchQuery: '',
      filters: {
        societe: [],
        domaine: [],
        source: [],
        statut: [],
        date_reception_start: '',
        date_reception_end: '',
        date_declaration_start: '',
        date_declaration_end: ''
      },
      reclamations: [],
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  mounted() {
    this.fetchReclamations();
  },
  methods: {
    fetchReclamations() {
      axios.get('https://localhost:7148/api/reclamations')
        .then(response => {
          if (response.data && response.data.data) {
            this.reclamations = response.data.data;
            console.log("Réclamations récupérées:", this.reclamations);
          } else {
            console.error("Données inattendues dans la réponse:", response);
          }
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des réclamations:", error);
        });
    },
    sortTable(column) {
      if (this.sortBy === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = column;
        this.sortDirection = 'asc';
      }
    },
    getSortIcon(column) {
      if (this.sortBy === column) {
        return this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
      }
      return 'arrow_upward'; // Icône par défaut
    },
    resetFilters() {
      this.filters = {
        societe: [],
        domaine: [],
        source: [],
        statut: [],
        date_reception_start: '',
        date_reception_end: '',
        date_declaration_start: '',
        date_declaration_end: ''
      };
      this.searchQuery = '';
      this.fetchReclamations(); // Recharger les réclamations après réinitialisation des filtres
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
    getStatusClass(statut) {
      switch(statut) {
        case 'En cours de traitement':
        case 'Initiée':
        case 'En réexamen':
          return 'status-in-progress';
        case 'Cloturée':
        case 'Recours':
        case 'Médiation':
        case 'Contentieux':
          return 'status-closed';
        case 'Erronée':
          return 'status-error';
        default:
          return '';
      }
    },
  }
};
</script>


<style lang="scss" scoped>
.page-container {
  background-color: #f0f0f0;
  min-height: 100vh;
  padding: 0rem 2rem;
  overflow-y: auto;
  z-index: 1101;
}

.title {
  padding-top: 1rem;
}

.title h1 {
  font-size: 1.5rem;
  font-family: 'Poppins', sans-serif;
}

.blue-border {
  border-top: 4px solid rgb(0, 147, 215);
  margin-top: 1rem;
  background-color: white;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 3rem;
}

.blue-border h2 {
  font-size: 1.15rem;
  font-family: 'Poppins', sans-serif;
  padding: 0.2rem 1rem;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 13px;
  font-family: 'Poppins', sans-serif;
}

.styled-table thead tr {
  background-color: #ffffff;
  text-align: left;
  user-select: none;
}

.styled-table th {
  font-weight: bold;
  padding: 0.625rem;
  border: 1px solid #ddd;
  font-size: 14px;
  cursor: pointer;
}


.styled-table th .material-icons {
  vertical-align: middle;
  font-size: 14px;
}

.styled-table td {
  padding: 0.625rem;
  border: 1px solid #ddd;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}

.filters-container {
  border: 1px solid;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  margin-top: 2rem;
  display: flex;
  gap: 0.7rem;
  border-radius: 10px;
  border-color: rgb(195, 195, 195);
  align-items: center;
  width: 8rem;

  .filters-text {
    color: black;
    font-family: 'Poppins', sans-serif;
    font-size: 1.1rem;
  }

}

.search-bar {
  width: 30rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
  margin-left: 0.3rem;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.page-container.sidebar-open {
  position: fixed;
  width: 94.5%;
}

.statut {
  border-radius: 9px;
  padding: 0.5rem;
  color: white;
  max-width: 13rem;
}

.status-in-progress {
  background-color: orange;
}

.status-error {
  background-color: red;
}

.status-closed {
  background-color: green;
}

.action-menu {
  margin-left: auto;
  position: relative;
}

.action-menu-button {
  background-color: rgb(0, 131, 212);
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
  width: 100%;
  transition: 0.2s ease-in-out; /* Transition pour le fond */
}

.action-menu-button:hover {
  background-color: rgba(0, 131, 212, 0.659);
}

.action-menu-button .action {
  margin-right: 0.5rem;
}

.action-menu-button .material-icons {
  margin-left: auto; /* Place l'icône à droite du bouton */
  transition: transform 0.3s ease; /* Transition pour la rotation */
}

.dropdown {
  position: absolute;
  z-index: 1150;
  top: 100%;
  right: 0;
  list-style: none;
  background-color: white;
  padding: 0;
  margin: 0;
  width: 100%;
  border: 1px solid rgb(175, 175, 175);
  display: none; /* Par défaut, le menu est caché */
}

.action-menu:hover .dropdown {
  display: block;
}


.dropdown li a {
  text-decoration: none;
  color: black;
  display: block;
  padding: 0.7rem;
}

.dropdown li a:hover {
  background-color: rgb(0, 131, 212);;
  color: white;
  transition: 0.2s ease-in-out;
}

.pagination {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: left;
}

.page-buttons {
  display: flex;
}

.page-buttons button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  width: 2.8rem;
  height: 2.8rem;
}

.page-buttons button.active {
  background-color: #004187;
}

.page-buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 10px 3px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover {
  background-color: #007bffc1;
}

.pagination .next-button,
.pagination .previous-button {
  height: 2.8rem;
  padding: 0rem 1rem;
}

.items-per-page-selector {
  margin-left: 5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Poppins', sans-serif;
}

.items-per-page-selector select {
  padding: 0.3rem;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

.items-per-page-selector select:focus {
  border-color: rgb(0, 131, 212);
}

.items-per-page-selector span {
  font-size: 14px;
}

</style>
