import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Guideline from '../views/GuidelineView.vue'
import MyBooking from '../views/MyBookingView.vue'
import RoomList from '../views/RoomListView.vue'
import RoomDetail from '../views/RoomDetailView.vue'
import AllBooking from '../views/AllBookingView.vue'

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
          component: RoomList
        },
        {
          path: 'activity-room',
          name: 'activity-room',
          component: RoomList
        },
        {
          path: "meeting-room/:roomId",
          name: "meeting-room-detail",
          component: RoomDetail
        },
        {
          path: "activity-room/:roomId",
          name: "activity-room-detail",
          component: RoomDetail
        },
        {
          path: 'all-booking',
          name: 'all-booking',
          component: AllBooking
        }
      ]
    }
  ]
})

export default router
