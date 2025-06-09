<template>
  <div class="container">
    <TheSplashScreen :duration="5" />
    <div class="flex items-center justify-center h-screen">
      <TheCard card-class="p-12 w-[400px] bg-white rounded-4xl">
        <div class="flex flex-col gap-2">
          <h1 class="text-primary-blue text-3xl font-bold text-center pb-2">
            ESPACE CLIENT
          </h1>

          <TheInput
            v-model="email"
            :add-icon-left="true"
            :add-label="true"
            container-class="mt-2"
            input-type="email"
            label-text="E-mail ou identifiant"
            label-class="text-primary-blue left-20"
            input-class="bg-gray-100 shadow-custom-gap-base font-light rounded-lg focus:outline-none"
          >
            <template #iconLeft>
              <Mail class="w-5 h-5 text-primary-blue" />
            </template>
          </TheInput>

          <TheInput
            v-model="password"
            :add-icon-left="true"
            :add-icon-right="true"
            :add-label="true"
            :input-type="showPassword ? 'text' : 'password'"
            container-class="mt-2"
            label-text="Mot de passe"
            label-class="text-primary-blue left-26"
            input-class="bg-gray-100 shadow-custom-gap-base font-light rounded-lg focus:outline-none"
          >
            <template #iconLeft>
              <LockKeyhole class="w-5 h-5 text-primary-blue" />
            </template>
            <template #iconRight>
              <Eye
                v-if="showPassword"
                @click="showPassword = !showPassword"
                class="w-5 h-5 text-primary-blue cursor-pointer"
              />
              <EyeOff
                v-else
                @click="showPassword = !showPassword"
                class="w-5 h-5 text-primary-blue cursor-pointer"
              />
            </template>
          </TheInput>

          <p class="text-sm text-right text-gray-500 mt-2">
            <RouterLink :to="{ name: 'reset-password' }" class="text-primary-blue font-bold underline">
              <Lock class="inline h-4 w-4 text-primary-blue" />
              Mot de passe oublié ?
            </RouterLink>
          </p>

          <TheButton
            btn-class="w-full uppercase bg-dark-blue-text rounded-lg uppercase mt-4"
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
import { Mail, LockKeyhole, Eye, EyeOff } from 'lucide-vue-next'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleSubmit = () => {
  console.log('Data submitted:', {
    email: email.value,
    password: password.value
  });
}
</script>
