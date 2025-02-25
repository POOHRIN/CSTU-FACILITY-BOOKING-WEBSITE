import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Howto from '../views/HowtoView.vue'
import Facility from '../views/FacilityView.vue'
import FacilityInfo from '../views/FacilityInfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', 
      redirect: '/home' 
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/howto',
      name: 'howto',
      component: Howto,
    },
    {
      path: '/facility',
      name: 'facility',
      component: Facility,
    },
    {
      path: '/facility-info',
      name: 'facility-info',
      component: FacilityInfo,
    },
  ],
})

export default router
