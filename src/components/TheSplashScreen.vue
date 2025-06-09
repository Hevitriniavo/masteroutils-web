<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <AppLogo />
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppLogo from './commun/AppLogo.vue'

const props = defineProps({
  duration: {
    type: Number,
    default: 5,
  },
})

const show = ref(true)

onMounted(() => {
  setTimeout(() => {
    show.value = false
  }, props.duration * 1000)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
  width: 100vw;
}
.fade-enter-from,
.fade-leave-to {
  width: 40vw;
}
</style>
