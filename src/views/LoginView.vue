<template>
  <div class="container">
    <TheSplashScreen :duration="3" />
    <div class="flex items-center justify-center h-screen">
      <TheCard card-class="py-12 w-[560px] bg-white rounded-4xl">
        <div class="flex flex-col gap-2 w-[375px] mx-auto">
          <h1 class="text-primary-blue text-3xl font-bold text-center pb-2">ESPACE CLIENT</h1>

          <TheInput
            v-model="email"
            :add-icon-left="true"
            container-class="mt-2"
            input-type="email"
            input-placeholder="E-mail ou identifiant"
            input-class="bg-gray-100 text-primary-blue shadow-custom-gap-base font-medium rounded-lg focus:outline-none text-center"
            input-error="Veuillez entrer un e-mail valide"
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
            container-class="mt-2"
            input-placeholder="Mot de passe"
            input-class="bg-gray-100 text-primary-blue shadow-custom-gap-base font-medium rounded-lg focus:outline-none text-center"
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
            <RouterLink
              :to="{ name: 'reset-password' }"
              class="text-primary-blue font-bold underline"
            >
              <IconLock mini class="inline" />
              Mot de passe oublié ?
            </RouterLink>
          </p>

          <TheButton
            btn-class="w-full uppercase bg-dark-blue-text rounded-lg uppercase mt-4 font-semibold"
            @click="handleSubmit"
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

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleSubmit = () => {
  console.log('Data submitted:', {
    email: email.value,
    password: password.value,
  })
}
</script>
