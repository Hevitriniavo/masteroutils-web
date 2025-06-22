<template>
  <teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="w-screen fixed inset-0 h-screen bg-black/10 flex justify-center items-center"
        :class="[outsideModalClass]"
      >
        <main class="bg-white p-12 relative z-9999" :class="[modalClass]">
          <IconClose
            v-if="visibleCloseIcon"
            @click="$emit('close')"
            class="absolute right-6 top-6 z-9999 h-4 w-4 hover:cursor-pointer"
          />
          <slot />
        </main>
      </div>
    </Transition>
  </teleport>
</template>

<script setup>
import IconClose from '../icons/IconClose.vue'

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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
