<template>
  <div>
    <div class="p-6 grid grid-cols-2 gap-2">
      <h1 class="text-xl font-bold flex items-center gap-2 text-dark-blue-text">
        <IconGaz v-if="group === 'gaz'" />
        <IconElec v-else />
        <span class="text-uppercase">{{ title }}</span>
      </h1>

      <h2 class="text-lg font-semibold uppercase text-dark-blue-text">Modules</h2>
    </div>

    <div class="p-6 grid grid-cols-4 gap-6">
      <ModuleItem
        v-for="(item, i) in modules"
        :key="item.id"
        :module-value="item"
        :group
        test-id="test_mi"
        @module-item-show="$emit('moduleShow', item, i)"
      />
    </div>
  </div>
</template>

<script setup>
import ModuleItem from './ModuleItem.vue'
import IconElec from '@/components/icons/IconElec.vue'
import IconGaz from '@/components/icons/IconGaz.vue'

defineProps({
  title: String,
  group: {
    type: String,
    default: 'elec', // elec, gaz
  },
  modules: Array,
  spaceEnabled: {
    type: Boolean,
    default: true,
  },
})
defineEmits(['moduleShow'])
</script>
