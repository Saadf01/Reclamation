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
        <FiltreComponent :isVisible="isFilterSidebarVisible" @toggle-sidebar="toggleFilterSidebar" @reset-filters="resetFilters" @apply-filters="applyFilters" />
      </div>



      <!-- Tableau des réclamations -->
      <table class="styled-table">
        <thead>
          <tr>
            <th @click="sortTable('id_reclamation')">ID Réclamation <span class="material-icons">{{ getSortIcon('id_reclamation') }}</span></th>
            <th @click="sortTable('societe')">Société <span class="material-icons">{{ getSortIcon('societe') }}</span></th>
            <th @click="sortTable('responsable')">Responsable <span class="material-icons">{{ getSortIcon('responsable') }}</span></th>
            <th @click="sortTable('reclamant')">Réclamant <span class="material-icons">{{ getSortIcon('reclamant') }}</span></th>
            <th @click="sortTable('objet')">Objet <span class="material-icons">{{ getSortIcon('objet') }}</span></th>
            <th @click="sortTable('domaine')">Domaine <span class="material-icons">{{ getSortIcon('domaine') }}</span></th>
            <th @click="sortTable('reception_bo')">Réception BO <span class="material-icons">{{ getSortIcon('reception_bo') }}</span></th>
            <th @click="sortTable('source')">Source <span class="material-icons">{{ getSortIcon('source') }}</span></th>
            <th @click="sortTable('operation')">Opération <span class="material-icons">{{ getSortIcon('operation') }}</span></th>
            <th @click="sortTable('support')">Support <span class="material-icons">{{ getSortIcon('support') }}</span></th>
            <th @click="sortTable('date_reception')">Date de réception <span class="material-icons">{{ getSortIcon('date_reception') }}</span></th>
            <th @click="sortTable('date_declaration')">Date de déclaration <span class="material-icons">{{ getSortIcon('date_declaration') }}</span></th>
            <th @click="sortTable('statut')">Statut <span class="material-icons">{{ getSortIcon('statut') }}</span></th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedReclamations" :key="index">
            <td>{{ item.id_reclamation }}</td>
            <td>{{ item.societe }}</td>
            <td>{{ item.responsable }}</td>
            <td>{{ item.reclamant }}</td>
            <td>{{ item.objet }}</td>
            <td>{{ item.domaine }}</td>
            <td>{{ item.reception_bo }}</td>
            <td>{{ item.source }}</td>
            <td>{{ item.operation }}</td>
            <td>{{ item.support }}</td>
            <td>{{ item.date_reception }}</td>
            <td>{{ item.date_declaration }}</td>
            <td><div :class="['statut', getStatusClass(item.statut)]"><span>{{ item.statut }}</span></div></td>
            <td>
              <div class="action-menu" @mouseleave="closeDropdown">
                <button class="action-menu-button" @click="toggleDropdown">
                  <span class="action">Action</span>
                  <span class="material-icons">arrow_drop_down</span>
                </button>
                <ul v-if="dropdownOpen" class="dropdown">
                  <!-- Option pour visualiser -->
                  <li>
                    <router-link :to="`/VisualiserReclamation`" class="button">
                      <span class="text">Visualiser</span>
                    </router-link>
                  </li>
                  <!-- Option pour modifier -->
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
          <select v-model="itemsPerPage" @change="currentPage = 1">
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

