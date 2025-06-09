<template>
  <div :class="['p-6', cardClass]">
    <header v-if="$slots.header">
      <slot name="header" />
    </header>

    <main v-if="$slots.default()">
      <slot name="default" />
    </main>

    <footer v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>
<script setup>
defineProps({
  cardClass: {
    type: [String, Array, Object],
    default: () => null,
  },
})
</script>
