<template>
    <div class="popup-overlay" @click.self="$emit('close')">
      <div class="popup-content">
        <button class="close-button" @click="$emit('close')">&times;</button>
        <h2>Dispatching</h2>
  
        <div class="form-group">
          <label>Dispatcher vers <span class="required">* </span>:</label>
          <select v-model="selectedOption">
            <option value="" disabled>Choisissez le lieu du dispatching</option>
            <option value="HAO">HAO</option>
            <option value="SAO">SAO</option>
            <option value="Agence">Agence</option>
          </select>
        </div>

        <div v-if="selectedOption === 'SAO'" class="form-group">
            <label>Société filiale <span class="required">* </span>:</label>
            <select v-model="selectedFiliale">
                <option value="" disabled>Choisissez une société filiale</option>
                <option value="Al Omrane Tanger-Tétouan-Al Hoceïma">Al Omrane Tanger-Tétouan-Al Hoceïma</option>
                <option value="Al Omrane Casablanca - Settat">Al Omrane Casablanca - Settat</option>
                <option value="Al Omrane Fès Meknès">Al Omrane Fès Meknès</option>
                <option value="Al Omrane Darâa Tafilalet">Al Omrane Darâa Tafilalet</option>
                <option value="Al Omrane Région de l'Oriental">Al Omrane Région de l'Oriental</option>
                <option value="Al Omrane Marrakech Safi">Al Omrane Marrakech Safi</option>
                <option value="Al Omrane Souss Massa">Al Omrane Souss Massa</option>
                <option value="Al Omrane Al Janoub">Al Omrane Al Janoub</option>
                <option value="Al Omrane Beni Mellal Khenifra">Al Omrane Beni Mellal Khenifra</option>
                <option value="Al Omrane Rabat-Salé-Kénitra">Al Omrane Rabat-Salé-Kénitra</option>
            </select>
        </div>
  
        <div v-if="selectedOption === 'Agence'" class="form-group">
          <label>Dispatching Agence :</label>
          <input type="text" placeholder="Précisez l'agence..." />
        </div>
  
        <div class="button-container">
          <button class="confirm-button" @click="$emit('confirm')">Confirmer Dispatching</button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
  
const selectedOption = ref('');
const selectedFiliale = ref('');
</script>
  
<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 40%;
  max-width: 90%;
  margin-top: 3rem;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border-radius: 20px;
  border: none;
  font-size: 1.7rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.close-button:hover {
  background-color: rgba(128, 128, 128, 0.449);
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label,
.form-group input,
.form-group select {
  display: block;
  margin: 0 auto;
  text-align: left;
  width: 100%;
}

.form-group label {
  font-family: 'Poppins', sans-serif;
  margin-bottom: 5px;
}

.required {
  color: red;
  margin-left: 5px;
}

.form-group input {
  font-size: 0.9rem;
}

input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.confirm-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
}

.confirm-button:hover {
  background-color: #0056b3;
}
</style>
