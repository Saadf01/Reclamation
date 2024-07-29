<template>
  <div class="page_container">
    <div class="title">
      <h1>Nouveau Réclamant</h1>
    </div>
    <form >
      <!-- Section Information réclamant -->
      <div class="blue-borders">
    <div class="input-box">
    <label for="idrec" class="detail">Id réclamant</label>
            <input type="text" id="idrec" name="idrec" required>
          </div>
          <div class="input-box">
            <label for="nomrec" class="detail">Nom réclamant</label>
            <input type="text" id="nomrec" name="nomrec" required>
          </div>
          <div class="input-box">
            <label for="prenomrec" class="detail">Prénom réclamant</label>
            <input type="text" id="prenomrec" name="prenomrec" required>
          </div>
          <div class="input-box">
            <label for="prenomrec" class="detail">Numero CIN</label>
            <input type="text" id="prenomrec" name="prenomrec" required>
          </div>
          <div class="gender">
            <label class="titlgender">Genre réclamant</label>
            <input type="radio" name="genre_rec" id="M" value="M">
            <label for="M" class="detail">Masculin</label>
            <input type="radio" name="genre_rec" id="F" value="F">
            <label for="F" class="detail">Féminin</label>
          </div>
          <div class="input-box">
            <label for="telc" class="detail">Numéro téléphone du contact (optionnel)</label>
            <input type="tel" id="telc" name="telc">
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