<template>
  <TheCard card-class="p-24 max-w-[650px] bg-white rounded-4xl">
    <div class="flex flex-col gap-4">
      <h1 class="text-primary-blue text-[40px] pb-2 font-bold text-center">Mot de passe oublié</h1>

      <p class="text-primary-blue text-[14px]">Veuillez entrer le nouveau mot de passe</p>

      <p class="text-red-600 text-[12px]" v-if="formError">
        {{ formError }}
      </p>

      <the-input
        v-model="newPassword"
        :add-icon-left="true"
        :add-icon-right="true"
        container-class="mt-2"
        :input-type="showPassword ? 'text' : 'password'"
        label-class="text-primary-blue"
        input-class="bg-gray-100 shadow-custom-gap-base font-light rounded-lg focus:outline-none"
        input-placeholder="Nouveau mot de passe"
        :input-error-message="errors.newPassword"
        :input-error="!!errors.newPassword"
        v-bind="newPasswordProps"
      >
        <template #iconLeft>
          <IconLock />
        </template>

        <template #iconRight>
          <IconEye :icon-type="showPassword ? 'on' : 'off'" @click="showPassword = !showPassword" />
        </template>
      </the-input>

      <the-input
        v-model="confirmPassword"
        :add-icon-left="true"
        :add-icon-right="true"
        container-class="mt-2"
        :input-type="showConfirmPassword ? 'text' : 'password'"
        label-class="text-primary-blue"
        input-class="bg-gray-100 shadow-custom-gap-base font-light rounded-lg focus:outline-none"
        input-placeholder="Confirmer le mot de passe"
        :input-error-message="errors.confirmPassword"
        :input-error="!!errors.confirmPassword"
        v-bind="confirmPasswordProps"
      >
        <template #iconLeft>
          <IconLock />
        </template>
        <template #iconRight>
          <IconEye
            :icon-type="showConfirmPassword ? 'on' : 'off'"
            @click="showConfirmPassword = !showConfirmPassword"
          />
        </template>
      </the-input>

      <the-button
        btn-class="w-full bg-dark-blue-text rounded-lg uppercase"
        @btn-click="handleSubmit"
        :disabled="!meta.valid || !meta.dirty || meta.pending || requestInProgress"
      >
        Valider
      </the-button>
    </div>
  </TheCard>
</template>

<script setup>
import { ref } from 'vue'
import TheCard from '@/components/ui/TheCard.vue'
import TheInput from '@/components/ui/TheInput.vue'
import TheButton from '@/components/ui/TheButton.vue'
import IconEye from '../icons/IconEye.vue'
import IconLock from '../icons/IconLock.vue'
import { useUserAuthStore } from '@/stores/store-user-auth'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const props = defineProps({
  validationCode: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['next'])

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const storeAuth = useUserAuthStore()

const {
  meta,
  errors,
  handleSubmit: handleFormSubmit,
  defineField,
} = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      newPassword: yup.string().required(`Le nouveau mot de passe ne doit pas etre vide`),
      confirmPassword: yup
        .string()
        .required(`Vous devez confirmer le mot de passe`)
        .oneOf([yup.ref('newPassword')], 'Les mots de passe ne correspondent pas'),
    }),
  ),
})
const [newPassword, newPasswordProps] = defineField('newPassword')
const [confirmPassword, confirmPasswordProps] = defineField('confirmPassword')

const requestInProgress = ref(false)
const formError = ref(null)

const handleSubmit = handleFormSubmit(async (values) => {
  formError.value = null
  requestInProgress.value = true
  try {
    await storeAuth.filledResetPassword({
      password: values.newPassword,
      code: props.validationCode,
    })

    requestInProgress.value = false

    emit('next', true)
  } catch (error) {
    let errorMessage = error.message || 'Votre nouveau mot de passe est incorrect.'
    formError.value = errorMessage
    requestInProgress.value = false
  }
})
</script>
