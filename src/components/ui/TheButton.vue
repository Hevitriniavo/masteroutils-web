<template>
  <button
    :class="['btn-primary', { 'opacity-50 cursor-not-allowed': disabled }, btnClass]"
    :disabled="disabled"
    :type="type"
    @click="$emit('btnClick')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  btnClass: {
    type: [String, Array, Object],
    default: () => null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['btnClick'])
</script>
