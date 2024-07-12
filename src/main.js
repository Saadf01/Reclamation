import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import de la bibliothèque d'icônes Material Icons
import 'material-icons/iconfont/material-icons.css';

// Import de la feuille de style de Google Fonts pour Poppins
import '@fontsource/poppins';

const app = createApp(App)

app.use(router)

app.mount('#app')