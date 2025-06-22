import { storage } from '@/stores/storage'
import { useUserAuthStore } from '@/stores/store-user-auth'
import { useRouter } from 'vue-router'

export const useModule = () => {
  const storeAuth = useUserAuthStore()
  const router = useRouter()

  const openReporting = (reporting, sousGroup, permission) => {
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
        router.push({ name: 'embed-frame', params: params, query: query })
      } else {
        if (reporting.is_enabled) {
          storage.setStorage('current-module', { lien: reporting.url })
        }
        router.push({ name: 'frame', params: { name: `${reporting.id}-reporting` } })
      }
    }
  }

  const openUserReporting = () => {
    const user = storeAuth.user
    const permission = storeAuth.permission
    openReporting(user.reporting, user.reporting_sous_group, permission)
  }

  return {
    openReporting,
    openUserReporting,
  }
}
