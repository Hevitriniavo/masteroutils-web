<template>
  <TheModal
    :isOpen="isOpen"
    :visibleCloseIcon="false"
    @close="$emit('close')"
    modalClass="
        p-6
        bg-[url('@/assets/images/welcome-bg.png')] 
        rounded-lg
        shadow-xl
        bg-white
        text-center
        bg-no-repeat
        bg-cover
        "
    outsideModalClass="bg-black/50"
  >
    <div class="w-[700px] max-w-full h-[250px] p-2 bg-white opacity-90 rounded-lg">
      <h1 class="text-[25px] font-semibold text-dark-blue-text mb-2">
        Bienvenue sur votre espace client MasterOutils !
      </h1>

      <hr class="mb-4 mx-30 text-dark-blue-text" />

      <div class="px-4 pt-4">
        <AppLogo class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%]" />
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from '@/components/ui/TheModal.vue'
import AppLogo from './commun/AppLogo.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
})

defineEmits(['close'])
</script>
