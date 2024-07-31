<template>
  <div class="page_container">

    <div class="title">
      <h1>Créer une réclamation</h1>
    </div>

    <form @submit.prevent="submitform">
      <div class="blue-borders">
        <h2>Données d'organisation</h2>

        <div class="rec-detail">

          <div class="input-box">
            <CustomDropdown 
              :options="societe" 
              v-model="formState.societe"
              icon="apartment"
              label="Société"
            />
          </div>

          <div class="input-box">
            <CustomDropdown 
              :options="societe" 
              v-model="formState.agence"
              icon="apartment"
              label="Agence commerciale"
            />
          </div>
          
        </div>
      </div>
      <div class="blue-borders">
        <h2>Données techniques</h2>

        <div class="rec-detail">

          <div class="input-box">
            <CustomDropdown 
              :options="domaine" 
              v-model="formState.domaine"
              icon="category"
              label="Domaine concerné"
            />
          </div>

          <div class="input-box">
            <CustomDropdown 
              :options="reception_bo" 
              v-model="formState.receptionBO"
              icon="domain"
              label="Réception B.O"
            />
          </div>

          <div class="input-box">
            <CustomDropdown 
              :options="typesReclamant" 
              v-model="formState.typesReclamant"
              icon="source"
              label="Type réclamant"
            />
          </div>

          <div class="input-box">
            <CustomDropdown 
              :options="support" 
              v-model="formState.supportReclamation"
              icon="mail"
              label="Support de réclamation"
            />
          </div>

          <div class="input-box">
            <CustomDropdown 
              :options="sources"
              v-model="formState.sourceReclamation"
              icon="source"
              label="Source réclamation"
              @input="updateNumeroDossierVisibility($event)"
            />
          </div>

          <div class="input-box" v-if="showNumeroDossier">
            <label for="idrec" class="detail">Numéro du dossier médiateur</label>
            <input type="text" id="idrec" v-model="formState.numeroDossier" required>
          </div>

        </div>
      </div> 

      

      <!-- Section Information réclamant -->
      <div class="blue-borders">
        <h2>Données générales</h2>    

        <div class="rec-detail">

          <div class="input-box">
      <div class="input-container">
        <CustomDropdown 
          :options="filteredReclamants.map(person => ({ text: person.name, value: person.cin }))" 
          v-model="formState.reclamant"
          icon="add"
          label="Réclamant"  
          redirectTo="/ReclamantPage"
        />
      </div>
    </div>

    <div class="input-box">
      <div class="input-container">
        <CustomDropdown 
          :options="filteredResponsables.map(person => ({ text: person.name, value: person.mat }))" 
          v-model="formState.responsable"
          icon="add"
          label="Responsable"
          redirectTo="/ResponsablePage"
        />
      </div>
    </div>

    <div class="input-box">
      <div class="input-container">
        <CustomDropdown 
          :options="filteredOperations.map(op => ({ text: op.description, value: op.code }))" 
          v-model="formState.operation"
          icon="add"
          label="Opération"
          redirectTo="/OperationPage"

        />
      </div>
    </div>
          <div class="input-box">
            <label for="relai" class="detail">Identification du relais réclamation</label>
            <input type="text" id="relai" name="relai" v-model="formState.identificationRelais">
          </div>

          <div class="input-box">
            <div class="filter-section" >
      <div class="filter-label">
        
        <label>Référence bureau d'ordre</label>
      </div>
      <input type="text" id="ref" name="ref" v-model="formState.referenceBureau" >
    </div>
          </div>
          <div class="input-box">
          <div class="filter-section" >
      <div class="filter-label">
        <span class="material-icons">today</span>
        <label>Date de reception</label>
      </div>
      <input type="date" v-model="formState.dateReception" >
    </div>
