<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50"
    >
      <slot>{{ message }}</slot>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  message: String,
  duration: {
    type: Number,
    default: 3000,
  },
  show: {
    type: Boolean,
    default: false,
  },
  style: {
    type: String,
    default: 'success',
  },
})

const emit = defineEmits(['close'])

const visible = ref(false)

watch(
  () => props.show,
  (newVal) => {
    visible.value = newVal
    if (newVal) {
      setTimeout(() => {
        emit('close')
      }, props.duration)
    }
  },
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
