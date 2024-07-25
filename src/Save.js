// src/state.js
import { reactive } from 'vue';

export const formState = reactive({
  reclamant: undefined,
  responsable: '',
  operation: '',
  identificationRelais: '',
  referenceBureau: '',
  receptionReclamation: '',
  dateSource: '',
  domaine: '',
  receptionBO: '',
  textarea1: '', // New textarea
        textarea2: '', // New textarea
        textarea3: '',
        centreTraitementhao:'',
        centreTraitementsao:'',
        datedebut:'',
        datefin:'',
        importance:'',
        avancement:''
});
    