<template>
  <TheModal
    :isOpen="isOpen"
    :visibleCloseIcon="false"
    @close="$emit('close')"
    modalClass="
        !p-6
        bg-[url('@/assets/images/master-outils-modal-bg.png')] 
        rounded-lg
        shadow-xl
        bg-white
        text-center
        p-4
        "
    outsideModalClass="bg-black/50"
  >
    <div class="w-[500px] max-w-full p-2 bg-white rounded-lg">
      <h1 class="text-lg font-semibold text-dark-blue-text mb-2">
        Bienvenue sur votre espace client MasterOutils !
      </h1>

      <hr class="mb-4 mx-30 text-dark-blue-text" />

      <div class="px-4 py-4">
        <img
          src="@/assets/images/logo/logo-synergy.png"
          alt="Logo Synergy Group"
          class="mx-auto max-w-[250px]"
        />
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from '@/components/ui/TheModal.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
})

defineEmits(['close'])
</script>
