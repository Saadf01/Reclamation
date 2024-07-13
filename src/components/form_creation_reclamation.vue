<template>
    <div class="page_container">
    <div class="title">
      <h1>Créer une réclamation</h1>
    </div>
    <form action="your_form_submission_url_here">
      <!-- Section Information réclamant -->
      <div class="blue-borders">
        <h2>Information réclamant</h2>
        <div class="rec-detail">
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
          <div class="input-box">
            <label for="respo" class="detail">Responsable</label>
            <input type="text" id="respo" name="respo" required>
          </div>
          <div class="gender">
            <label class="titlgender">Genre responsable</label>
            <input type="radio" name="genre_respo" id="Mr" value="Mr" required>
            <label for="Mr" class="detail">Masculin</label>
            <input type="radio" name="genre_respo" id="Fr" value="Fr" required>
            <label for="Fr" class="detail">Féminin</label>
          </div>
          <div class="input-box">
            <label for="relai" class="detail">Identification du relais réclamation</label>
            <input type="text" id="relai" name="relai" required>
          </div>
          <div class="input-box">
            <label for="ref" class="detail">Référence bureau d'ordre</label>
            <input type="text" id="ref" name="ref" required>
          </div>
          <div class="input-box">
            <label for="recep" class="detail">Réception de la réclamation</label>
            <input type="text" id="recep" name="recep" required>
          </div>
          <div class="input-box">
            <label for="date_s" class="detail">Date source de la réclamation</label>
            <input type="date" id="date_s" name="date_s" required>
          </div>
          <div class="input-box">
            <label for="id-op" class="detail">Id de l'opération</label>
            <input type="number" id="id-op" name="id-op" required>
          </div>
          <div class="input-box">
            <label for="nom-op" class="detail">Nom de l'opération</label>
            <input type="text" id="nom-op" name="nom-op" required>
          </div>
          <div class="input-box">
            <label for="ville" class="detail">Ville</label>
            <input type="text" id="ville" name="ville" required>
          </div>
        </div>
      </div>

      <!-- Section Donnee techniques -->
      <div class="blue-borders">
        <h2>Donnee techniques</h2>
        <div class="rec-detail">
          <div class="input-box">
            <label for="domaine" class="detail">Domaine concerne</label>
            <select id="domaine" v-model="sortBy" @change="clearSortBy">
              <option value="pid">PID</option>
            </select>
          </div>
          <div class="input-box">
            <label for="reception" class="detail">Reception B.O</label>
            <select id="reception" v-model="sortBy" @change="clearSortBy">
              <option value="Anciennes">Réclamations les plus anciennes</option>
              <option value="Recentes">Réclamations les plus récentes</option>
            </select>
          </div>
          <div class="input-box">
            <label for="source" class="detail">Source reclamation</label>
            <select id="source" v-model="sortBy" @change="clearSortBy">
              <option value="Anciennes">Réclamations les plus anciennes</option>
              <option value="Recentes">Réclamations les plus récentes</option>
            </select>
          </div>
          <div class="input-box">
            <label for="support" class="detail">Support de reclamation</label>
            <select id="support" v-model="sortBy" @change="clearSortBy">
              <option value="Anciennes">Réclamations les plus anciennes</option>
              <option value="Recentes">Réclamations les plus récentes</option>
            </select>
          </div>
          <div class="input-box">
            <label for="type" class="detail">Type reclamant</label>
            <select id="type" v-model="sortBy" @change="clearSortBy">
              <option value="Anciennes">Réclamations les plus anciennes</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Section Dispatching -->
      <div class="blue-borders">
        <h2>Dispatching</h2>
        <div class="rec-detail">
          <div class="input-box">
            <label for="disp" class="detail">Dispatching</label>
            <select id="disp" v-model="sortBy" @change="clearSortBy">
              <option value="sao">SAO</option>
              <option value="hao">HAO</option>
            </select>
          </div>
          <div class="input-box">
            <label for="filial" class="detail">Filiale</label>
            <select id="filial" v-model="sortBy" @change="clearSortBy">
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

      <!-- Bouton de soumission -->
      <div class="button">
        <input type="submit" value="Enregistrer">
      </div>
    </form>
  </div>
</template>
<script>
export default{
    name : "form_creation_reclamation"
}
</script>