<template>
  <div class="page_container">
    <div class="title">
      <h1>Créer une réclamation</h1>
    </div>
    <form @submit.prevent="submitform">
      <div class="blue-borders">
        <h2>Données techniques</h2>
        <div class="rec-detail">
          <div class="input-box">
           
            <CustomDropdown 
              :options="[{ text: 'PID', value: 'pid' }]" 
              v-model="formState.domaine"
              icon="domaine"
              label="Domaine concerné"
            />
          </div>
          <div class="input-box">
            <CustomDropdown 
              :options="[{ text: 'Réclamations les plus anciennes', value: 'Anciennes' }, { text: 'Réclamations les plus récentes', value: 'Recentes' }]" 
              v-model="formState.receptionBO"
              icon="source"
              label="Réception B.O"
            />
          </div>
          <div class="input-box">
            <label for="type" class="detail">Type réclamant</label>
            <select id="type" v-model="formState.typeReclamant" @change="clearSortBy">
              <option value="Anciennes">Client</option>
              <option value="Anciennes">Fournisseur</option>
              <option value="Anciennes">Ayant droit foncier</option>
              <option value="Anciennes">Administration</option>
              <option value="Anciennes">Societe civile</option>
              <option value="Anciennes">Autre citoyen</option>
            </select>
          </div>
          <div class="input-box">
            <CustomDropdown 
              :options="[{ text: 'Réclamations les plus anciennes', value: 'Anciennes' }, { text: 'Réclamations les plus récentes', value: 'Recentes' }]" 
              v-model="formState.supportReclamation"
              icon="source"
              label="Support de réclamation"
            />
          </div>
          <div class="input-box">
            <CustomDropdown 
              :options="sources"
              v-model="formState.sourceReclamation"
              icon="source"
              label="Source réclamation"
            />
          </div>
          <div class="input-box" v-if="showNumeroDossier">
            <label for="idrec" class="detail">Numéro du dossier médiateur</label>
            <input type="text" id="idrec" v-model="formState.numeroDossier" required>
          </div>
        </div>
      </div>  
      <div class="blue-borders">
        <h2>Données d'organisation</h2>
        <div class="rec-detail">
          <div class="input-box">
            <CustomDropdown 
              :options="people.map(person => ({ text: person.name, value: person.cin }))" 
              v-model="formState.societe"
              icon="source"
              label="Société"
            />
          </div>
          <div class="input-box">
            <CustomDropdown 
              :options="people.map(person => ({ text: person.name, value: person.cin }))" 
              v-model="formState.agence"
              icon="source"
              label="Agence commerciale"
            />
          </div>
          
         
        </div>
      </div>
      <!-- Section Information réclamant -->
      <div class="blue-borders">
        <h2>Données générales</h2>        
        <div class="rec-detail">
          <div class="input-box">
            <CustomDropdown 
              :options="people.map(person => ({ text: person.name, value: person.cin }))" 
              v-model="formState.reclamant"
              icon="plus"
              label="Réclamant"  
              @icon-click="redirectToNewReclamant" 
            />
          </div>
          <div class="input-box">
            <CustomDropdown 
              :options="filteredResponsables.map(person => ({ text: person.name, value: person.cin }))" 
              v-model="formState.responsable"
              icon="plus"
              label="Responsable"
            />
          </div>
          <div class="input-box">
            <CustomDropdown 
              :options="filteredOperations.map(op => ({ text: op.description, value: op.code }))" 
              v-model="formState.operation"
              icon="plus"
              label="Opération"
            />
          </div>
          <div class="input-box">
            <label for="relai" class="detail">Identification du relais réclamation</label>
            <input type="text" id="relai" name="relai" v-model="formState.identificationRelais">
          </div>
          <div class="input-box">
            <label for="ref" class="detail">Référence bureau d'ordre</label>
            <input type="text" id="ref" name="ref" v-model="formState.referenceBureau">
          </div>
          <div class="input-box">
            <label for="recep" class="detail">Date réception</label>
            <input type="date" id="recep" name="recep" v-model="formState.receptionReclamation">
          </div>
          <div class="input-box">
            <label for="date_dec" class="detail">Date de déclaration</label>
            <input type="date" id="date_dec" name="date_dec" v-model="formState.dateSource">
          </div>
          <div class="input-box">
            <label for="date_souh" class="detail">Date de réponse souhaitée</label>
            <input type="date" id="date_souh" name="date_souh" v-model="formState.dateSource">
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
        <h2>Pieces jointes</h2>
        <div class="rec-detail">
          <div class="input-box file-input-box">
            <div class="custom-file-input" @click="triggerFileInput('pdfInput')">Sélectionner un fichier PDF</div>
            <input type="file" id="pdf-upload" name="pdf-upload" accept=".pdf" @change="handleFileUpload" ref="pdfInput" class="hidden-input">
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
import '@vueform/multiselect/themes/default.css'
import { formState } from '@/Save';
import CustomDropdown from './CustomDropdown.vue';
export default {
  components: {
    CustomDropdown
  },
  data() {
    return {
      formState,
      domaines: [{ text: 'PID', value: 'pid' }],
      receptions: [
        { text: 'Réclamations les plus anciennes', value: 'Anciennes' },
        { text: 'Réclamations les plus récentes', value: 'Recentes' },
      ],
      sources: [
        { text: 'client', value: 'client' },
        { text: 'Médiateur du royaume', value: 'mediateur' },
      ],
      supports: [
        { text: 'Réclamations les plus anciennes', value: 'Anciennes' },
        { text: 'Réclamations les plus récentes', value: 'Recentes' },
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
        { name: 'John Doe', cin: '123456', type: 'reclamant' },
        { name: 'Jane Doe', cin: '654321', type: 'responsable' },
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
    
    watch: {
      'formState.sourceReclamation'(newValue) {
      console.log('sourceReclamation changed to:', newValue);
      this.showNumeroDossier = newValue === 'mediateur';
      console.log('showNumeroDossier:', this.showNumeroDossier);
    }
  },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      console.log('PDF File uploaded:', file);
      // Handle the file upload logic here
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      console.log('Image uploaded:', file);
      // Handle the image upload logic here
    },
    triggerFileInput(refName) {
      this.$refs[refName].click();
    },
    toggleTransferSection() {
      this.showDispatchSection = !this.showDispatchSection;
      if (this.showDispatchSection) {
        this.cancelTransferText = 'Annuler transfert';
      } else {
        this.cancelTransferText = 'Transferer';
      }
    },
    onReclamantInput(value) {
      this.searchQuery = value;
      this.errorReclamant = '';
    },
    onResponsableInput(value) {
      this.searchQueryResponsable = value;
      this.errorResponsable = '';
    },
    onOperationInput(value) {
      this.searchOperationQuery = value;
      this.errorOperation = '';
    },
    redirectToNewReclamant() {
      this.$router.push('/ReclamantPage'); // Adjust the route as needed
    },
    redirectToNewResponsable() {
      this.$router.push('/ResponsablePage'); // Adjust the route as needed
    },
    redirectToNewOperation() {
      this.$router.push('/OperationPage'); // Adjust the route as needed
    },
    submitform() {
      // Logic for form submission
      if (!this.errorReclamant && !this.errorResponsable && !this.errorOperation) {
        // Process form submission
      }
    }
  }
};
</script>
<style scoped>
.hidden-input {
  display: none;
}
</style>