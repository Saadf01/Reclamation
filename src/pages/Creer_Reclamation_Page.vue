<template>
  <div class="page_container">
    <div class="title">
      <h1>Créer une réclamation</h1>
    </div>

    <div class="saisi_form">
      <Form_Creation_Reclamation />  
    </div>
    
  </div>

</template>


<script>
import Form_Creation_Reclamation from "../components/Form_Creation_Reclamation.vue"
export default {
  name: "CreerReclamationPage",
  components:{
    Form_Creation_Reclamation,
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
  min-height: 100vh;
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