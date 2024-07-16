<template>
  <div :class="['page-container', { 'sidebar-open': isFilterSidebarVisible }]">
    <div class="title">
      <h1>Liste des réclamations</h1>
    </div>

    <div class="blue-border">
      <h2>Rechercher une réclamation</h2>

      <!-- Bouton pour ouvrir les filtres -->
      <button @click="toggleFilterSidebar" class="filter-button">
        <span class="material-icons">tune</span>
        Filtres
      </button>

      <!-- Tableau des réclamations -->
      <table class="styled-table">
        <thead>
          <tr>
            <th @click="sortTable('reference')">Référence <span class="material-icons">{{ getSortIcon('reference') }}</span></th>
            <th @click="sortTable('objet')">Objet <span class="material-icons">{{ getSortIcon('objet') }}</span></th>
            <th @click="sortTable('responsable')">Responsable <span class="material-icons">{{ getSortIcon('responsable') }}</span></th>
            <th @click="sortTable('societe')">Société <span class="material-icons">{{ getSortIcon('societe') }}</span></th>
            <th @click="sortTable('domaine')">Domaine <span class="material-icons">{{ getSortIcon('domaine') }}</span></th>
            <th @click="sortTable('source')">Source <span class="material-icons">{{ getSortIcon('source') }}</span></th>
            <th @click="sortTable('date_reception')">Date de réception <span class="material-icons">{{ getSortIcon('date_reception') }}</span></th>
            <th @click="sortTable('statut')">Statut <span class="material-icons">{{ getSortIcon('statut') }}</span></th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredReclamations" :key="index">
            <td>{{ item.reference }}</td>
            <td>{{ item.objet }}</td>
            <td>{{ item.responsable }}</td>
            <td>{{ item.societe }}</td>
            <td>{{ item.domaine }}</td>
            <td>{{ item.source }}</td>
            <td>{{ item.date_reception }}</td>
            <td>{{ item.statut }}</td>
            <td>Action</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Composant Filtre -->
    <FiltreSidebar :isVisible="isFilterSidebarVisible" @toggle-sidebar="toggleFilterSidebar" @reset-filters="resetFilters" @apply-filters="applyFilters" />
  </div>
</template>

<script>
import FiltreSidebar from '@/components/Filtre_Sidebar.vue';

export default {
  name: 'Liste_Reclamations_Page',
  components: {
    FiltreSidebar
  },
  data() {
    return {
      sortBy: 'reference',
      sortDirection: 'asc',
      isFilterSidebarVisible: false,
      filters: {
        societe: [],
        domaine: [],
        source: [],
        support: [],
        date_reception: ''
      },
      reclamations: [
        { reference: 'Data 1', objet: 'Data 2', responsable: 'Data 3', societe: 'Societe 1', domaine: 'Domaine 1', source: 'Source 1', date_reception: '2023-01-01', statut: 'Data 8' },
        { reference: 'Data 10', objet: 'Data 11', responsable: 'Data 12', societe: 'Societe 2', domaine: 'Domaine 2', source: 'Source 2', date_reception: '2023-02-01', statut: 'Data 17' }
      ]
    };
  },
  computed: {
    filteredReclamations() {
      return this.reclamations.filter(item => {
        return (
          (this.filters.societe.length === 0 || this.filters.societe.includes(item.societe)) &&
          (this.filters.domaine.length === 0 || this.filters.domaine.includes(item.domaine)) &&
          (this.filters.source.length === 0 || this.filters.source.includes(item.source)) &&
          (this.filters.support.length === 0 || this.filters.support.includes(item.support)) &&
          (!this.filters.date_reception || item.date_reception === this.filters.date_reception)
        );
      }).sort((a, b) => {
        let modifier = this.sortDirection === 'asc' ? 1 : -1;
        if (a[this.sortBy] < b[this.sortBy]) return -1 * modifier;
        if (a[this.sortBy] > b[this.sortBy]) return 1 * modifier;
        return 0;
      });
    }
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
        date_reception: ''
      };
    },
    applyFilters(filters) {
      this.filters = filters;
    }
  }
};
</script>



<style scoped>
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
  margin-top: 2rem;
  background-color: white;
  border-radius: 5px;
  padding: 1rem;
}

.blue-border h2 {
  font-size: 1.15rem;
  font-family: 'Poppins', sans-serif;
  padding: 0.5rem 1rem;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
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
  font-size: 1rem;
  cursor: pointer;
}

.styled-table th .material-icons {
  vertical-align: middle;
  font-size: 16px;
}

.styled-table td {
  padding: 0.625rem;
  border: 1px solid #ddd;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}

.filter-button {
  color: black;
  border: 1px solid;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 2rem;
  margin-top: 1rem;
  font-size: 16px;
  display: flex;
  gap: 0.7rem;
  border-radius: 10px;
  border-color: rgb(195, 195, 195);
  transition: 0.2s ease-in-out;
}

.filter-button:hover {
  background-color: #e8e8e8;
  transition: 0.2s ease-in-out;
}

.page-container.sidebar-open {
  position: fixed;
  width: 94.5%;
}
</style>
