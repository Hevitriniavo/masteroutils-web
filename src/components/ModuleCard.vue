<template>
  <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex flex-col items-center gap-3">
    <div class="bg-blue-800 text-white p-3 rounded-full">
      <component :is="icon" class="w-6 h-6" />
    </div>
    <p class="text-center font-medium text-sm">{{ label }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: Object,
  label: String
});
</script>
