<template>
  <div class="page-container">
    <div class="title">
      <h1>Liste des réclamations</h1>
    </div>

    <div class="blue-border">
      <h2>Rechercher une réclamation</h2>

      <div class="recherche">
        <input type="text" placeholder="Rechercher une réclamation..." />
      </div>

      <div class="filtre">
        <div class="filtre_title">
          <span class="text">Filtre</span>
          <span class="material-icons">tune</span>
        </div>
        
        <div class="dropdowns">
          <div class="dropdown">
            <button class="dropbtn">Statut</button>
            <div class="dropdown-content">
              <label><input type="checkbox" value="Statut 1"> Statut 1</label>
              <label><input type="checkbox" value="Statut 2"> Statut 2</label>
              <label><input type="checkbox" value="Statut 3"> Statut 3</label>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropbtn">Société</button>
            <div class="dropdown-content">
              <label><input type="checkbox" value="Société 1"> Société 1</label>
              <label><input type="checkbox" value="Société 2"> Société 2</label>
              <label><input type="checkbox" value="Société 3"> Société 3</label>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropbtn">Domaine</button>
            <div class="dropdown-content">
              <label><input type="checkbox" value="Domaine 1"> Domaine 1</label>
              <label><input type="checkbox" value="Domaine 2"> Domaine 2</label>
              <label><input type="checkbox" value="Domaine 3"> Domaine 3</label>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropbtn">Source</button>
            <div class="dropdown-content">
              <label><input type="checkbox" value="Source 1"> Source 1</label>
              <label><input type="checkbox" value="Source 2"> Source 2</label>
              <label><input type="checkbox" value="Source 3"> Source 3</label>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropbtn">
              Date de réception <span class="material-icons">event</span>
            </button>
            <div class="dropdown-content">
              <flat-pickr v-model="selectedDate" :config="datePickerConfig"></flat-pickr>
            </div>
          </div>

          

        </div>

        <div class="dropdowns">

          <div class="dropdown">
            <label for="sortBy">Trier par : </label>
            <select id="sortBy" v-model="sortBy" @change="clearSortBy">
              <option value="Anciennes">Réclamations les plus anciennes</option>
              <option value="Recentes">Réclamations les plus récentes</option>
            </select>
          </div>

        </div>

      </div>

      <table class="styled-table">
        <thead>
          <tr>
            <th>Référence</th>
            <th>Objet</th>
            <th>Responsable</th>
            <th>Société</th>
            <th>Domaine</th>
            <th>Source</th>
            <th>Date de réception</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
            <td>Data 4</td>
            <td>Data 5</td>
            <td>Data 6</td>
            <td>Data 7</td>
            <td>Data 8</td>
            <td>Data 9</td>
          </tr>
          <tr>
            <td>Data 10</td>
            <td>Data 11</td>
            <td>Data 12</td>
            <td>Data 13</td>
            <td>Data 14</td>
            <td>Data 15</td>
            <td>Data 16</td>
            <td>Data 17</td>
            <td>Data 18</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'Liste_Reclamations_Page',
  components: {
    flatPickr
  },
  data() {
    return {
      selectedDate: null,
      datePickerConfig: {
        dateFormat: 'Y-m-d',
        enableTime: false,
        altInput: true,
        altFormat: 'F j, Y',
        locale: {
          firstDayOfWeek: 1,
          weekdays: {
            shorthand: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            longhand: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
          },
          months: {
            shorthand: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            longhand: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
          }
        }
      },
      sortBy: 'Recentes' // Définir la valeur par défaut à "Recentes"
    };
  },
  methods: {
    clearSortBy() {
      if (!this.sortBy) return; // Ne rien faire si aucune option n'est sélectionnée
      // implémenter du code ici pour gérer le tri
    }
  }
}
</script>


<style scoped>
.page-container {
  background-color: #f0f0f0; /* Arrière-plan gris pour la page */
  min-height: 100vh; /* Assure que le conteneur prend toute la hauteur de la page */
  padding: 0rem 2rem;
}

.title {
  padding-top: 1rem;
}

.title h1 {
  font-size: 1.5rem; 
  font-family: 'Poppins', sans-serif; 
}

.blue-border {
  border-top: 4px solid rgb(0, 147, 215); /* Bord supérieur bleu */
  margin-top: 2rem; /* Espace au-dessus de la bordure */
  background-color: white;
  border-radius: 5px;
  padding: 1rem; /* Ajoute du padding à l'intérieur de la div */
}

.blue-border h2 {
  font-size: 1.15rem; 
  font-family: 'Poppins', sans-serif; 
  padding: 0.5rem 1rem;
}

.recherche {
  display: flex;
  justify-content: center; /* Centre horizontalement */
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.recherche input {
  width: 40%; /* Largeur réduite */
  padding: 0.5rem;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filtre {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 1rem;
}


.filtre_title {
  display: flex;
  align-items: center; /* Centre verticalement */
  gap: 0.5rem; /* Espace entre le texte et l'icône */
}

.filtre_title .text{
  font-size: 1.2rem;
}



.dropdowns {
  display: flex;
  gap: 1rem; /* Espace entre les filtres */
  padding: 1rem 0rem;
  
}

.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropbtn {
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 0.5rem;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  min-width: 15rem;
  display: flex;
  align-items: center; /* Aligner le texte et l'icône */
  justify-content: space-between; /* Espace entre le texte et l'icône */
}

.dropbtn .material-icons {
  font-size: 1.2rem;
}

#sortBy {
  padding: 0.58rem; /* Ajustement du padding pour les options */
  border: 1px solid #ccc;
  border-radius: none;
  font-size: 1.2rem;
  min-width: 15rem;
}


.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  min-width: 15rem;
  padding: 12px 16px;
  z-index: 1;
  border: 1px solid #ccc;
  border-top: none;
}

.dropdown-content label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
}

.styled-table thead tr {
  background-color: #ffffff; /* En-tête blanche */
  text-align: left;
}

.styled-table th {
  font-weight: bold; /* Texte en gras pour les en-têtes */
  padding: 0.625rem;
  border: 1px solid #ddd; /* Bordure grise claire */
  font-size: 1rem;
}

.styled-table td {
  padding: 0.625rem;
  border: 1px solid #ddd; /* Bordure grise claire */
}

.styled-table tbody tr:nth-child(even) {
  background-color: #ffffff; 
}

.styled-table tbody tr:nth-child(odd) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
