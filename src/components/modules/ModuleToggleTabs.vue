<template>
   <div class="flex justify-between items-center ">
     <div class="w-96 h-20 rounded-lg border-2 border-dashed ">
        <img
          :src="logo"
          alt="Logo"
        />
     </div>
     <div
       class="flex  gap-6 px-6 py-2   text-dark-blue-text shadow-custom-card rounded-lg"
      :class="[
          {'bg-pastel-blue': selected === 'gaz'},
          {'bg-header-menu-bg': selected === 'elect'}
      ]"
     >
       <button
         @click="$emit('select', 'elect')"
         :class="['flex px-4 py-1 text-sm items-center justify-center gap-2 rounded rounded-lg', selected === 'elect' ? 'bg-white' : '']"
       >
         <lightbulb /> ÉLECTRICITÉ
       </button>

       <button
         @click="$emit('select', 'gaz')"
         :class="['flex px-4 py-1 text-sm items-center justify-center gap-2 rounded rounded-lg', selected === 'gaz' ? 'bg-white' : '']"
       >
         <droplet /> GAZ
       </button>
     </div>
   </div>
</template>

<script setup>
import { Droplet, Lightbulb  } from 'lucide-vue-next'
import logo from '@/assets/images/logo/Logo Synergy.png'
defineProps({ selected: String });
defineEmits(['select']);
</script>