export default {
  name: 'Liste_Reclamations_Page',
  components: {
    FiltreComponent
  },
  data() {
    return {
      sortBy: 'id_reclamation',
      sortDirection: 'asc',
      isFilterSidebarVisible: false,
      dropdownOpen: false,
      searchQuery: '',
      filters: {
        societe: [],
        domaine: [],
        source: [],
        support: [],
        statut: [],
        reception_bo: [],
        date_reception_start: '',
        date_reception_end: '',
        date_declaration_start: '',
        date_declaration_end: ''
      },
      reclamations: [
        // Exemple de données ; remplacez par des données réelles
        { id_reclamation: '1', societe: 'Al Omrane Casablanca - Settat', responsable: 'Responsable 1', reclamant: 'Reclamant 1', objet: 'Objet 1', domaine: 'Autre', source: 'Réclamant', operation: 'ANNASSIM', reception_bo: 'SAO', support: 'Courrier', date_reception: '2023-01-01', date_declaration: '2023-01-02', statut: 'En cours de traitement' },
        { id_reclamation: '1', societe: 'Al Omrane Casablanca - Settat', responsable: 'Responsable 1', reclamant: 'Reclamant 1', objet: 'Objet 1', domaine: 'Autre', source: 'Réclamant', operation: 'ANNASSIM', reception_bo: 'SAO', support: 'Courrier', date_reception: '2023-01-01', date_declaration: '2023-01-02', statut: 'En cours de traitement' },
        { id_reclamation: '1', societe: 'Al Omrane Casablanca - Settat', responsable: 'Responsable 1', reclamant: 'Reclamant 1', objet: 'Objet 1', domaine: 'Autre', source: 'Réclamant', operation: 'ANNASSIM', reception_bo: 'SAO', support: 'Courrier', date_reception: '2023-01-01', date_declaration: '2023-01-02', statut: 'En cours de traitement' }, 
        { id_reclamation: '2', societe: 'Al Omrane Fès Meknès', responsable: 'Responsable 2', reclamant: 'Reclamant 2', objet: 'Objet 2', domaine: 'Accueil - Renseignements', source: 'Administration', operation: 'ANNASSIM', reception_bo: 'HAO', support: 'Site Web', date_reception: '2023-02-01', date_declaration: '2023-02-02', statut: 'Cloturée' },
      ],
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    filteredReclamations() {
      return this.reclamations.filter(item => {
        const matchesSearchQuery = Object.values(item).some(value => 
          value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        );

        const isDateReceptionInRange = (!this.filters.date_reception_start || new Date(item.date_reception) >= new Date(this.filters.date_reception_start)) &&
                                       (!this.filters.date_reception_end || new Date(item.date_reception) <= new Date(this.filters.date_reception_end));
                                       
        const isDateDeclarationInRange = (!this.filters.date_declaration_start || new Date(item.date_declaration) >= new Date(this.filters.date_declaration_start)) &&
                                         (!this.filters.date_declaration_end || new Date(item.date_declaration) <= new Date(this.filters.date_declaration_end));

        return matchesSearchQuery && (
          (this.filters.societe.length === 0 || this.filters.societe.includes(item.societe)) &&
          (this.filters.domaine.length === 0 || this.filters.domaine.includes(item.domaine)) &&
          (this.filters.source.length === 0 || this.filters.source.includes(item.source)) &&
          (this.filters.support.length === 0 || this.filters.support.includes(item.support)) &&
          (this.filters.statut.length === 0 || this.filters.statut.includes(item.statut)) &&
          (this.filters.reception_bo.length === 0 || this.filters.reception_bo.includes(item.reception_bo)) &&
          isDateReceptionInRange &&
          isDateDeclarationInRange
        );
      }).sort((a, b) => {
        let modifier = this.sortDirection === 'asc' ? 1 : -1;
        if (a[this.sortBy] < b[this.sortBy]) return -1 * modifier;
        if (a[this.sortBy] > b[this.sortBy]) return 1 * modifier;
        return 0;
      });
    },
    paginatedReclamations() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredReclamations.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredReclamations.length / this.itemsPerPage);
    },
    getPageButtons() {
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;
      const range = 5; // Numéro de page affiché avant et après la page actuelle

      let startPage = Math.max(currentPage - range, 1);
      let endPage = Math.min(currentPage + range, totalPages);

      // Ajustement si le nombre de pages est inférieur à 2*range + 1
      if (endPage - startPage < 2 * range) {
        if (startPage === 1) {
          endPage = Math.min(startPage + 2 * range, totalPages);
        } else if (endPage === totalPages) {
          startPage = Math.max(endPage - 2 * range, 1);
        }
      }

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    toggleFilterSidebar() {
      this.isFilterSidebarVisible = !this.isFilterSidebarVisible;
    },
    sortTable(key) {
      if (this.sortBy === key) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = key;
        this.sortDirection = 'asc';
      }
    },
    getSortIcon(column) {
      if (this.sortBy !== column) return 'unfold_more';
      return this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
    },
    resetFilters() {
      this.filters = {
        societe: [],
        domaine: [],
        source: [],
        support: [],
        statut: [],
        reception_bo: [],
        date_reception_start: '',
        date_reception_end: '',
        date_declaration_start: '',
        date_declaration_end: ''
      };
    },
    applyFilters(filters) {
      this.filters = filters;
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
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    setPage(page) {
    this.currentPage = page;
    },
    updateItemsPerPage() {
      this.currentPage = 1; // Reset to the first page
    }
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
