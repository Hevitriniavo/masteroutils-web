<template>
  <div
    class="flex gap-6 px-6 py-2 text-dark-blue-text shadow-custom-card rounded-lg"
    :class="[{ 'bg-pastel-blue': group === 'gaz' }, { 'bg-header-menu-bg': group === 'elec' }]"
  >
    <button
      @click="onGroupChange('elec')"
      class="flex px-4 py-1 text-sm items-center justify-center gap-2 rounded-lg cursor-pointer"
      :class="[group === 'elec' ? 'bg-white' : '']"
    >
      <IconElec /> ÉLECTRICITÉ
    </button>

    <button
      @click="onGroupChange('gaz')"
      class="flex px-4 py-1 text-sm items-center justify-center gap-2 rounded-lg cursor-pointer"
      :class="[group === 'gaz' ? 'bg-white' : '']"
    >
      <IconGaz /> GAZ
    </button>
  </div>
</template>

<script setup>
import IconElec from '@/components/icons/IconElec.vue'
import IconGaz from '@/components/icons/IconGaz.vue'
defineProps({
  group: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['groupChange'])

function onGroupChange(group) {
  emit('groupChange', group)
}
</script>
