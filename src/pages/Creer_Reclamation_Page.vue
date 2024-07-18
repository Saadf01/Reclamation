<template>
  <div class="page_container">
    <div class="title">
      <h1>Créer une réclamation</h1>
    </div>

    <div class="saisi_form">
      <form_creation_reclamation />  
    </div>
    
  </div>

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

<style scoped>

.page_container {
  background-color: #f0f0f0;
  height: 100%;
  padding: 0rem 2rem;
  margin-bottom: 2rem;
}

.title {
  padding-top: 1rem;
}

.title h1 {
  font-size: 1.5rem;
  font-family: 'Poppins', sans-serif;
}

.saisi_form {
  display: flex;
  justify-content: center;
}


</style>