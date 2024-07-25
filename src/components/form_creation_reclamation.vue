<template>
  <div class="page_container">
    <div class="title">
      <h1>Créer une réclamation</h1>
    </div>
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
  </div>
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
