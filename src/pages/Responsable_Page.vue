<template>
    <div class="page_container">
    <div class="title">
      <h1>Nouveau Responsable</h1>
    </div>
    <form >
      <!-- Section Information réclamant -->
      <div class="blue-borders">
    <div class="input-box">
        <label for="idrec" class="detail">Id responsable</label>
                <input type="text" id="idrec" name="idrec" required>
              </div>
              <div class="input-box">
                <label for="nomrec" class="detail">Nom responsable</label>
                <input type="text" id="nomrec" name="nomrec" required>
              </div>
              <div class="input-box">
                <label for="prenomrec" class="detail">Prénom responsable</label>
                <input type="text" id="prenomrec" name="prenomrec" required>
              </div>
              <div class="input-box">
                <label for="prenomrec" class="detail">Matricule</label>
                <input type="text" id="prenomrec" name="prenomrec" required>
              </div>
       <div class="gender">
                <label class="titlgender">Genre responsable</label>
                <input type="radio" name="genre_respo" id="Mr" value="Mr" required>
                <label for="Mr" class="detail">Masculin</label>
                <input type="radio" name="genre_respo" id="Fr" value="Fr" required>
                <label for="Fr" class="detail">Féminin</label>
              </div> 
              </div>
              <div class="button-container">
        <button id="transferButton" type="button" class="button-submit" @click="redirectToCreation">
          Annuler
        </button>
        <input type="submit" value="Enregistrer" class="button-submit">
      </div>
              </form>
              </div>
    </template>
    <script>
    export default{
        methods: {
          redirectToCreation(){
          this.$router.push('/CreerReclamation');
        }
        }
    }
    </script>