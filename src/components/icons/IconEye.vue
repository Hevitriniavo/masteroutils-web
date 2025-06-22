<template>
    <Eye v-if="iconType === 'on'" @click="$emit('click')" class="w-5 h-5 text-primary-blue cursor-pointer" />
    <EyeOff v-else @click="$emit('click')" class="w-5 h-5 text-primary-blue cursor-pointer" />
</template>

<script setup>
import { Eye, EyeOff } from 'lucide-vue-next'
defineProps({
    iconType: {
       type: String,
       default: 'off', 
    }
})
defineEmits(['click'])
</script>