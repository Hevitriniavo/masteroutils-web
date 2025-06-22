<template>
  <teleport v-if="isOpen" to="body">
    <div 
      class="w-screen fixed inset-0 h-screen bg-black/10 flex justify-center items-center"
      :class="[ outsideModalClass ]">
        <main class="bg-white p-12 relative z-9999" :class="[ modalClass]">
          <template v-if="visibleCloseIcon">
            <X
              @click="$emit('close')"
              class="absolute right-6 top-6 z-9999 h-4 w-4 hover:cursor-pointer"
            />
          </template>
          <slot />
        </main>
    </div>
  </teleport>
</template>

<script setup>
import { X } from 'lucide-vue-next'
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  visibleCloseIcon: {
    type: Boolean,
    required: true,
    default: true,
  },
  modalClass: {
    type: [String, Array, Object],
    default: '',
  },
  outsideModalClass: {
    type: [String, Array, Object],
    default: '',
  },
})

defineEmits(['close'])
</script>
