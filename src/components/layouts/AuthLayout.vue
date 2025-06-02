<template>
  <div class="w-screen h-screen flex flex-col md:flex-row">
    <div class="md:basis-2/5 basis-full  h-full flex items-center justify-center">
      <img
        class="max-w-full max-h-20 object-contain"
        :src="logo"
        alt="Logo Synergy"
      />
    </div>

    <div class="md:basis-3/5 basis-full h-full bg-custom-gradient flex items-center justify-center">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/images/logo/Logo Synergy.png'
</script>
