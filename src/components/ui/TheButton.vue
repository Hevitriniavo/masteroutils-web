<template>
  <button
    class="btn-primary"
    :class="[disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer', btnClass]"
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
