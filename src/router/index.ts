import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Guideline from '../views/GuideLineView.vue'
import MyBooking from '../views/MyBookingView.vue'
import RoomList from '../views/RoomListView.vue'
import RoomDetail from '../views/RoomDetailView.vue'

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
          name: "MeetingRoomDetail",
          component: RoomDetail
        },
        {
          path: "activity-room/:roomId",
          name: "ActivityRoomDetail",
          component: RoomDetail
        }
      ]
    }
  ]
})

export default router
