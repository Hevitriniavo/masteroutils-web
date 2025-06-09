<template>
  <div class="px-18">
    <module-toggle-tabs :selected="selected" @select="selected = $event" />
    <div
      :class="[
        'mt-6 rounded-lg',
        { 'bg-pastel-blue': selected === 'gaz' },
        { 'bg-header-menu-bg': selected === 'elect' },
      ]"
    >
      <module-gaz v-if="selected === 'gaz'" />

      <module-elect v-if="selected === 'elect'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ModuleToggleTabs from '@/components/modules/ModuleToggleTabs.vue'
import ModuleElect from '@/components/modules/ModuleElect.vue'
import ModuleGaz from '@/components/modules/ModuleGaz.vue'
const selected = ref('gaz')
</script>