</div>
          <div class="input-box">
            <div class="filter-section" >
      <div class="filter-label">
        <span class="material-icons">today</span>
        <label>Date de declaration</label>
      </div>
      <input type="date" v-model="formState.dateDeclaration" >
    </div>
          </div>

          <div class="input-box">
              <div class="filter-section" >
      <div class="filter-label">
        <span class="material-icons">today</span>
        <label>Date de réponse souhaitée</label>
      </div>
      <input type="date" v-model="formState.dateReponse" >
    </div>
          </div>

          <div class="input-box">
            <label for="textarea1" class="detail">Description</label>
            <textarea id="textarea1" name="textarea1" v-model="formState.textarea1"></textarea>
          </div>

          <div class="input-box">
            <label for="textarea2" class="detail">Dispositions particulieres</label>
            <textarea id="textarea2" name="textarea2"></textarea>
          </div>

          <div class="input-box">
            <label for="textarea3" class="detail">Commentaire</label>
            <textarea id="textarea3" name="textarea3"></textarea>
          </div>

        </div>
      </div>

      <div class="blue-borders">
  <h2>Pièces jointes</h2>
  <button @click="openFileDialog" class="open-popup-button">Sélectionner des fichiers</button>
  
  <!-- Popup -->
  <div v-if="showPopup" class="popup-overlay">
    <div class="popup-content">
      <h3>Ajouter des fichiers</h3>
      <input type="file" id="file-upload-popup" name="file-upload-popup" accept=".pdf,.png,.jpeg,.jpg,.doc,.docx" multiple @change="handleFileUpload" class="file-input-popup">
      <div class="file-list">
        <div v-for="(file, index) in tempFiles" :key="index" class="file-item">
          {{ file.name }}
          <button @click="removeTempFile(index)" class="remove-file-button">Supprimer</button>
        </div>
      </div>
      <div class="popup-buttons">
        <button @click="saveFiles" class="save-files-button">Enregistrer</button>
        <button @click="closeFileDialog" class="cancel-button">Annuler</button>
      </div>
    </div>
  </div>
</div>    

      
      <div class="button-container">
        <input type="submit" value="Enregistrer" class="button-submit">
      </div>

    </form>
  </div>
</template>

<script>
import { formState } from '@/Save';
import CustomDropdown from './CustomDropdown.vue';

