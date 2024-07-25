import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {fas} from '@fortawesome/free-solid-svg-icons'

// Importation de la feuille de style de vue-multiselect
import 'vue-multiselect/dist/vue-multiselect.css';

/* add icons to the library */
library.add(fas)

// Import de la bibliothèque d'icônes Material Icons
import 'material-icons/iconfont/material-icons.css';

// Import de la feuille de style de Google Fonts pour Poppins
import '@fontsource/poppins';

const app = createApp(App)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');