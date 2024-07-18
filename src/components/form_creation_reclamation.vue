<template>
    <form @submit.prevent="submitform">
      <!-- Section Information réclamant -->
      <div class="blue-borders">
        <h2>Données générales</h2>
        <div class="rec-detail">
          <div class="input-box">
            <label for="idrec" class="detail">Réclamant</label>
            <div class="input-with-icon">
              <input type="text" id="idrec" name="idrec" v-model="reclamant" @click="openModal('reclamant')" required>
              <span class="search-icon" @click="openModal('reclamant')">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="input-box">
            <label for="respo" class="detail">Responsable</label>
            <div class="input-with-icon">
              <input type="text" id="respo" name="respo" v-model="responsable" @click="openModal('responsable')">
              <span class="search-icon" @click="openModal('responsable')">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="input-box">
            <label for="id-op" class="detail">Opération</label>
            <div class="input-with-icon">
              <input type="text" id="id-op" name="id-op" v-model="operation" @click="openModal('operation')" required>
              <span class="search-icon" @click="openModal('operation')">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="input-box">
            <label for="relai" class="detail">Identification du relais réclamation</label>
            <input type="text" id="relai" name="relai" v-model="identificationRelais">
          </div>
          <div class="input-box">
            <label for="ref" class="detail">Référence bureau d'ordre</label>
            <input type="text" id="ref" name="ref" v-model="referenceBureau">
          </div>
          <div class="input-box">
            <label for="recep" class="detail">Réception de la réclamation</label>
            <input type="text" id="recep" name="recep" v-model="receptionReclamation">
          </div>
          <div class="input-box">
            <label for="date_s" class="detail">Date source de la réclamation</label>
            <input type="date" id="date_s" name="date_s" v-model="dateSource">
          </div>
        </div>
      </div>

      <!-- Section Données techniques -->
      <div class="blue-borders">
        <h2>Données techniques</h2>
        <div class="rec-detail">
          <div class="input-box">
            <label for="domaine" class="detail">Domaine concerné</label>
            <select id="domaine" v-model="domaine" @change="clearSortBy">
              <option value="pid">PID</option>
            </select>
          </div>
          <div class="input-box">
            <label for="reception" class="detail">Réception B.O</label>
            <select id="reception" v-model="receptionBO" @change="clearSortBy">
              <option value="Anciennes">Réclamations les plus anciennes</option>
              <option value="Recentes">Réclamations les plus récentes</option>
            </select>
          </div>
          <div class="input-box">
            <label for="source" class="detail">Source réclamation</label>
            <select id="source" v-model="sourceReclamation" @change="clearSortBy">
              <option value="Anciennes">Réclamations les plus anciennes</option>
              <option value="Recentes">Réclamations les plus récentes</option>
            </select>
          </div>
          <div class="input-box">
            <label for="support" class="detail">Support de réclamation</label>
            <select id="support" v-model="supportReclamation" @change="clearSortBy">
              <option value="Anciennes">Réclamations les plus anciennes</option>
              <option value="Recentes">Réclamations les plus récentes</option>
            </select>
          </div>
          <div class="input-box">
            <label for="type" class="detail">Type réclamant</label>
            <select id="type" v-model="typeReclamant" @change="clearSortBy">
              <option value="Anciennes">Réclamations les plus anciennes</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Section Dispatching -->
      <div class="blue-borders">
        <h2>Détail traitement réclamation</h2>
        <div class="rec-detail">
          <div class="input-box">
            <label for="disp" class="detail">Tâche</label>
            <input type="text" id="disp" v-model="tache">
          </div>
          <div class="input-box">
            <label for="resp-tach" class="detail">Téléphone du responsable de la tâche</label>
            <input type="text" id="resp-tach" v-model="telephoneResponsableTache">
          </div>
          <div class="input-box">
            <label for="trait" class="detail">Centre de traitement</label>
            <select id="filial" v-model="centreTraitement" @change="clearSortBy">
              <option value="pid">PID</option>
              <option value="pid">PID</option>
              <option value="pid">PID</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Fenêtre modale pour la sélection de réclamant, responsable et opération -->
      <div v-if="showModal || showModalResponsable || showModalOperation" class="modal">
        <div class="modal-content">
          <template v-if="showModal">
            <h3>Sélectionner un {{ modalType }}</h3>
            <input type="text" v-model="searchQuery" placeholder="Rechercher..." class="modal-input">
            <ul>
              <li v-for="person in filteredPeople" :key="person.id" @click="selectPerson(person)" class="modal-item">
                <span v-if="modalType === 'reclamant'">{{ person.cin }}</span>
                <span v-if="modalType === 'responsable'">{{ person.matricule }}</span>
                <span>{{ person.name }}</span>
              </li>
            </ul>
            <button @click="closeModal" class="modal-button">Fermer</button>
            <button @click="redirectToCreate" class="modal-button modal-button-new">Nouveau</button>
          </template>
          <template v-if="showModalResponsable">
            <h3>Sélectionner un {{ modalTypeResponsable }}</h3>
            <input type="text" v-model="searchQueryResponsable" placeholder="Rechercher..." class="modal-input">
            <ul>
              <li v-for="person in filteredPeople" :key="person.id" @click="selectPerson(person, 'responsable')" class="modal-item">
                <span>{{ person.cin }}</span>
                <span>{{ person.name }}</span>
              </li>
            </ul>
            <button @click="closeModalResponsable" class="modal-button">Fermer</button>
            <button @click="redirectToCreate('responsable')" class="modal-button modal-button-new">Nouveau</button>
          </template>
          <template v-if="showModalOperation">
            <h3>Sélectionner une Opération</h3>
            <input type="text" v-model="searchOperationQuery" placeholder="Rechercher..." class="modal-input">
            <ul>
              <li v-for="op in filteredOperations" :key="op.code" @click="selectOperation(op)" class="modal-item">
                <span class="modal-item-code">{{ op.code }}</span>
                <span class="modal-item-description">{{ op.description }}</span>
              </li>
            </ul>
            <button @click="closeModalOperation" class="modal-button">Fermer</button>
            <button @click="redirectToCreateOperation" class="modal-button modal-button-new">Nouveau</button>
          </template>
        </div>
      </div>
 <!-- Section de Dispatching avec transition -->
  <!-- Section de Dispatching avec transition -->
  <transition name="fade">
        <div v-if="showDispatchSection" class="blue-borders">
          <h2>Dispatching</h2>
          <div class="rec-detail">
            <div class="input-box">
              <label for="disp" class="detail">Dispatching</label>
              <select id="disp">
                <option value="sao">SAO</option>
                <option value="hao">HAO</option>
              </select>
            </div>
            <div class="input-box">
              <label for="filial" class="detail">Filiale</label>
              <select id="filial">
                <option value="Anciennes">Réclamations les plus anciennes</option>
              </select>
            </div>
            <div class="input-box">
              <label for="source" class="detail">Agence</label>
              <input type="text" id="source" name="source">
            </div>
            <div class="input-box">
              <label for="date-rep" class="detail">Date réponse souhaitée</label>
              <input type="date" id="date-rep" name="date-rep">
            </div>
          </div>
        </div>
      </transition>
       <!-- Boutons alignés horizontalement -->
       <!-- Boutons alignés horizontalement -->
       <div class="button-container">
        <button id="transferButton" type="button" class="button-submit" @click="toggleTransferSection">
          {{ cancelTransferText }}
        </button>
        <input type="submit" value="Enregistrer" class="button-submit">
      </div>
    </form>
