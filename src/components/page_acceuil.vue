<template>
     <div class="header">
    <div class="lateral">
      <span class="omrane">Al omrane</span>
    </div>
    <div class="rec">
     <span class="reclamation">Gestion des reclamations</span>
    </div>
    <div class="menu">
      <div class="select">
     <select name="menu" id="menuser">
      <option value="user">Acceuil </option>
      <option value="dog">profil</option>
      <option value="cat">parametres</option>
      <option value="parrot">Tableau de bord</option>
      <option value="hamster">deconnexion</option>
  </select>
    <font-awesome-icon :icon="['fas', 'caret-down']" class="icon"/>
</div>
</div>
  </div>
    <ul id="menu-vertical">
      <ol><a href="">Acceuil</a></ol>
      <li>Reclamation</li>
      <ul>
      <ol><a href="#">Liste des reclamations</a></ol>
      <ol><a href="#">Creer une reclamation</a></ol>
      </ul>
      </ul>
</template>
<script>
</script>