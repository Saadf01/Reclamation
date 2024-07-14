import { createRouter, createWebHashHistory } from 'vue-router'
import CreerReclamation from '@/pages/Creer_Reclamation_Page.vue'
import ListeReclamations from '@/pages/Liste_Reclamations_Page.vue'
import VisualiserReclamation from '@/pages/Visualiser_Reclamation_Page.vue'


const routes = [
   
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
    {
        path: '/VisualiserReclamation',
        name: 'VisualiserReclamation',
        component: VisualiserReclamation
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router