</template>

<script>
export default {
  data() {
    return {
      reclamant: '',
      responsable: '',
      identificationRelais: '',
      referenceBureau: '',
      receptionReclamation: '',
      dateSource: '',
      operation: '',
      domaine: '',
      receptionBO: '',
      sourceReclamation: '',
      supportReclamation: '',
      typeReclamant: '',
      tache: '',
      telephoneResponsableTache: '',
      centreTraitement: '',
      showModal: false,
      modalType: '', // 'reclamant' ou 'responsable' ou 'operation'
      people: [
        { id: 1, cin: '12345678', name: 'John Doe' },
        { id: 2, cin: '87654321', name: 'Jane Smith' },
        { id: 3, cin: '98765432', name: 'Alice Johnson' }
      ],
      showModalResponsable: false,
      modalTypeResponsable: '',
      showModalOperation: false,
      modalTypeOperation: '', // 'operation'
      operations: [
        { code: 'OP001', description: 'Opération 1' },
        { code: 'OP002', description: 'Opération 2' },
        { code: 'OP003', description: 'Opération 3' }
      ],
      selectedOperation: null,
      searchQuery: '',
      searchQueryResponsable: '', // Ajout de la variable pour la recherche du responsable
      searchOperationQuery: '',
      showDispatchSection: false,
       cancelTransferText: 'Transferer',
    };

  },
  methods: {
    openModal(type) {
      if (type === 'reclamant') {
        this.modalType = 'reclamant';
        this.showModal = true;
      } else if (type === 'responsable') {
        this.modalTypeResponsable = 'responsable';
        this.showModalResponsable = true;
      } else if (type === 'operation') {
        this.modalTypeOperation = 'operation';
        this.showModalOperation = true;
      }
    },
    closeModal() {
      this.showModal = false;
      this.searchQuery = ''; // Réinitialiser la recherche lors de la fermeture de la modal
    },
    closeModalResponsable() {
      this.showModalResponsable = false;
      this.searchQueryResponsable = ''; // Réinitialiser la recherche lors de la fermeture de la modal
    },
    closeModalOperation() {
      this.showModalOperation = false;
      this.searchOperationQuery = ''; // Réinitialiser la recherche lors de la fermeture de la modal
    },
    toggleTransferSection() {
      this.showDispatchSection = !this.showDispatchSection;
      if (this.showDispatchSection) {
        this.cancelTransferText = 'Annuler transfert';
      } else {
        this.cancelTransferText = 'Transferer';
      }
    },
    selectPerson(person, type) {
      if (type === 'responsable') {
        this.responsable = person.name;
      } else {
        this.reclamant = person.name;
      }
      this.closeModal();
    },
    selectOperation(op) {
      this.selectedOperation = op;
      this.operation = op.code; // Mettre à jour le champ Opération avec le code
      this.closeModalOperation();
    },
    redirectToCreate(type) {
      if (type === 'responsable') {
        // Rediriger vers la page de création de responsable
        this.$router.push('/ResponsablePage');
        this.closeModalResponsable();
      } else {
        // Rediriger vers la page de création de réclamant
        this.$router.push('/ReclamantPage');
        this.closeModal();
      }
    },
    redirectToCreateOperation() {
      // Rediriger vers la page de création d'opération
      this.$router.push('/OperationPage');
      this.closeModalOperation();
    },
    clearSortBy() {
      // Logique de réinitialisation des filtres si nécessaire
    },
  },
  computed: {
    filteredPeople() {
      const query = this.searchQuery ? this.searchQuery.toLowerCase() : '';
      return this.people.filter(person =>
        person.name.toLowerCase().includes(query) ||
        person.cin.includes(query)
      );
    },
    filteredOperations() {
      const query = this.searchOperationQuery ? this.searchOperationQuery.toLowerCase() : '';
      return this.operations.filter(op =>
        op.code.toLowerCase().includes(query) ||
        op.description.toLowerCase().includes(query)
      );
    },
  },
  
};
</script>

