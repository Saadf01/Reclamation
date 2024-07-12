<!-- eslint-disable -->
<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <span class="omrane">al omrane</span>
      </div>
      <div class="rec">
        <span class="reclamation">Gestion des réclamations</span>
      </div>
      <div class="user-menu" @mouseleave="closeDropdown">
        <button class="user-menu-button" @click="toggleDropdown">
          <span class="username">{{ userName }}</span>
          <span class="material-icons" :class="{ 'rotate-arrow': dropdownOpen }">keyboard_arrow_left</span>
        </button>
        <ul v-if="dropdownOpen" class="dropdown slide-down">
          <li><a href="#">Profil</a></li>
          <li><a href="#">Paramètres</a></li>
          <li><a href="#">Déconnexion</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const userName = 'Saad FILALI';
const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
  dropdownOpen.value = false;
};

// Fonction pour fermer le menu si on clique à l'extérieur
const handleClickOutside = (event) => {
  const headerContent = document.querySelector('.header-content');
  if (headerContent && !headerContent.contains(event.target)) {
    dropdownOpen.value = false;
  }
};

// Écouteur d'événement au montage du composant
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// Nettoyage de l'écouteur d'événement à la destruction du composant
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>


<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Assure que le header est au-dessus du reste du contenu */
  background-color: #049004;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.logo {
  background-color: #006400; 
  padding: 0.9rem 0rem;
  color: white;
  width: var(--sidebar-width); /* Utilisez la variable appropriée */
  display: flex;
  align-items: center;
  justify-content: center;
}

.omrane {
  color: white;
  font-weight: bold;
  font-size: 1.3rem; 
  font-family: 'Poppins', sans-serif;
}

.rec {
  padding-left: 2rem;
}

.reclamation {
  color: #ffffff;
  font-size: 1.1rem;
  font-family: Arial, Helvetica, sans-serif;
}

.user-menu {
  margin-left: auto;
  position: relative;
}

.user-menu-button {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding: 1.1rem 1rem;
  transition: background-color 0.3s ease-in-out; /* Transition pour le fond */
}

.user-menu-button:hover {
  background-color: rgba(255, 255, 255, 0.1); /* Couleur de fond au survol */
}

.user-menu-button .username {
  margin-right: 0.5rem;
}

.user-menu-button .material-icons {
  margin-left: auto; /* Place l'icône à droite du bouton */
  transition: transform 0.3s ease; /* Transition pour la rotation */
}

.rotate-arrow {
  transform: rotate(-90deg); /* Rotation de l'icône vers la gauche */
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--dark);
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: none; /* Par défaut, le menu est caché */
}

.user-menu:hover .dropdown {
  display: block;
}


.dropdown li a {
  text-decoration: none;
  color: #ffffff;
  display: block;
  padding: 0.7rem;
}

.dropdown li a:hover {
  background-color: var(--dark-alt);
  color: var(--primary);
  transition: 0.2s ease-in-out;
}
</style>
