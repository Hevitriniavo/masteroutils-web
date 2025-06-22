import { storage } from '@/stores/storage'
import { useUserAuthStore } from '@/stores/store-user-auth'

export const useModule = () => {
  const storeAuth = useUserAuthStore()

  const openUserReporting = (reporting, sousGroup, permission) => {
    if (reporting && !reporting.url) {
      if (!/^https?:\/\//.test(reporting.url) && reporting.is_enabled) {
        const params = { id: reporting.id, type: 'reporting' }
        const query = {}
        if (
          sousGroup &&
          (permission === 'ROLE_MODULE_GROUP' || permission === 'ROLE_REPORTING_GROUP')
        ) {
          query.group = sousGroup.id
        }
        this.$router.push({ name: 'embed-frame', params: params, query: query })
      } else {
        if (reporting.is_enabled) {
          storage.setStorage('current-module', { lien: reporting.url })
        }
        this.$router.push({ name: 'frame', params: { name: `${reporting.id}-reporting` } })
      }
    }
  }

  return {
    openUserReporting,
  }
}
