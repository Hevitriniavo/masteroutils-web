<template>
  <TheCard card-class="p-24 max-w-[650px] bg-white rounded-4xl">
    <div class="flex flex-col gap-4">
      <h1 class="text-primary-blue text-[40px] pb-2 font-bold text-center">Mot de passe oublié</h1>

      <p class="text-primary-blue text-[14px]">Veuillez entrer le nouveau mot de passe</p>

      <the-input
        v-model="password"
        :add-icon-left="true"
        :add-label="true"
        :add-icon-right="true"
        container-class="mt-2"
        :input-type="showPassword ? 'text' : 'password'"
        label-class="text-primary-blue"
        input-class="bg-gray-100 shadow-custom-gap-base font-light rounded-lg focus:outline-none"
        label-text="Nouveau mot de passe"
      >
        <template #iconLeft>
          <lock-keyhole class="w-5 h-5 text-primary-blue" />
        </template>

        <template #iconRight>
          <eye
            v-if="showPassword"
            @click="showPassword = !showPassword"
            class="w-5 h-5 text-primary-blue"
          />
          <eye-off v-else @click="showPassword = !showPassword" class="w-5 h-5 text-primary-blue" />
        </template>
      </the-input>

      <the-input
        v-model="confirmPassword"
        :add-icon-left="true"
        :add-icon-right="true"
        :add-label="true"
        container-class="mt-2"
        :input-type="showConfirmPassword ? 'text' : 'password'"
        label-class="text-primary-blue"
        input-class="bg-gray-100 shadow-custom-gap-base font-light rounded-lg focus:outline-none"
        label-text="Confirmer le mot de passe"
      >
        <template #iconLeft>
          <lock-keyhole class="w-5 h-5 text-primary-blue" />
        </template>
        <template #iconRight>
          <eye
            v-if="showConfirmPassword"
            @click="showConfirmPassword = !showConfirmPassword"
            class="w-5 h-5 text-primary-blue"
          />
          <eye-off
            v-else
            @click="showConfirmPassword = !showConfirmPassword"
            class="w-5 h-5 text-primary-blue"
          />
        </template>
      </the-input>

      <the-button
        btn-class="w-full bg-dark-blue-text rounded-lg uppercase"
        @btn-click="handleSubmit"
      >
        Valider
      </the-button>
    </div>
  </TheCard>
</template>

<script setup>
import { ref } from 'vue'
import { Eye, EyeOff, LockKeyhole } from 'lucide-vue-next'

import TheCard from '@/components/ui/TheCard.vue'
import TheInput from '@/components/ui/TheInput.vue'
import TheButton from '@/components/ui/TheButton.vue'

const props = defineProps({
  defaultPassword: {
    type: String,
    default: '',
  },
  defaultConfirmPassword: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['next'])

const password = ref(props.defaultPassword)
const confirmPassword = ref(props.defaultConfirmPassword)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleSubmit = () => {
  emit('next', {
    password: password.value,
    confirmPassword: confirmPassword.value,
  })
}
</script>