<style scoped>
 
 .blue-borders {
   max-width: 900px;
   width: 100%;
   border-top: 4px solid rgb(0, 147, 215);
   margin-top: 2rem;
   background-color: white;
   border-radius: 5px;
   padding: 1rem;
 }
 
 .blue-borders h2 {
   font-size: 1.15rem;
   font-family: 'Poppins', sans-serif;
   padding: 0.5rem 1rem;
 }
 
 .rec-detail {
   margin-top: 30px;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
 }
 
 .input-box {
   width: calc(50% - 10px);
   margin-bottom: 1rem;
 }
 
 .input-box label,
 .input-box input,
 .input-box select {
   display: block;
   width: 100%;
   margin-bottom: 0.5rem;
 }
 
 .input-box input,
 .input-box select {
   height: 45px;
   padding: 0.5rem;
   font-size: 1rem;
   font-family: 'Poppins', sans-serif;
   border: 1px solid #ccc;
   border-radius: 4px;
 }
 
 .gender {
   width: calc(50% - 10px);
   margin-bottom: 1rem;
   display: flex;
   align-items: center;
 }
 
 .gender label {
   font-weight: 500;
   margin-right: 10px;
   cursor: pointer;
 }
 
 form :where(.gender label, .gender input) {
   cursor: pointer;
 }
 
 .titlgender {
   font-size: 17px;
   font-weight: 500;
 }
 
 
 input[type="radio"] {
   margin-right: 6px;
 }
 
 input[type="date"],
 select {
   cursor: pointer;
 }
 .button-submit {
   background-color: #3498db;
   color: white;
   border: none;
   padding: 10px 20px;
   font-size: 1rem;
   cursor: pointer;
   border-radius: 4px;
   transition: background-color 0.3s;
 }
 
 .button-submit:hover {
   background-color: #2980b9;
 }
 .button-container {
   margin-top: 2rem;
   margin-bottom: 20px;
   display: flex;
   justify-content: space-between; /* Alignement des boutons sur la même ligne */
 }
 .modal {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 999;
 }
 
 .modal-content {
   background-color: #fff;
   padding: 20px;
   width: 50%;
   max-width: 600px;
   border-radius: 8px;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   position: relative; 
 }
 
 .modal-content h3 {
   font-size: 1.2rem;
   margin-bottom: 10px;
 }
 
 .modal-content input {
   width: 100%;
   padding: 0.5rem;
   font-size: 1rem;
   border-radius: 4px;
   border: 1px solid #ccc;
   margin-bottom: 10px;
 }
 
 .modal-content ul {
   list-style-type: none;
   padding: 0;
 }
 
 .modal-content ul li {
   display: flex;
   justify-content: space-between; /* Pour séparer les colonnes */
   padding: 10px;
   cursor: pointer;
   transition: background-color 0.3s ease;
 }
 
 .modal-content ul li:hover {
   background-color: #f0f0f0;
 }
 
 .modal-item-cin,
 .modal-item-name {
   width: 50%; /* Diviser l'espace en deux colonnes égales */
 }
 
 .modal-content button {
   padding: 10px 20px;
   background-color: rgb(0, 147, 215);
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   margin-top: 10px;
 }
 
 .modal-content button:hover {
   background-color: rgb(0, 117, 175);
 }
 
 .modal-input {
   margin-bottom: 10px;
   padding: 0.5rem;
   width: 100%;
   font-size: 1rem;
   border-radius: 4px;
   border: 1px solid #ccc;
 }
 
 .modal-item {
   padding: 10px;
   cursor: pointer;
   transition: background-color 0.3s ease;
 }
 
 .modal-item:hover {
   background-color: #f0f0f0;
 }
 
 .modal-button {
   padding: 10px 20px;
   background-color: rgb(0, 147, 215);
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   margin-top: 10px;
 }
 
 .modal-button:hover {
   background-color: rgb(0, 117, 175);
 }
   
 .modal-button-new {
   position: absolute;
   bottom: 20px;
   right: 20px; /* Positionné à droite à l'intérieur de .modal-content */
   padding: 10px 20px;
   background-color: rgb(0, 147, 215);
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
 }
 
 .modal-button-new:hover {
   background-color: rgb(0, 117, 175);
 }
 .fade-enter-active, .fade-leave-active {
   transition: opacity 0.5s;
 }
 
 .fade-enter, .fade-leave-to {
   opacity: 0;
 }
 .input-with-icon {
   position: relative;
 }
 
 .input-with-icon input {
   padding-right: 30px; /* Ajustez l'espacement pour l'icône */
 }
 
 .search-icon {
   position: absolute;
   top: 50%;
   right: 10px; /* Ajustez l'espacement à droite */
   transform: translateY(-50%);
   cursor: pointer;
 }
 
 .search-icon i {
   color: #888;
 }
 
 .search-icon:hover i {
   color: #333;
 }
 </style>