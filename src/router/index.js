import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import AdminLayout from '@/components/layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: LoginView,
        },
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
