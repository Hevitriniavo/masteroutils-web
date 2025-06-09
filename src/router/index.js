import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import AdminLayout from '@/components/layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'reset-password',
          name: 'reset-password',
          component: ResetPasswordView,
        },
      ],
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'admin',
          component: DashboardView,
        },
      ],
    },
  ],
})

export default router
