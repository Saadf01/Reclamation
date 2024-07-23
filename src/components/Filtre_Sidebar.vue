<template>
  <div class="filter-sections">



    <!-- Sections de filtres -->
    <div
      class="filter-section"
      v-for="(options, filterKey) in filterOptions"
      :key="filterKey"
      @mouseenter="showDropdown(filterKey)"
      @mouseleave="hideDropdown"
    >
      <div class="filter-label">
        <span class="material-icons">{{ filterIcons[filterKey] }}</span>
        <label>{{ filterLabels[filterKey] }}</label>
      </div>
      <div class="filter-toggle" @click="toggleDropdown(filterKey)">
        Sélectionner les choix...
      </div>
      <div v-if="dropdownVisible === filterKey" class="filter-dropdown">
        <div v-for="option in options" :key="option.name">
          <input
            type="checkbox"
            :id="`${filterKey}-${option.name}`"
            :value="option.name"
            :checked="filters[filterKey].includes(option.name)"
            @change="toggleFilter(filterKey, option.name)"
          />
          <label :for="`${filterKey}-${option.name}`">{{ option.name }}</label>
        </div>
      </div>
    </div>

    <!-- Sections de filtres pour les dates -->
    <div class="filter-section">
      <div class="filter-label">
        <span class="material-icons">today</span>
        <label>Date de réception (A partir du ...)</label>
      </div>
      <input type="date" v-model="filters.date_reception" @change="applyFilters">
    </div>
    <div class="filter-section">
      <div class="filter-label">
        <span class="material-icons">today</span>
        <label>Date de déclaration (A partir du ...)</label>
      </div>
      <input type="date" v-model="filters.date_declaration" @change="applyFilters">
    </div>
  </div>

          <!-- Div pour afficher les filtres sélectionnés -->
          <div class="selected-filters">
      <div v-for="(options, filterKey) in selectedFilters" :key="filterKey">
        <div class="selected-filter-group">
          <div class="selected-filter-label">
            <span class="material-icons">{{ filterIcons[filterKey] }}</span>
            <label>{{ filterLabels[filterKey] }}</label>
          </div>
          <div class="selected-filter-items">
            <span v-for="option in options" :key="option" class="selected-filter-item">
              {{ option }}
              <span class="material-icons remove-filter" @click="removeFilter(filterKey, option)">cancel</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="filter-foot">
      <button class="effacer" @click="resetFilters">Réinitialiser les filtres</button>
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
        statut: [],
        reception_bo: [],
        date_declaration: '',
        date_reception: ''
      },
      dropdownVisible: null, // Pour gérer la visibilité de la div flottante
      filterOptions: {
        societe: [
          { name: 'Al Omrane Tanger-Tétouan-Al Hoceïma' },
          { name: 'Al Omrane Casablanca - Settat' },
          { name: 'Al Omrane Fès Meknès' },
          { name: 'Al Omrane Darâa Tafilalet' },
          { name: 'Al Omrane Région de l\'Oriental' },
          { name: 'Al Omrane Marrakech Safi' },
          { name: 'Al Omrane Souss Massa' },
          { name: 'Al Omrane Al Janoub' },
          { name: 'Al Omrane Beni Mellal Khenifra' }
        ],
        domaine: [
          { name: 'Relation avec l\'agent d\'accueil' },
          { name: 'Accueil - Renseignements' },
          { name: 'Accès à l\'information' },
          { name: 'Relation fournisseur de service' },
          { name: 'Acquisition d\'un produit' },
          { name: 'Relations PPP' },
          { name: 'Relations clients' },
          { name: 'Service après vente' },
          { name: 'Relation prestataires techniques' },
          { name: 'Autres affaires techniques' },
          { name: 'Relation ayants droits fonciers' },
          { name: 'Etablissement de TF individuels' },
          { name: 'Affaires financières' },
          { name: 'Affaires juridiques' },
          { name: 'Affaires sociales et sociétales' },
          { name: 'Affaires administratives' },
          { name: 'Dénonciation, corruption et fraudes' },
          { name: 'Autres' }
        ],
        reception_bo: [
          { name: 'HAO' },
          { name: 'SAO' }
        ],
        source: [
          { name: 'Réclamant' },
          { name: 'Médiateur du Royaume' },
          { name: 'Administration' },
          { name: 'Société civile' },
          { name: 'chikaya.com' },
          { name: 'Autre' }
        ],
        support: [
          { name: 'Courrier' },
          { name: 'Contact Direct (Fiche)' },
          { name: 'Téléphone (Standard)' },
          { name: 'Centre d\'appels' },
          { name: 'Site Web' },
          { name: 'Autre' }
        ],
        statut: [
          { name: 'Initié' },
          { name: 'En cours de traitement' },
          { name: 'Cloturée' },
          { name: 'Médiation' },
          { name: 'Recours' },
          { name: 'Contentieux' },
          { name: 'En réexamen' },
          { name: 'Erronée' }
        ]
      },
      filterIcons: {
        societe: 'apartment',
        domaine: 'category',
        reception_bo: 'domain',
        source: 'source',
        support: 'mail',
        statut: 'task',
        date_declaration: 'today',
        date_reception: 'today'
      },
      filterLabels: {
        societe: 'Société',
        domaine: 'Domaine',
        reception_bo: 'Reception du bureau D\'ordre',
        source: 'Source',
        support: 'Support',
        statut: 'Statut',
        date_declaration: 'Date de déclaration',
        date_reception: 'Date de réception'
      }
    };
  },
  computed: {
    selectedFilters() {
      const result = {};
      for (const [key, options] of Object.entries(this.filters)) {
        if (options.length > 0) {
          if (key === 'date_declaration' || key === 'date_reception') {
            if (options) {
              result[key] = [options];
            }
          } else if (key !== 'date_declaration' && key !== 'date_reception') {
            result[key] = options;
          }
        }
      }
      return result;
    }
  },
  methods: {
    resetFilters() {
      this.filters = {
        societe: [],
        domaine: [],
        source: [],
        support: [],
        statut: [],
        reception_bo: [],
        date_declaration: '',
        date_reception: ''
      };
      this.$emit('reset-filters');
    },
    applyFilters() {
      this.$emit('apply-filters', this.filters);
    },
    toggleFilter(filterKey, optionName) {
      const index = this.filters[filterKey].indexOf(optionName);
      if (index === -1) {
        this.filters[filterKey].push(optionName);
      } else {
        this.filters[filterKey].splice(index, 1);
      }
      this.applyFilters();
    },
    toggleDropdown(filterKey) {
      this.dropdownVisible = this.dropdownVisible === filterKey ? null : filterKey;
    },
    showDropdown(filterKey) {
      this.dropdownVisible = filterKey;
    },
    hideDropdown() {
      this.dropdownVisible = null;
    },
    removeFilter(filterKey, optionName) {
      if (filterKey === 'date_declaration' || filterKey === 'date_reception') {
        this.filters[filterKey] = '';
      } else {
        const index = this.filters[filterKey].indexOf(optionName);
        if (index !== -1) {
          this.filters[filterKey].splice(index, 1);
        }
      }
      this.applyFilters();
    }
  }
};
</script>

