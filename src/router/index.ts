import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Guideline from '../views/GuideLineView.vue'
import MyBooking from '../views/MyBookingView.vue'
import MeetingRoom from '../views/MeetingRoomView.vue'
import ActivityRoom from '../views/ActivityRoomView.vue'
import PresentationRoom from '../views/PresentationRoomView.vue'
import FacilityInfo from '../views/FacilityInfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', 
      redirect: '/home' 
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'guideline',
          name: 'guideline',
          component: Guideline
        },
        {
          path: 'my-booking',
          name: 'my-booking',
          component: MyBooking
        },
        {
          path: 'meeting-room',
          name: 'meeting-room',
          component: MeetingRoom
        },
        {
          path: 'activity-room',
          name: 'activity-room',
          component: ActivityRoom
        },
        {
          path: 'presentation-room',
          name: 'presentation-room',
          component: PresentationRoom
        },
        {
          path: 'facility-info',
          name: 'facility-info',
          component: FacilityInfo
        }
      ]
    }
  ]
})

export default router
