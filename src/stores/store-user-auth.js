import { defineStore } from 'pinia'
import { ref } from 'vue'
import { axiosWrapper } from './axios'
import * as api from './endpoints'
import { storage } from './storage'
import * as constant from './stores-constant'

export const useUserAuthStore = defineStore('userAuth', () => {
  const user = ref(null)
  const token = ref(null)
  const permission = ref(null)

  const utility__updateUser = (userData) => {
    const userVal = userData.user
    const tokenVal = userData.token
    const permissionVal = userData.permissions.find((r) => r !== 'ROLE_ADMIN' && r !== 'ROLE_USER')

    storage.setStorage(constant.STORAGE_KEY_TOKEN, tokenVal)
    storage.setStorage(constant.STORAGE_KEY_USER, userVal)
    storage.setStorage(constant.STORAGE_KEY_PERMISSION, permissionVal)

    user.value = userVal
    token.value = tokenVal
    permission.value = permissionVal

    return { user: userVal, token: tokenVal, permission: permissionVal }
  }

  const login = async (payload) => {
    try {
      const response = await axiosWrapper.post(`${api.USER}/login`, payload)
      if (response.data) {
        return utility__updateUser(response.data)
      }
    } catch (error) {
      throw new Error(error)
    }
    throw new Error('Votre email ou mot de passe est incorrect.')
  }

  const checkToken = async () => {
    try {
      const response = await axiosWrapper.get(api.CHECK_TOKEN)
      if (response.data) {
        return utility__updateUser(response.data)
      }
    } catch (error) {
      throw new Error(error)
    }
    throw new Error('Aucun utilisateur trouve.')
  }

  const logout = () => {
    storage.clearAllStorage()

    user.value = null
    token.value = null
    permission.value = null
  }

  return {
    user,
    token,
    permission,
    login,
    checkToken,
    logout,
  }
})
