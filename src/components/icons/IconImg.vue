<template>
  <img
    :width="`${width}px`"
    :height="`${height}px`"
    :src="url"
    :alt
    class="object-contain"
    :class="iconClass"
  />
</template>

<script setup>
defineProps({
  url: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 45,
  },
  height: {
    type: Number,
    default: 45,
  },
  alt: {
    type: String,
    default: 'Icon',
  },
  iconClass: {
    type: [String, Array, Object],
    default: () => '',
  },
})
</script>
