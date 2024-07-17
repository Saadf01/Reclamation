import { createRouter, createWebHashHistory } from 'vue-router'
import CreerReclamation from '@/pages/Creer_Reclamation_Page.vue'
import ListeReclamations from '@/pages/Liste_Reclamations_Page.vue'
import VisualiserReclamation from '@/pages/Visualiser_Reclamation_Page.vue'
import ReclamantPage from '@/pages/Reclamant_Page.vue'
import ResponsablePage from '@/pages/Responsable_Page.vue'
import OperationPage from '@/pages/Operation_Page.vue'

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
    {
        path: '/ReclamantPage',
        name: 'ReclamantPage',
        component: ReclamantPage
    },
    {
        path: '/ResponsablePage',
        name: 'ResponsablePage',
        component: ResponsablePage
    },
    {
        path: '/OperationPage',
        name: 'OperationPage',
        component: OperationPage
    },
]



const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router