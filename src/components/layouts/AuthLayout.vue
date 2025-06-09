<template>
  <div class="w-screen h-screen flex flex-col md:flex-row">
    <div class="md:basis-2/5 basis-full h-full flex items-center justify-center">
      <AppLogo />
    </div>

    <div class="md:basis-3/5 basis-full h-full bg-custom-gradient flex items-center justify-center">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import AppLogo from '@/components/commun/AppLogo.vue'
</script>
