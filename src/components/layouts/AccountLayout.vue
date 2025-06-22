<template>
  <div>
    <nav
      id="header"
      class="fixed bg-white top-0 z-50 left-0 right-0 shadow flex justify-between items-center px-22"
    >
      <div class="relative overflow-hidden flex items-center justify-center h-[80px] w-[300px]">
        <AppLogo class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%]" />
      </div>

      <div class="flex justify-center space-x-4">
        <the-button
          btn-class="bg-header-menu-bg text-dark-blue-text shadow-custom-card rounded-lg"
          @click="onGoToMyAccount"
        >
          {{
            authStore.user?.nom ||
            authStore.user?.prenom ||
            authStore.user?.identifiant ||
            'Mon compte'
          }}
        </the-button>

        <the-button
          btn-class="bg-header-menu-bg text-dark-blue-text  flex items-center space-x-4 shadow-custom-card rounded-lg"
          @click="onGoToLivePrice"
        >
          <span>€</span>
          <span>Suivi live des prix</span>
        </the-button>

        <the-button
          btn-class="bg-dark-blue-text text-white shadow-custom-card border border-black rounded-lg"
          @click="onLogout"
        >
          <IconLogout />
        </the-button>
      </div>
    </nav>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import TheButton from '@/components/ui/TheButton.vue'
import AppLogo from '@/components/commun/AppLogo.vue'
import IconLogout from '../icons/IconLogout.vue'
import { useUserAuthStore } from '@/stores/store-user-auth'
import { useRouter, useRoute } from 'vue-router'
import { storage } from '@/stores/storage'

const authStore = useUserAuthStore()
const router = useRouter()
const route = useRoute()

const onLogout = () => {
  authStore.logout()

  router.push({ name: 'login' })
}

const onGoToMyAccount = () => {
  if (route.name !== 'modules_elec' && route.name !== 'modules_gaz') {
    router.push({ name: 'modules_elec' })
  }
}

const onGoToLivePrice = () => {
  const url =
    'https://app.powerbi.com/view?r=eyJrIjoiZTQ3NzUxYjctYjYwYi00MDJiLTlmMTYtNmQyZmY0NTMyMGEzIiwidCI6IjlkZTRiYzBhLWJiM2QtNGM1NC1iNDA4LWEyNzZmOTdmZTE0YSJ9'
  storage.setStorage('current-module', { lien: url })
  router.push({ name: 'frame', params: { name: 'live-prix' }, query: { 'no-welcome': 'true' } })
}
</script>
