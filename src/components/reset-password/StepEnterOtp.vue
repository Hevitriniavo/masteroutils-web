<template>
  <the-card card-class="p-24 max-w-[650px] bg-white rounded-4xl">
    <template #default>
      <div class="flex flex-col gap-4">
        <h1 class="text-primary-blue text-[40px] pb-2 font-bold text-center">
          Mot de passe oublié
        </h1>

        <div>
          <p class="text-primary-blue text-[14px] w-full">
            Veuillez entrer le code que vous avez reçu par e-mail
          </p>

          <p class="text-red-600 text-[12px]" v-if="formError">
            {{ formError }}
          </p>

          <the-input
            v-model="code"
            :add-icon-left="true"
            container-class="mt-2"
            input-placeholder="Code"
            input-class="bg-gray-100 shadow-custom-gap-base font-light rounded-lg focus:outline-none"
            :input-error-message="errors.code"
            :input-error="!!errors.code"
            v-bind="codeProps"
          >
            <template #iconLeft>
              <IconLock class="w-5 h-5 text-primary-blue" />
            </template>
          </the-input>
        </div>

        <the-button
          btn-class="w-full bg-dark-blue-text rounded-lg uppercase"
          @btn-click="handleSubmit"
          :disabled="!meta.valid || !meta.dirty || meta.pending || requestInProgress"
        >
          Valider
        </the-button>
      </div>
    </template>
  </the-card>
</template>

<script setup>
import { ref } from 'vue'

import TheCard from '@/components/ui/TheCard.vue'
import TheInput from '@/components/ui/TheInput.vue'
import TheButton from '@/components/ui/TheButton.vue'
import IconLock from '../icons/IconLock.vue'
import { useUserAuthStore } from '@/stores/store-user-auth'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const emit = defineEmits(['next'])

const storeAuth = useUserAuthStore()

const {
  meta,
  errors,
  handleSubmit: handleFormSubmit,
  defineField,
} = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      code: yup
        .string()
        .required(`Le code est requis.`)
        .matches(/^\d{4,}$/, `Le code doit contenir au moins 4 chiffres.`),
    }),
  ),
})
const [code, codeProps] = defineField('code')

const requestInProgress = ref(false)
const formError = ref(null)

const handleSubmit = handleFormSubmit(async (values) => {
  formError.value = null
  requestInProgress.value = true
  try {
    await storeAuth.validateResetPassword(values.code)

    requestInProgress.value = false

    emit('next', values.code)
  } catch (error) {
    let errorMessage = error.message || 'Votre code est incorrect.'
    if (error.data === 'error.user.code.recuperation.invalid') {
      errorMessage = "Le code que vous avez renseigne n'est pas valide."
    }
    formError.value = errorMessage
    requestInProgress.value = false
  }
})
</script>
