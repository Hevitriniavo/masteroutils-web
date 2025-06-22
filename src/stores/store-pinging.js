import { defineStore } from 'pinia'
import { axiosWrapper } from './axios'
import { PING, PING_ACTIVITY, PING_VISITE_MODULE } from 'src/store/endpoints'
import { useUserAuthStore } from './store-user-auth'

export const usePingingStore = defineStore('pinging', () => {
  let intervalId = null

  const storeAuth = useUserAuthStore()

  function start() {
    if (intervalId) {
      clearInterval(intervalId)
    }
    const user = storeAuth.user
    if (user && user.role === 'USER') {
      pingConnexion()
      intervalId = setInterval(pingConnexion, 1000 * 60 * 2)
    }
  }

  function pingConnexion() {
    const user = storeAuth.user
    if (user && user.role === 'USER') {
      axiosWrapper
        .get(PING, true)
        .then((_user) => {})
        .catch((_e) => {})
    }
  }

  function pingActivity(eventType, params) {
    const user = storeAuth.user
    if (user && user.role === 'USER') {
      axiosWrapper
        .get(PING_ACTIVITY, true)
        .then((_user) => {})
        .catch((_e) => {})
      if (eventType === 'report-rendered') {
        axiosWrapper
          .post(PING_VISITE_MODULE, params)
          .then(() => {})
          .catch(() => {})
      }
    }
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId)
    }
    intervalId = null
  }

  return {
    start,
    pingConnexion,
    pingActivity,
    stop,
  }
})
