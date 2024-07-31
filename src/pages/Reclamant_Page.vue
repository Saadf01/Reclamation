<template>
  <div class="page_container">
    <div class="title">
      <h1>Nouveau Réclamant</h1>
    </div>
    <form>
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
          <label for="numcin" class="detail">Numero CIN</label>
          <input type="text" id="numcin" name="numcin" required>
        </div>
       
        <div class="input-box">
          <label for="telc" class="detail">Numéro téléphone du contact (optionnel)</label>
          <input type="tel" id="telc" name="telc">
        </div>
      </div>
      <div class="input-box">
      <div class="gender">
          <label class="titlgender">Genre réclamant</label>
          <input type="radio" name="genre_rec" id="M" value="M">
          <label for="M" class="detail">Masculin</label>
          <input type="radio" name="genre_rec" id="F" value="F">
          <label for="F" class="detail">Féminin</label>
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
export default {
  methods: {
    redirectToCreation() {
      this.$router.push('/CreerReclamation');
    }
  }
}
</script>

<style scoped>
.page_container {
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  background: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 2em;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

.blue-borders {
  border: 2px solid #007bff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  background: white;
}

.input-box {
  margin-bottom: 15px;
}

.detail {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"], input[type="tel"] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  background: #fafafa;
}

input[type="radio"] {
  margin-right: 5px;
}

.titlgender {
  margin-right: 10px;
  font-weight: bold;
}

.gender {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.gender label {
  margin-right: 20px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.button-submit {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.3s ease;
}

.button-submit:hover {
  background: #0056b3;
}

.button-submit[type="button"] {
  background: #6c757d;
}

.button-submit[type="button"]:hover {
  background: #5a6268;
}
</style>
