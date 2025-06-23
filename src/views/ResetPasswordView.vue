<template>
  <step-enter-email v-if="step === 1" @next="validEmail" />

  <step-enter-otp v-if="step === 2" @next="validCode" />

  <step-set-new-password v-if="step === 3" :validation-code="code" @next="validPassword" />

  <the-modal
    :is-open="openModal"
    :visible-close-icon="true"
    modal-class="border-green-300 border-4 rounded-lg"
    @close="onCloseResetPassword"
  >
    <div class="flex w-full h-full justify-center items-center p-18 max-w-lg">
      <p class="text-2xl text-center font-bold">Votre mot de passe a été changé avec succes !</p>
    </div>
  </the-modal>
</template>

<script setup>
import { ref } from 'vue'
import StepEnterEmail from '@/components/reset-password/StepEnterEmail.vue'
import StepEnterOtp from '@/components/reset-password/StepEnterOtp.vue'
import StepSetNewPassword from '@/components/reset-password/StepSetNewPassword.vue'
import TheModal from '@/components/ui/TheModal.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const openModal = ref(false)
const step = ref(1)
const code = ref('')

const validEmail = () => {
  step.value++
}

const validCode = (validationCode) => {
  code.value = validationCode
  step.value++
}

const validPassword = () => {
  openModal.value = true

  setTimeout(onCloseResetPassword, 3000)
}

const onCloseResetPassword = () => {
  openModal.value = false
  router.push({ name: 'login' })
}
</script>
