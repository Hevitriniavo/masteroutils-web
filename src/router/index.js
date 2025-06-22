import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import AccountLayout from '@/components/layouts/AccountLayout.vue'
import { useUserAuthStore } from '@/stores/store-user-auth'
import { usePingingStore } from '@/stores/store-pinging'

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
      path: '/mon-espace',
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
        {
          path: 'frame/:name',
          name: 'frame',
          component: () => import('@/views/ExternalFrameView.vue'),
        },
        {
          path: ':type(reporting|module)/:id(\\d+)',
          name: 'embed-frame',
          component: () => import('@/views/FrameView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from) => {
  const allowedRoutes = ['login', 'reset-password']
  if (allowedRoutes.includes(to.name) === false) {
    const storeAuth = useUserAuthStore()

    if (storeAuth.user !== null && storeAuth.permission !== null) {
      return true
    }

    try {
      await storeAuth.checkToken()

      return true
    } catch (error) {
      storeAuth.logout()
    }
    return { name: 'login' }
  }
})

router.beforeEach(async (to, from) => {
  const pinging = usePingingStore()
  pinging.pingActivity('navigation', { to: to.fullPath, from: from.fullPath })
})

export default router
