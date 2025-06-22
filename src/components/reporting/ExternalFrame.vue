<template>
  <div class="relative" :style="{ paddingTop: `${head}px` }">
    <iframe
      ref="iframe"
      id="frame"
      title="..."
      width="100%"
      class="frame"
      :src="link"
      :style="`height: calc(100vh - ${head}px);`"
    ></iframe>
    <div
      v-if="link.includes('powerbi.com')"
      class="fixed left-0 bottom-0"
      style="width: 150px; height: 30px; background: #eaeaea"
    ></div>
    <div
      v-if="link.includes('powerbi.com')"
      class="fixed right-0 bottom-0"
      style="width: 190px; height: 30px; background: #eaeaea"
    ></div>

    <WelcomeModal v-if="enableWelcome" :is-open />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { storage } from '@/stores/storage'
import { useWelcome } from '@/composables/use-welcome'
import WelcomeModal from '../WelcomeModal.vue'
import { useModuleStore } from '@/stores/store-module'
import { useRoute } from 'vue-router'

const link = ref('')
const head = ref(0)

const { isOpen, hideWelcome } = useWelcome()

const storeModule = useModuleStore()
const route = useRoute()

const enableWelcome = computed(() => {
  return storeModule.showWelcome && route.query['no-welcome'] !== 'true'
})

onMounted(() => {
  const currentModule = storage.getStorage('current-module')
  if (currentModule) link.value = currentModule.lien
  const header = document.getElementById('header')
  head.value = header.offsetHeight + 5

  hideWelcome(3)
})
</script>

<style scoped>
.frame {
  width: 100%;
  overflow: hidden;
}
</style>
