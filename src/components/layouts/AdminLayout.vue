<template>
  <div>
    <nav class="fixed bg-white top-0 left-0 right-0  shadow z-50 flex justify-between items-center px-10 py-6">
         <img
           :src="logo"
           alt="Logo"
           class="h-8 w-auto"
         />

      <div class="flex justify-center space-x-4">
        <the-button btn-class="bg-header-menu-bg text-dark-blue-text shadow-custom-card rounded-lg">
          JOE
        </the-button>

        <the-button btn-class="bg-header-menu-bg text-dark-blue-text  flex items-center space-x-4 shadow-custom-card rounded-lg">
          <span>€</span>
          <span>Suivi live des prix</span>
        </the-button>

        <the-button btn-class="bg-dark-blue-text text-white shadow-custom-card border border-black rounded-lg">
          <log-out />
        </the-button>
      </div>
    </nav>

    <main class="py-24 px-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import TheButton from '@/components/ui/TheButton.vue'
import { LogOut } from 'lucide-vue-next'
import logo from  '@/assets/images/logo/Logo Synergy.png'
</script>
