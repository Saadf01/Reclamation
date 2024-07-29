<template>
 <form_creation_reclamation />
</template>
<script>
import form_creation_reclamation from "../components/form_creation_reclamation.vue"
export default {
  name: "CreerReclamationPage",
  components:{
    form_creation_reclamation,
  },
  data() {
    return {
      sortBy: ''
    };
  },
  methods: {
    clearSortBy() {
      // Méthode pour réinitialiser sortBy si nécessaire
    }
  }
};
</script>

<style>
.page_container {
  background-color: #f0f0f0;
  min-height: 100vh;
  padding: 0rem 2rem;
}

.title {
  padding-top: 1rem;
}

.title h1 {
  font-size: 1.5rem;
  font-family: 'Poppins', sans-serif;
}

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
.input-box select,
.input-box textarea  {
  display: block;
  width: 100%;
  margin-bottom: 0.5rem;
}

.input-box input,
.input-box select,
.input-box textarea  {
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
  padding-right: 40px;
}


.file-input-box {
  position: relative;
}

.hidden-input {
  display: none;
}

.custom-file-input {
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.custom-file-input:hover {
  background-color: #e0e0e0;
}
.error-message {
  color: red;
  font-size: 0.875rem;
}
.input-with-icon {
  display: flex;
  align-items: center;
}

.input-with-icon .icon {
  margin-left: 8px;
  cursor: pointer;
}
.multiselect__option--highlight:after {
  background-color: lightblue ; /* Change this color to the desired one */
}
</style>