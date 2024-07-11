import { createRouter, createWebHashHistory } from 'vue-router'
import Accueil from '@/pages/Accueil_Page.vue'
import CreerReclamation from '@/pages/Creer_Reclamation_Page.vue'
import ListeReclamations from '@/pages/Liste_Reclamations_Page.vue'


const routes = [
    {
        path: '/',
        name: 'Accueil',
        component: Accueil
    },
    {
        path: '/CreerReclamation',
        name: 'CreerReclamation',
        component: CreerReclamation
    },
    {
        path: '/ListeReclamations',
        name: 'ListeReclamations',
        component: ListeReclamations
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router