import { createRouter } from 'vue-router'
import HomeView from '../views/LoginView.vue'
import { createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
})
export default router
