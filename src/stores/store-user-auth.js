import { defineStore } from 'pinia'
import { ref } from 'vue'
import { axiosWrapper } from './axios'
import * as api from './endpoints'
import { storage } from './storage'
import * as constant from './stores-constant'

const ERROR_MESSAGES = {
  GENERIC_ERROR: 'Votre email ou mot de passe est incorrect.',
  'error.access.module.reporting.forbidden': "Vous n'avez pas accès à ce reporting.",
  'error.access.module.group.forbidden': "Vous n'avez pas accès à ce groupe de reporting.",
  'error.access.module.forbidden': "Vous n'avez pas accès à ce module.",
  'login.username.not.found': 'Votre identifiant est incorrect.',
  'error.password.not.match': 'Votre mot de passe est incorrect.',
}

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
      const errors = error.data || {}
      if (errors.message) {
        const specificError = ERROR_MESSAGES[errors.message] || ERROR_MESSAGES.GENERIC_ERROR
        throw new Error(specificError)
      }

      const errorMessage = error.response?.data?.message || error.message || 'Erreur de connexion.'
      throw new Error(errorMessage)
    }
    throw new Error('Votre email ou mot de passe est incorrect.')
  }

  const checkToken = async () => {
    try {
      const response = await axiosWrapper.get(api.CHECK_TOKEN)
      if (response.data) {
        const token = storage.getStorage(constant.STORAGE_KEY_TOKEN)
        const permission = storage.getStorage(constant.STORAGE_KEY_PERMISSION)
        return utility__updateUser({ user: response.data, token, permissions: [permission] })
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

  const initResetPassword = (payload) => {
    return axiosWrapper.post(`${api.PASSWORD}/init`, payload).then((res) => {
      return res.data
    })
  }
  const validateResetPassword = (code) => {
    return axiosWrapper.get(`${api.PASSWORD}/validate?code=${code}`).then((res) => {
      return res.data
    })
  }
  const filledResetPassword = (payload) => {
    return axiosWrapper.post(`${api.PASSWORD}/filled`, payload).then((res) => {
      return res.data
    })
  }

  return {
    user,
    token,
    permission,
    login,
    checkToken,
    logout,
    initResetPassword,
    validateResetPassword,
    filledResetPassword,
  }
})
