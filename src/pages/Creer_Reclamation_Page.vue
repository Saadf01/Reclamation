<template>
 <form_creation_reclamation />
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

<style>
.page_container {
  background-color: #f0f0f0;
  min-height: 100vh;
  padding: 0rem 2rem;
}

.title {
  padding-top: 1rem;
}

.title h1 {
  font-size: 1.5rem;
  font-family: 'Poppins', sans-serif;
}

.blue-borders {
  max-width: 900px;
  width: 100%;
  border-top: 4px solid rgb(0, 147, 215);
  margin-top: 2rem;
  background-color: white;
  border-radius: 5px;
  padding: 1rem;
}

.blue-borders h2 {
  font-size: 1.15rem;
  font-family: 'Poppins', sans-serif;
  padding: 0.5rem 1rem;
}

.rec-detail {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.input-box {
  width: calc(50% - 10px);
  margin-bottom: 1rem;
}

.input-box label,
.input-box input,
.input-box select {
  display: block;
  width: 100%;
  margin-bottom: 0.5rem;
}

.input-box input,
.input-box select {
  height: 45px;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.gender {
  width: calc(50% - 10px);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.gender label {
  font-weight: 500;
  margin-right: 10px;
  cursor: pointer;
}

form :where(.gender label, .gender input) {
  cursor: pointer;
}

.titlgender {
  font-size: 17px;
  font-weight: 500;
}

.button {
  margin-top: 1rem;
  text-align: right;
}

input[type="radio"] {
  margin-right: 6px;
}

input[type="date"],
select {
  cursor: pointer;
}
.button input[type="submit"] {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
  }
</style>
