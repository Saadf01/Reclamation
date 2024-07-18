// src/state.js
import { reactive } from 'vue';

export const formState = reactive({
  reclamant: '',
  responsable: '',
  operation: '',
  identificationRelais: '',
  referenceBureau: '',
  receptionReclamation: '',
  dateSource: '',
  domaine: '',
  receptionBO: ''
});
    