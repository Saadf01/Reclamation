import { createRouter, createWebHashHistory } from 'vue-router'
import Accueil from '@/pages/Accueil_Page.vue'

const routes = [
    {
        path: '/',
        name: 'Accueil',
        component: Accueil
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router