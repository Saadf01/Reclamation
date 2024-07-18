<template>
  
     <div class="blue-borders">
        <h2>Dispatching</h2>
        <div class="rec-detail">
          <div class="input-box">
            <label for="disp" class="detail">Dispatching</label>
            <select id="disp" >
              <option value="sao">SAO</option>
              <option value="hao">HAO</option>
            </select>
          </div>
          <div class="input-box">
            <label for="filial" class="detail">Filiale</label>
            <select id="filial" >
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
      
</template>