<template>
  <div class="container">
    <TheSplashScreen :duration="3" />
    <div class="flex items-center justify-center h-screen">
      <TheCard card-class="py-12 w-[560px] bg-white rounded-4xl">
        <div class="flex flex-col gap-2 w-[375px] mx-auto">
          <h1 class="text-primary-blue font-semibold text-[40px] text-center pb-2">
            ESPACE CLIENT
          </h1>

          <p class="text-red-600 text-center text-sm" v-if="formLoginError">
            {{ formLoginError }}
          </p>

          <TheInput
            v-model="email"
            :add-icon-left="true"
            container-class="mt-2"
            input-type="email"
            input-placeholder="E-mail ou identifiant"
            input-class="bg-gray-100 text-primary-blue shadow-custom-gap-base font-medium rounded-lg focus:outline-none text-center"
            v-bind="emailProps"
            :input-error-message="errors.email"
            :input-error="!!errors.email"
          >
            <template #iconLeft>
              <IconMail />
            </template>
          </TheInput>

          <TheInput
            v-model="password"
            :add-icon-left="true"
            :add-icon-right="true"
            :add-icon-right-hover="true"
            :input-type="showPassword ? 'text' : 'password'"
            v-bind="passwordProps"
            container-class="mt-2"
            input-placeholder="Mot de passe"
            input-class="bg-gray-100 text-primary-blue shadow-custom-gap-base font-medium rounded-lg focus:outline-none text-center"
            :input-error-message="errors.password"
            :input-error="!!errors.password"
          >
            <template #iconLeft>
              <IconLock />
            </template>
            <template #iconRight>
              <IconEye
                :icon-type="showPassword ? 'on' : 'off'"
                @click="showPassword = !showPassword"
              />
            </template>
          </TheInput>

          <p class="text-sm text-right text-gray-500 mt-2">
            <RouterLink :to="{ name: 'reset-password' }" class="text-primary-blue">
              <IconLock mini class="inline" />
              <span class="ml-2 underline">Mot de passe oublié ?</span>
            </RouterLink>
          </p>

          <TheButton
            btn-class="w-full uppercase bg-dark-blue-text rounded-lg uppercase mt-4 font-semibold"
            @click="handleSubmit"
            :disabled="!meta.valid || !meta.dirty || meta.pending || requestInProgress"
          >
            Se connecter
          </TheButton>
        </div>
      </TheCard>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TheCard from '@/components/ui/TheCard.vue'
import TheInput from '@/components/ui/TheInput.vue'
import TheButton from '@/components/ui/TheButton.vue'
import TheSplashScreen from '@/components/TheSplashScreen.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconLock from '@/components/icons/IconLock.vue'
import IconMail from '@/components/icons/IconMail.vue'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

import { useUserAuthStore } from '@/stores/store-user-auth'
import { useModule } from '@/composables/use-module'
import { useRouter } from 'vue-router'
import { useModuleStore } from '@/stores/store-module'

const storeAuth = useUserAuthStore()
const storeModule = useModuleStore()
const { openUserReporting } = useModule()
const router = useRouter()

const {
  meta,
  errors,
  handleSubmit: handleFormSubmit,
  defineField,
} = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().required(`L'email ou l'identifiant est requis`),
      password: yup.string().required('Le mot de passe est requis'),
    }),
  ),
})
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const showPassword = ref(false)
const formLoginError = ref(null)
const requestInProgress = ref(false)

const handleSubmit = handleFormSubmit(async (values) => {
  formLoginError.value = null
  requestInProgress.value = true
  try {
    await storeAuth.login({
      username: values.email,
      password: values.password,
    })

    requestInProgress.value = false

    storeModule.$patch({ showWelcome: true })

    if (storeAuth.permission === 'ROLE_MODULE') {
      router.push({ name: 'modules_elec' })
    } else {
      openUserReporting()
    }
  } catch (error) {
    formLoginError.value = error.message || 'Une erreur est survenue lors de la connexion.'
    requestInProgress.value = false
  }
})
</script>
