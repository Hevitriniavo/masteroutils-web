<template>
  <the-card card-class="py-24 w-[650px] bg-white rounded-4xl">
    <template #default>
      <div class="flex flex-col gap-4 w-[450px] mx-auto">
        <h1 class="text-primary-blue text-[40px] font-semibold text-center pb-2">
          Mot de passe oublié
        </h1>

        <div>
          <p class="text-primary-blue text-[14px]">
            Veuillez entrer votre adresse email pour réinitialiser votre mot de passe
          </p>

          <p class="text-red-600 text-[12px]" v-if="formError">
            {{ formError }}
          </p>

          <the-input
            :add-icon-left="true"
            container-class="mt-2"
            input-type="email"
            input-placeholder="E-mail"
            label-class="text-primary-blue"
            input-class="bg-gray-100 shadow-custom-gap-base font-light rounded-lg focus:outline-none"
            v-model="email"
            v-bind="emailProps"
            :input-error-message="errors.email"
            :input-error="!!errors.email"
          >
            <template #iconLeft>
              <IconMail class="w-5 h-5 text-primary-blue" />
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
import TheCard from '@/components/ui/TheCard.vue'
import TheInput from '@/components/ui/TheInput.vue'
import TheButton from '@/components/ui/TheButton.vue'
import IconMail from '../icons/IconMail.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { ref } from 'vue'
import { useUserAuthStore } from '@/stores/store-user-auth'

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
      email: yup.string().required(`L'email est requis`).email(`L'email doit être valide`),
    }),
  ),
})
const [email, emailProps] = defineField('email')

const requestInProgress = ref(false)
const formError = ref(null)

const handleSubmit = handleFormSubmit(async (values) => {
  formError.value = null
  requestInProgress.value = true
  try {
    await storeAuth.initResetPassword({
      email: values.email,
    })

    requestInProgress.value = false

    emit('next', values.email)
  } catch (error) {
    let errorMessage = error.message || 'Votre email est incorrect.'
    if (error.data === 'error.user.email.not.found') {
      errorMessage = 'Aucun compte trouvé avec cet email.'
    }
    formError.value = errorMessage
    requestInProgress.value = false
  }
})
</script>
