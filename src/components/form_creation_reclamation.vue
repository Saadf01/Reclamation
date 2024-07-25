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
            <label for="domaine" class="detail">Domaine concerné</label>
            <select id="domaine" v-model="formState.domaine" @change="clearSortBy">
              <option value="pid">PID</option>
            </select>
          </div>
          <div class="input-box">
            <label for="reception" class="detail">Réception B.O</label>
            <select id="reception" v-model="formState.receptionBO" @change="clearSortBy">
              <option value="Anciennes">Réclamations les plus anciennes</option>
              <option value="Recentes">Réclamations les plus récentes</option>
            </select>
          </div>
          <div class="input-box">
            <label for="source" class="detail">Source réclamation</label>
            <select id="source" v-model="formState.sourceReclamation" @change="clearSortBy">
              <option value="Anciennes">Réclamations les plus anciennes</option>
              <option value="Recentes">Réclamations les plus récentes</option>
            </select>
          </div>
          <div class="input-box">
            <label for="support" class="detail">Support de réclamation</label>
            <select id="support" v-model="formState.supportReclamation" @change="clearSortBy">
              <option value="Anciennes">Réclamations les plus anciennes</option>
              <option value="Recentes">Réclamations les plus récentes</option>
            </select>
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
        </div>
      </div>  
      <div class="blue-borders">
        <h2>Données d'organisation</h2>
        <div class="rec-detail">
          <div class="input-box">
            <label for="idrec" class="detail">Société</label>
            <Multiselect
              v-model="formState.societe"
              :options="people"
              label="name"
              track-by="name"
              placeholder="Sélectionner ou rechercher..."
              :searchable="true"
              :taggable="true"
              :add-tag="addSocieteTag"
              @select="onSocieteSelect"
              class="custom-multiselect"

            />
            <p v-if="errorSociete" class="error-message">{{ errorSociete }}</p>
          </div>
          <div class="input-box">
            <label for="idrec" class="detail">Agence commerciale</label>
            <Multiselect
              v-model="formState.agence"
              :options="people"
              label="name"
              track-by="name"
              placeholder="Sélectionner ou rechercher..."
              :searchable="true"
              :taggable="true"
              :add-tag="addAgenceTag"
              @select="onAgenceSelect"
            />
            <p v-if="errorAgence" class="error-message">{{ errorAgence }}</p>
          </div>
          <div class="input-box">
            <label for="idrec" class="detail">Numéro du dossier médiateur</label>
            <input type="text" id="idrec" v-model="formState.numeroDossier" required>
          </div>
          <div class="input-box">
            <label for="idrec" class="detail">Destination de la réponse</label>
            <Multiselect
              v-model="formState.destinationReponse"
              :options="people"
              label="name"
              track-by="name"
              placeholder="Sélectionner ou rechercher..."
              :searchable="true"
              :taggable="true"
              :add-tag="addDestinationTag"
              @select="onDestinationSelect"
            />
            <p v-if="errorDestination" class="error-message">{{ errorDestination }}</p>
          </div>
        </div>
      </div>
      <!-- Section Information réclamant -->
      <div class="blue-borders">
        <h2>Données générales</h2>
        <div class="rec-detail">
          <div class="input-box">
            <label for="idrec" class="detail">Réclamant</label>
            <div class="input-with-icon">
              <Multiselect
                v-model="formState.reclamant"
                :options="filteredReclamants"
                label="name"
                track-by="id"
                placeholder="Sélectionner ou rechercher..."
                @input="onReclamantInput"
                :searchable="true"
              />
              <font-awesome-icon icon="plus" class="icon" @click="redirectToNewReclamant" />
            </div>
            <p v-if="errorReclamant" class="error-message">{{ errorReclamant }}</p>
          </div>
          <div class="input-box">
            <label for="respo" class="detail">Responsable</label>
            <div class="input-with-icon">
              <Multiselect
                v-model="formState.responsable"
                :options="filteredResponsables"
                label="name"
                track-by="id"
                placeholder="Sélectionner ou rechercher..."
                @input="onResponsableInput"
                :searchable="true"
              />
              <font-awesome-icon icon="plus" class="icon" @click="redirectToNewResponsable" />
            </div>
            <p v-if="errorResponsable" class="error-message">{{ errorResponsable }}</p>
          </div>
          <div class="input-box">
            <label for="id-op" class="detail">Opération</label>
            <div class="input-with-icon">
              <Multiselect
                v-model="formState.operation"
                :options="filteredOperations"
                label="description"
                track-by="code"
                placeholder="Sélectionner ou rechercher..."
                @input="onOperationInput"
                :searchable="true"
              />
              <font-awesome-icon icon="plus" class="icon" @click="redirectToNewOperation" />
            </div>
            <p v-if="errorOperation" class="error-message">{{ errorOperation }}</p>
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

      <!-- Section Données techniques -->
      
      


      <!-- Section traitement reclamation -->
      <div class="blue-borders">
        <h2>Détail traitement réclamation</h2>
        <div class="rec-detail">
          <div class="input-box">
            <label for="disp" class="detail">Tâche</label>
            <input type="text" id="disp" v-model="formState.tache">
          </div>
          <div class="input-box">
            <label for="resp-tach" class="detail">Téléphone du responsable de la tâche</label>
            <input type="text" id="resp-tach" v-model="formState.telephoneResponsableTache">
          </div>
          <div class="input-box">
            <label for="hao" class="detail">Entite</label>
            <select id="hao" v-model="formState.centreTraitementhao" @change="clearSortBy">
              <option value="pid">PID</option>
            </select>
          </div>
          <div class="input-box">
            <label for="dao" class="detail">Centre de traitement DAO</label>
            <select id="dao" v-model="formState.centreTraitementdao" @change="clearSortBy">
              <option value="pid">PID</option>
            </select>
          </div>
          <div class="input-box">
            <label for="relai" class="detail">Numéro de relais réclamation</label>
            <input type="text" id="relai" v-model="formState.numeroRelais">
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
          <div class="input-box file-input-box">
            <div class="custom-file-input" @click="triggerFileInput('imageInput')">Sélectionner une image</div>
            <input type="file" id="image-upload" name="image-upload" accept="image/*" @change="handleImageUpload" ref="imageInput" class="hidden-input">
          </div>
        </div>
      </div>
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
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { formState } from '@/Save';

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      formState,
      people: [
        { id: 1, cin: '12345678', name: 'John Doe' },
        { id: 2, cin: '87654321', name: 'Jane Smith' },
        { id: 3, cin: '98765432', name: 'Alice Johnson' }
      ],
      operations: [
        { code: 'OP001', description: 'Opération 1' },
        { code: 'OP002', description: 'Opération 2' },
        { code: 'OP003', description: 'Opération 3' }
      ],
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
      const query = this.searchQuery ? this.searchQuery.toLowerCase() : '';
      return this.people.filter(person =>
        person.name.toLowerCase().includes(query) ||
        person.cin.includes(query)
      );
    },
    filteredResponsables() {
      const query = this.searchQueryResponsable ? this.searchQueryResponsable.toLowerCase() : '';
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
    }
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