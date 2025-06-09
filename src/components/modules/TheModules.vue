<template>
  <div class="px-18">
    <div class="flex justify-between items-center">
      <div
        class="w-80 h-20 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center"
      >
        <img :src="logo" alt="Logo" class="h-12 object-contain" />
      </div>
      <ModuleToggleTabs :group @group-change="onChangeOnglet" />
    </div>
    <div
      class="mt-6 rounded-lg h-[660px]"
      :class="[{ 'bg-pastel-blue': group === 'gaz' }, { 'bg-header-menu-bg': group === 'elec' }]"
    >
      <ModuleList :modules :group :title="group === 'gaz' ? 'GAZ' : 'ELECTRICITÉ'" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  group: {
    type: String,
    default: 'elec',
  },
})
import ModuleToggleTabs from '@/components/modules/ModuleToggleTabs.vue'
import ModuleList from '@/components/modules/ModuleList.vue'
import logo from '@/assets/images/logo/logo-synergy.png'
import modules from '@/utils/modules.json'
import { useRouter } from 'vue-router'

const router = useRouter()

function onChangeOnglet(value) {
  router.push(`/modules/${value}`)
}
</script>
