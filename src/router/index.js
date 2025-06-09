import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import AccountLayout from '@/components/layouts/AccountLayout.vue'

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
          component: () => import('@/views/LoginView.vue'),
        },
        {
          path: 'reset-password',
          name: 'reset-password',
          component: () => import('@/views/ResetPasswordView.vue'),
        },
      ],
    },
    {
      path: '/modules',
      component: AccountLayout,
      children: [
        {
          path: 'elec',
          name: 'modules_elec',
          component: () => import('@/views/ModuleElecView.vue'),
        },
        {
          path: 'gaz',
          name: 'modules_gaz',
          component: () => import('@/views/ModuleGazView.vue'),
        },
      ],
    },
  ],
})

export default router
