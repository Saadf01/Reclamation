<template>
    <div class="page_container">
    <div class="title">
      <h1>Nouvelle Operation</h1>
    </div>
    <form >
      <!-- Section Information réclamant -->
      <div class="blue-borders">
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
          <div class="button">
        <input type="submit" value="Enregistrer">
      </div>
          </form>
          </div>
          
</template>