export default {
  components: {
    CustomDropdown
  },
  data() {
    return {
      files: [],
      showPopup: false,
      tempFiles: [],
      savedFiles: [],
      formState,
      domaine: [
          { text: 'Relation avec l\'agent d\'accueil',value:'acceuil' },
          { text: 'Accueil - Renseignements',value:'acceuil-renseignement' },
          { text: 'Accès à l\'information',value:'acce info'},
          { text: 'Relation fournisseur de service',value:'fou' },
          { text: 'Acquisition d\'un produit' ,value:'produit'},
          { text: 'Relations PPP',value:'ppp' },
          { text: 'Relations clients',value:'relation-client' },
          { text: 'Service après vente',value:'s-a-v' },
          { text: 'Relation prestataires techniques',value:'r-p-t' },
          { text: 'Autres affaires techniques',value:'a-f-t' },
          { text: 'Relation ayants droits fonciers',value:'droit foncier' },
          { text: 'Etablissement de TF individuels',value:'etablissement' },
          { text: 'Affaires financières',value:'a-f' },
          { text: 'Affaires juridiques',value:'a-j' },
          { text: 'Affaires sociales et sociétales',value:'a-s-s' },
          { text: 'Affaires administratives',value:'a-ad' },
          { text: 'Dénonciation, corruption et fraudes',value:'d-c-f' },
          { text: 'Autres',value:'autre' }
        ],
     
      sources: [
          { text: 'Réclamant' },
          { text: 'Médiateur du Royaume' , value:'mediateur'},
          { text: 'Administration' },
          { text: 'Société civile' },
          { text: 'chikaya.com' },
          { text: 'Autre' }
        ],
      societe: [
          { text: 'Holding Al Omrane' },
          { text: 'Al Omrane Tanger-Tétouan-Al Hoceïma' },
          { text: 'Al Omrane Casablanca - Settat' },
          { text: 'Al Omrane Fès Meknès' },
          { text: 'Al Omrane Darâa Tafilalet' },
          { text: 'Al Omrane Région de l\'Oriental' },
          { text: 'Al Omrane Marrakech Safi' },
          { text: 'Al Omrane Souss Massa' },
          { text: 'Al Omrane Al Janoub' },
          { text: 'Al Omrane Beni Mellal Khenifra' },
          { text: 'Al Omrane Rabat-Salé-Kénitra' }
        ],
        reception_bo: [
          { text: 'HAO' },
          { text: 'SAO' }
        ],
      support: [
          { text: 'Courrier' },
          { text: 'Contact Direct (Fiche)' },
          { text: 'Téléphone (Standard)' },
          { text: 'Centre d\'appels' },
          { text: 'Site Web' },
          { text: 'Autre' }
        ],
      typesReclamant: [
        { text: 'Client', value: 'Client' },
        { text: 'Fournisseur', value: 'Fournisseur' },
        { text: 'Ayant droit foncier', value: 'Ayant droit foncier' },
        { text: 'Administration', value: 'Administration' },
        { text: 'Société civile', value: 'Société civile' },
        { text: 'Autre citoyen', value: 'Autre citoyen' },
      ],
      people: [
        { name: 'Rayane', cin: '123456', type: 'reclamant' },
        { name: 'Saad', mat: '654321', type: 'reclamant' },
        { name: 'employe 1', mat: '654321', type: 'responsable' },
        { name: 'employe 2', mat: '654321', type: 'responsable' },
        // Ajoutez d'autres personnes selon vos besoins
      ],
      operations: [
        { description: 'Operation 1', code: 'OP1' },
        { description: 'Operation 2', code: 'OP2' },
        // Ajoutez d'autres opérations selon vos besoins
      ],
      showNumeroDossier: false,
      searchQuery: '',
      searchQueryResponsable: '',
      searchOperationQuery: '',
      errorReclamant: '',
      errorResponsable: '',
      errorOperation: '',
      showDispatchSection: false,
      cancelTransferText: 'Transferer'
    };
  },
  computed: {
    filteredReclamants() {
      return this.people.filter(person => person.type === 'reclamant');
    },
    filteredResponsables() {
      return this.people.filter(person => person.type === 'responsable');
    },
    filteredOperations() {
      return this.operations;
    },
  },
  methods: {
    openFileDialog() {
      this.tempFiles = [...this.savedFiles];
      this.showPopup = true;
    },
    closeFileDialog() {
      this.showPopup = false;
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files);
      const maxSize = 5 * 1024 * 1024; // 5 Mo en octets
      const validFiles = [];

      files.forEach(file => {
        if (file.size > maxSize) {
          alert(`Le fichier ${file.name} ne doit pas dépasser 5 Mo.`);
        } else {
          const url = URL.createObjectURL(file);
          validFiles.push({ name: file.name, url });
        }
      });

      this.tempFiles = [...this.tempFiles, ...validFiles];
    },
    saveFiles() {
      this.savedFiles = [...this.tempFiles];
      this.closeFileDialog();
    },
    removeTempFile(index) {
      this.tempFiles.splice(index, 1);
    },
    triggerFileInput(refName) {
      this.$refs[refName].click();
    },
    
   
    submitform() {
      // Logic for form submission
      if (!this.errorReclamant && !this.errorResponsable && !this.errorOperation) {
        // Process form submission
      }
    },
    updateNumeroDossierVisibility(value) {
      this.showNumeroDossier = value === 'mediateur';
    }
  }
};
</script>

<style >
.hidden-input {
  display: none;
}


.icon-add {
  color: rgb(0, 94, 255); /* Couleur de l'icône */
  font-size: 24px; /* Taille de l'icône */
  cursor: pointer; /* Curseur pointer au survol */
  margin-right: 8px; /* Espace entre l'icône et le label */
  transition: color 0.2s ease-out; /* Effet de transition */
}

.icon-add:hover {
  color: rgba(0, 94, 255, 0.7); /* Couleur de l'icône au survol */
}


.open-popup-button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.popup-content h3 {
  margin-top: 0;
  font-size: 18px;
}

.file-input-popup {
  margin-bottom: 15px;
}

.file-list {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 15px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid #ddd;
}

.remove-file-button {
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 3px 6px;
  cursor: pointer;
  font-size: 14px;
}

.popup-buttons {
  display: flex;
  justify-content: flex-end;
}

.save-files-button,
.cancel-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}

.save-files-button {
  background-color: #28a745;
  color: #fff;
}
 
.cancel-button {
  background-color: #6c757d;
  color: #fff;
}

</style>