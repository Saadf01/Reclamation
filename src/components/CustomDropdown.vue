<template>
    <div>
      <div class="filter-section" @mouseenter="showDropdown" @mouseleave="hideDropdown">
        <div class="filter-label">
          <span :class="['material-icons', iconClass]" @click="handleIconClick">{{ icon }}</span>
          <label>{{ label }}</label>
        </div>
        <div class="filter-toggle" @click="toggleDropdown">
          {{ selectedOption ? selectedOption : 'Sélectionner les choix...' }}
        </div>
        <div v-if="dropdownVisible" class="filter-dropdown">
          <input type="text" v-model="searchQuery" placeholder="Rechercher..." />
          <div 
            v-for="option in filteredOptions" 
            :key="option.value" 
            class="dropdown-option" 
            @click="selectOption(option)"
            :value="option.value"
          >
            {{ option.text }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      options: {
        type: Array,
        required: true,
      },
      value: {
        type: String,
        default: '',
      },
      redirectTo: {
      type: String,
      default: '', // URL de redirection par défaut
    },
      icon: {
        type: String,
        default: 'source',
      },
      label: {
        type: String,
        default: 'Label',
      },
    },
    data() {
      return {
        searchQuery: '',
        selectedOption: this.value,
        dropdownVisible: false,
      };
    },
    computed: {
      iconClass() {
      return this.icon === 'add' ? 'icon-add' : '';
    },
      filteredOptions() {
        return this.options.filter(option =>
          option.text.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option.text;
        this.$emit('input', option.value);
        this.dropdownVisible = false;
      },
      toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
      },
      showDropdown() {
        this.dropdownVisible = true;
      },
      hideDropdown() {
        this.dropdownVisible = false;
      },
      handleIconClick() {
      if (this.icon === 'add' && this.redirectTo) {
        this.redirectToNewPage(this.redirectTo);
      }
    },
    redirectToNewPage(page) {
      this.$router.push(page);
    }
    },
  };
  </script>
  
  <style scoped>
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
  
  .filter-dropdown input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
  }
  
  .dropdown-option {
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease-out;
  }
  
  .dropdown-option:hover {
    background-color: #f1f1f1;
  }
  </style>
  