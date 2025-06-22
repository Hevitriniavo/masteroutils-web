<template>
  <LockKeyhole class="text-primary-blue" :class="[mini ? 'w-3 h-3' : 'w-5 h-5']" />
</template>

<script setup>
defineProps({
  mini: {
    type: Boolean,
    default: false,
  },
})
import { LockKeyhole } from 'lucide-vue-next'
</script>
