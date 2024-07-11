import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import de la bibliothèque d'icônes Material Icons
import 'material-icons/iconfont/material-icons.css';

const app = createApp(App)

app.use(router)

app.mount('#app')