<style scoped>
.filter-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

.selected-filters {
  margin-bottom: 1rem;
  padding: 1rem;

}

.selected-filter-group {
  margin-bottom: 0.5rem;
}

.selected-filter-label {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.selected-filter-label .material-icons {
  color: rgb(67, 190, 0);
}

.selected-filter-label label {
  font-family: 'Poppins', sans-serif;
}

.selected-filter-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.selected-filter-item {
  background-color: #f1f1f1;
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
}

.remove-filter {
  cursor: pointer;
  margin-left: 0.5rem;
  color: grey;
  transition: 0.2s ease-out;
}

.remove-filter:hover {
  cursor: pointer;
  margin-left: 0.5rem;
  color: rgb(255, 0, 0);
}

.filter-section {
  flex: 1 1 30%;
  min-width: 200px;
  padding-bottom: 1rem;
  position: relative;
  transition: 0.2s ease-out;
}

.filter-label {
  margin-bottom: 0.5rem;
  gap: 0.6rem;
  display: flex;
}

.filter-label .material-icons {
  color: rgb(30, 72, 197);
}

.filter-label label {
  font-family: 'Poppins', sans-serif;
}

.filter-toggle {
  cursor: pointer;
  color: rgb(92, 92, 92);
  padding: 0.5rem;
  border: 1px solid #ddd;
  background-color: #fff;
}

.filter-dropdown {
  position: absolute;
  left: 0;
  z-index: 10;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-top: none;
}

.filter-dropdown input[type="checkbox"] {
  margin-right: 0.5rem;
}

.filter-foot {
  display: flex;
  justify-content: left;
  width: 100%;
  margin-bottom: 2rem;
}

.filter-foot .effacer {
  padding: 0.7rem 1.5rem;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid red;
  color: red;
  transition: 0.2s ease-out;
}

.filter-foot .effacer:hover {
  cursor: pointer;
  color: white;
  background-color: rgb(255, 0, 0);
}

.filter-section input[type="checkbox"] {
  cursor: pointer;
  transform: scale(1.4);
  margin-left: 0.5rem;
  margin-bottom: 10px;
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
</style>
