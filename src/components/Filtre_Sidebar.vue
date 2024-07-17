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
              <span class="material-icons">apartment</span>
              <label>Société</label>
            </div>
            <div>
              <label class="checkbox-label">Al Omrane Tanger-Tétouan-Al Hoceïma</label>
              <input type="checkbox" value="-	Al Omrane Tanger-Tétouan-Al Hoceïma" v-model="filters.societe">
            </div>
            <div>
              <label class="checkbox-label">Al Omrane Casablanca - Settat</label>
              <input type="checkbox" value="Al Omrane Casablanca - Settat" v-model="filters.societe">
            </div>
            <div>
              <label class="checkbox-label">Al Omrane Fès Meknès</label>
              <input type="checkbox" value="Al Omrane Fès Meknès" v-model="filters.societe">
            </div>
            <div>
              <label class="checkbox-label">Al Omrane Darâa Tafilalet</label>
              <input type="checkbox" value="Al Omrane Darâa Tafilalet" v-model="filters.societe">
            </div>
            <div>
              <label class="checkbox-label">Al Omrane Région de l'Oriental</label>
              <input type="checkbox" value="Al Omrane Région de l'Oriental" v-model="filters.societe">
            </div>
            <div>
              <label class="checkbox-label">Al Omrane Marrakech Safi</label>
              <input type="checkbox" value="Al Omrane Marrakech Safi" v-model="filters.societe">
            </div>
            <div>
              <label class="checkbox-label">Al Omrane Souss Massa</label>
              <input type="checkbox" value="Al Omrane Souss Massa" v-model="filters.societe">
            </div>
            <div>
              <label class="checkbox-label">Al Omrane Al Janoub</label>
              <input type="checkbox" value="Al Omrane Al Janoub" v-model="filters.societe">
            </div>
            <div>
              <label class="checkbox-label">Al Omrane Beni Mellal Khenifra</label>
              <input type="checkbox" value="Al Omrane Beni Mellal Khenifra" v-model="filters.societe">
            </div>
          </div>
  
          <div class="filter-section">
            <div class="filter-label">
              <span class="material-icons">category</span>
              <label>Domaine</label>
            </div>
            <div>
              <label class="checkbox-label">Relation avec l'agent d'accueil</label>
              <input type="checkbox" value="Relation avec l'agent d'accueil" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Accueil - Renseignements</label>
              <input type="checkbox" value="Accueil - Renseignements" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Accès à l'information</label>
              <input type="checkbox" value="Accès à l'information" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Relation fournisseur de service</label>
              <input type="checkbox" value="Relation fournisseur de service" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Acquisition d'un produit</label>
              <input type="checkbox" value="Acquisition d'un produit" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Relations PPP</label>
              <input type="checkbox" value="Relations PPP" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Relations clients</label>
              <input type="checkbox" value="Relations clients" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Service après vente</label>
              <input type="checkbox" value="Service après vente" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Relation prestataires techniques</label>
              <input type="checkbox" value="Relation prestataires techniques" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Autres affaires techniques</label>
              <input type="checkbox" value="Autres affaire techniques" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Relation ayants droits fonciers</label>
              <input type="checkbox" value="Relation ayants droits fonciers" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Etablissement de TF individuels</label>
              <input type="checkbox" value="Etablissement de TF individuels" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Affaires financières</label>
              <input type="checkbox" value="Affaires financières" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Affaires juridiques</label>
              <input type="checkbox" value="Affaires juridiques" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Affaires sociales et sociétales</label>
              <input type="checkbox" value="Affaires sociales et sociétales" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Affaires administratives</label>
              <input type="checkbox" value="Affaires administratives" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Dénonciation, corruption et fraudes</label>
              <input type="checkbox" value="Dénonciation, corruption et fraudes" v-model="filters.domaine">
            </div>
            <div>
              <label class="checkbox-label">Autres</label>
              <input type="checkbox" value="Autre" v-model="filters.domaine">
            </div>
          </div>

          <div class="filter-section">
            <div class="filter-label">
              <span class="material-icons">domain</span>
              <label>Reception du bureau D'ordre</label>
            </div>
            <div>
              <label class="checkbox-label">HAO</label>
              <input type="checkbox" value="HAO" v-model="filters.reception_bo">
            </div>
            <div>
              <label class="checkbox-label">SAO</label>
              <input type="checkbox" value="SAO" v-model="filters.reception_bo">
            </div>
          </div>

          <div class="filter-section">
            <div class="filter-label">
              <span class="material-icons">source</span>
              <label>Source</label>
            </div>
            <div>
              <label class="checkbox-label">Réclamant</label>
              <input type="checkbox" value="Réclamant" v-model="filters.source">
            </div>
            <div>
              <label class="checkbox-label">Médiateur du Royaume</label>
              <input type="checkbox" value="Médiateur du Royaume" v-model="filters.source">
            </div>
            <div>
              <label class="checkbox-label">Administration</label>
              <input type="checkbox" value="Administration" v-model="filters.source">
            </div>
            <div>
              <label class="checkbox-label">Société civile</label>
              <input type="checkbox" value="Société civile" v-model="filters.source">
            </div>
            <div>
              <label class="checkbox-label">chikaya.com</label>
              <input type="checkbox" value="chikaya.com" v-model="filters.source">
            </div>
            <div>
              <label class="checkbox-label">Autre</label>
              <input type="checkbox" value="Autre" v-model="filters.source">
            </div>
          </div>
  
          <div class="filter-section">
            <div class="filter-label">
              <span class="material-icons">mail</span>
              <label>Support</label>
            </div>
            <div>
              <label class="checkbox-label">Courrier</label>
              <input type="checkbox" value="Courrier" v-model="filters.support">
            </div>
            <div>
              <label class="checkbox-label">Contact Direct (Fiche)</label>
              <input type="checkbox" value="Contact Direct (Fiche)" v-model="filters.support">
            </div>
            <div>
              <label class="checkbox-label">Téléphone (Standard)</label>
              <input type="checkbox" value="Téléphone (Standard)" v-model="filters.support">
            </div>
            <div>
              <label class="checkbox-label">Centre d'appels</label>
              <input type="checkbox" value="Centre d'appels" v-model="filters.support">
            </div>
            <div>
              <label class="checkbox-label">Site Web</label>
              <input type="checkbox" value="Site Web" v-model="filters.support">
            </div>
            <div>
              <label class="checkbox-label">Autre</label>
              <input type="checkbox" value="Autre" v-model="filters.support">
            </div>
          </div>
  
          
  
          <div class="filter-section">
            <div class="filter-label">
              <span class="material-icons">today</span>
              <label>Date de réception</label>
            </div>
            <input type="date" v-model="filters.date_reception">
          </div>

          <div class="filter-section">
            <div class="filter-label">
              <span class="material-icons">today</span>
              <label>Date de déclaration</label>
            </div>
            <input type="date" v-model="filters.declaration">
          </div>

          <div class="filter-section" id="last-section">
            <div class="filter-label">
              <span class="material-icons">task</span>
              <label>Statut</label>
            </div>
            <div>
              <label class="checkbox-label">Initié</label>
              <input type="checkbox" value="Initié" v-model="filters.statut">
            </div>
            <div>
              <label class="checkbox-label">En cours de traitement</label>
              <input type="checkbox" value="En cours de traitement" v-model="filters.statut">
            </div>
            <div>
              <label class="checkbox-label">Clôturée</label>
              <input type="checkbox" value="Clôturée" v-model="filters.statut">
            </div>
            <div>
              <label class="checkbox-label">Médiation</label>
              <input type="checkbox" value="Médiation" v-model="filters.statut">
            </div>
            <div>
              <label class="checkbox-label">Recours</label>
              <input type="checkbox" value="Recours" v-model="filters.statut">
            </div>
            <div>
              <label class="checkbox-label">Contentieux</label>
              <input type="checkbox" value="Contentieux" v-model="filters.statut">
            </div>
            <div>
              <label class="checkbox-label">En réexamen</label>
              <input type="checkbox" value="En réexamen" v-model="filters.statut">
            </div>
            <div>
              <label class="checkbox-label">Erronée</label>
              <input type="checkbox" value="Erronée" v-model="filters.statut">
            </div>
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
          statut: [],
          reception_bo: [],
          date_declaration: '',
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
          statut: [],
          reception_bo: [],
          date_declaration: '',
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
    gap: 0.6rem;
  }

  .filter-label .material-icons {
    color: rgb(30, 72, 197);
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
  