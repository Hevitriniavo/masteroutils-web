<template>
  <img
    :width
    :height
    src="@/assets/images/logo/logo-synergy-animated.gif"
    alt="Logo"
    class="object-contain"
  />
</template>

<script setup>
defineProps({
  width: {
    type: Number,
    default: 440,
  },
  height: {
    type: Number,
    default: 230,
  },
})
</script>
