import { defineStore } from 'pinia'
import { axiosWrapper } from './axios'
import * as api from './endpoints'
import { ref } from 'vue'

export const useHelpCenterStore = defineStore('helpCenter', () => {
  const helpToastVisible = ref(false)
  const helpToastMessage = ref('')
  const helpRequested = ref(false)

  async function sendDemandeHelp(subject) {
    helpRequested.value = true
    try {
      await axiosWrapper.post(`${api.HELP_CENTER}/${subject}`)

      helpRequested.value = false
      helpToastMessage.value =
        subject === 'email'
          ? "Votre demande a été prise en compte. L'admin va vous contacter depuis votre mail d'ici peu. Merci."
          : "Votre demande a été prise en compte. L'admin va vous contacter depuis votre téléphone d'ici peu. Merci."
      helpToastVisible.value = true
    } catch (err) {
      helpRequested.value = false
    }
  }

  return {
    helpToastVisible,
    helpToastMessage,
    helpRequested,
    sendDemandeHelp,
  }
})
