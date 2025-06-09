<template>
  <the-card card-class="p-24 max-w-[650px] bg-white rounded-4xl">
    <template #default>
      <div class="flex flex-col gap-4">
        <h1 class="text-primary-blue text-[40px] font-bold text-center pb-2">
          Mot de passe oublié
        </h1>

        <p class="text-primary-blue text-[14px]">
          Veuillez entrer votre adresse email pour réinitialiser votre mot de passe
        </p>

        <the-input
          :add-icon-left="true"
          :add-label="true"
          container-class="mt-2"
          input-type="email"
          label-text="E-mail"
          label-class="text-primary-blue"
          input-class="bg-gray-100 shadow-custom-gap-base font-light rounded-lg focus:outline-none"
          :value="email"
          @update-value="email = $event"
        >
          <template #iconLeft>
            <Mail class="w-5 h-5 text-primary-blue" />
          </template>
        </the-input>

        <the-button
          btn-class="w-full bg-dark-blue-text rounded-lg uppercase"
          @btn-click="handleSubmit"
        >
          Valider
        </the-button>
      </div>
    </template>
  </the-card>
</template>

<script setup>
import { ref } from 'vue'
import { Mail } from 'lucide-vue-next'

import TheCard from '@/components/ui/TheCard.vue'
import TheInput from '@/components/ui/TheInput.vue'
import TheButton from '@/components/ui/TheButton.vue'

const props = defineProps({
  defaultEmail: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['next'])

const email = ref(props.defaultEmail)

const handleSubmit = () => {
  emit('next', email.value)
}
</script>
