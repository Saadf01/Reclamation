<template>
  <div class="popup-overlay" @click.self="$emit('close')">
      <div class="popup-content">
          <button class="close-button" @click="$emit('close')">&times;</button>
          <h2>Changement de statut</h2>

          <div class="form-group">
              <label><strong>Nouveau statut :</strong> {{ statusName }}</label>
          </div>

          <div class="form-group">
              <label><strong>Motif :</strong></label>
              <textarea v-model="motif" placeholder="Précisez le motif..." rows="4"></textarea>
          </div>

          <div class="button-container">
              <button class="confirm-button" @click="confirmChange">Confirmer</button>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  selectedStatus: Number,
  reclamationId: {
      type: [String, Number],
      required: true,
  },
  availableStatuses: Array,
});

const emit = defineEmits(['close', 'confirm']);

const motif = ref('');
const statusName = ref('');

watch(() => props.selectedStatus, (newStatusId) => {
    const status = props.availableStatuses.find(status => status.id === newStatusId);
    statusName.value = status ? status.name : 'Statut inconnu';
}, { immediate: true });

const confirmChange = async () => {
  if (motif.value.trim()) {
      try {
          // Mettre à jour le statut de la réclamation
          await axios.put(`https://localhost:7148/api/reclamations/${props.reclamationId}/status`, {
              newStatusId: props.selectedStatus,
          });

          // Ajouter un historique de statut
          await axios.post(`https://localhost:7148/api/statutHistorique`, {
              ReclamationId: props.reclamationId,
              StatusId: props.selectedStatus,
              Motif: motif.value,
          });

          // Émettre l'événement de confirmation
          emit('confirm', { status: props.selectedStatus, motif: motif.value });
          emit('close');
          window.location.reload(); // Rafraîchir la page
      } catch (error) {
          console.error("Erreur lors de la mise à jour du statut ou de l'ajout de l'historique :", error);
      }
  } else {
      alert('Veuillez préciser le motif.');
  }
};
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
.form-group textarea,
.form-group select {
  display: block;
  margin: 0 auto;
  text-align: left;
  width: 100%;
  max-width: 100%;
}

.form-group label {
  font-family: 'Poppins', sans-serif;
  margin-bottom: 5px;
}

.required {
  color: red;
  margin-left: 5px;
}

.form-group textarea {
  font-size: 0.9rem;
  max-height: 15rem;
  min-height: 3rem;
  min-width: 100%;
}

textarea,
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
