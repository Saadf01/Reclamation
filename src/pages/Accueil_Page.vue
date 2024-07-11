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
export default {
  name: 'AccueilPage'
}
</script>
<style>
body{
  margin:0px;
  font-size: 15px;
}
.lateral,.rec,.menu{
  display:inline-block;
}
.lateral{
  padding:15px;
  background-color: green;
  height: 20px;
  width: 150px;
}
.rec{
  margin-left : 20px; 
}
.menu{
  margin-left:860px;
}
#menuser{
  border:none;
  appearance: none;
  padding:0 30px 0 15px;
  width:100%  ;
  color:white;
  background-color:#0dd345;
  height: 20px;
}
.header{
background-color:#0dd345;
height:50px;
color:white;
}

.menu .icon{
  position: absolute;
  right: 40px;
  pointer-events: none;
}       
#menu-vertical, #menu-vertical ul {
  padding:0;
  margin:0;
  list-style:none;
  width: 180px; /* seule ligne rajoutée */
}
#menu-vertical ol{
  position: relative;
  background:#EFEFEF;
  margin-left: -6px; /* juste pour cacher le texte de la page en-dessous */
}
</style>