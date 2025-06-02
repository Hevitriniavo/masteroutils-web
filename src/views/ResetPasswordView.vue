<template>
  <step-enter-email
    v-if="step === 1"
    :default-email="email"
    @next="validEmail"
  />

  <step-enter-otp
    v-if="step === 2"
    :default-code="code"
    :email="email"
    @next="validCode"
  />

  <step-set-new-password
    v-if="step === 3"
    :default-confirm-password="confirmPassword"
    :default-password="password"
    @next="validPassword"
  />

  <the-modal
    :is-open="openModal"
    modal-class="border-green-300 border-4 rounded-lg"
    @close="openModal = false"
  >
    <div class="flex w-full h-full justify-center items-center p-18 max-w-lg">
      <p class="text-2xl text-center font-bold">Votre mot de passe a été change avec success !</p>
    </div>
  </the-modal>
</template>

<script setup>
import { ref } from 'vue'
import StepEnterEmail from '@/components/reset-password/StepEnterEmail.vue'
import StepEnterOtp from '@/components/reset-password/StepEnterOtp.vue'
import StepSetNewPassword from '@/components/reset-password/StepSetNewPassword.vue'
import TheModal from '@/components/ui/TheModal.vue'

const openModal = ref(false)
const step = ref(1)
const email = ref('')
const code = ref('')
const password = ref('')
const confirmPassword = ref('')

const validEmail = (data) => {
  email.value = data
  step.value++
}

const validCode = (data) => {
  code.value = data
  step.value++
}
const validPassword = (data) => {
  console.log(data)
  openModal.value = true
}
</script>
