<template>
  <div>
    <nav
      class="fixed bg-white top-0 z-50 left-0 right-0 shadow flex justify-between items-center px-22"
    >
      <div class="relative overflow-hidden flex items-center justify-center h-[80px] w-[300px]">
        <AppLogo class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%]" />
      </div>

      <div class="flex justify-center space-x-4">
        <the-button btn-class="bg-header-menu-bg text-dark-blue-text shadow-custom-card rounded-lg">
          JOE
        </the-button>

        <the-button
          btn-class="bg-header-menu-bg text-dark-blue-text  flex items-center space-x-4 shadow-custom-card rounded-lg"
        >
          <span>€</span>
          <span>Suivi live des prix</span>
        </the-button>

        <the-button
          btn-class="bg-dark-blue-text text-white shadow-custom-card border border-black rounded-lg"
        >
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
import AppLogo from '@/components/commun/AppLogo.vue'
import { LogOut } from 'lucide-vue-next'
</script>
