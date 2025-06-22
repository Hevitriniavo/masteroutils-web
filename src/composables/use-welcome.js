import { useModuleStore } from '@/stores/store-module'
import { ref } from 'vue'

export const useWelcome = () => {
  const storeModule = useModuleStore()

  const isOpen = ref(true)

  const hideWelcome = (duration = 3) => {
    setTimeout(() => {
      isOpen.value = false

      storeModule.$patch({ showWelcome: false })
    }, duration * 1000)
  }

  return {
    isOpen,
    hideWelcome,
  }
}
