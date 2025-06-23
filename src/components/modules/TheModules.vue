<template>
  <div class="px-18">
    <div class="flex justify-between items-center">
      <div class="w-80 h-20 rounded-lg flex items-center justify-center">
        <img :src="userAuthStore.user.logo" alt="Logo" class="h-12 object-contain" />
      </div>
      <ModuleToggleTabs :group @group-change="onChangeOnglet" />
    </div>
    <div
      class="mt-6 rounded-lg h-[660px]"
      :class="[{ 'bg-pastel-blue': group === 'gaz' }, { 'bg-header-menu-bg': group === 'elec' }]"
    >
      <ModuleList
        :modules
        :group
        :title="group === 'gaz' ? 'GAZ' : 'ELECTRICITÉ'"
        :space-enabled="storeModule.monEspace?.is_enabled"
        @module-show="onGoToModule"
      />
    </div>

    <WelcomeModal v-if="storeModule.showWelcome" :is-open />
  </div>
</template>

<script setup>
import ModuleToggleTabs from '@/components/modules/ModuleToggleTabs.vue'
import ModuleList from '@/components/modules/ModuleList.vue'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useUserAuthStore } from '@/stores/store-user-auth'
import { useModuleStore } from '@/stores/store-module'
import WelcomeModal from '../WelcomeModal.vue'
import { useWelcome } from '@/composables/use-welcome'
import { storage } from '@/stores/storage'

const props = defineProps({
  group: {
    type: String,
    default: 'elec',
  },
})

const router = useRouter()
const userAuthStore = useUserAuthStore()
const storeModule = useModuleStore()

const { isOpen, hideWelcome } = useWelcome()

const onChangeOnglet = (value) => {
  router.push(`/mon-espace/${value}`)
}

const onGoToModule = (moduleItem) => {
  const apiModule = moduleItem._api_module || {}
  if (apiModule.lien) {
    if (/^https?:\/\//.test(apiModule.lien)) {
      storage.setStorage('current-module', apiModule)
      router.push({
        name: 'frame',
        params: { name: moduleItem.name },
        query: { 'no-welcome': 'true' },
      })
    } else {
      router.push({
        name: 'embed-frame',
        params: { id: apiModule.id, type: 'module' },
        query: { onglet: apiModule.onglet, 'no-welcome': true },
      })
    }
  }
}

const modules = computed(() => {
  return props.group === 'gaz' ? storeModule.gazs : storeModule.elecs
})

onMounted(() => {
  storeModule.getAllModules().then(() => {
    hideWelcome(3)
  })
})
</script>
