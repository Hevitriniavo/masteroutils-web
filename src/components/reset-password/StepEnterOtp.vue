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

            <the-input
              :value="code"
              @update-value="code = $event"
              :add-icon-left="true"
              :add-label="true"
              container-class="mt-2"
              label-text="Code"
              label-class="text-primary-blue"
              input-class="bg-gray-100 shadow-custom-gap-base font-light rounded-lg focus:outline-none"
            >
              <template #iconLeft>
                <lock-keyhole class="w-5  h-5 text-primary-blue" />
              </template>
            </the-input>
          </div>

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
import { LockKeyhole } from 'lucide-vue-next'

import TheCard from '@/components/ui/TheCard.vue'
import TheInput from '@/components/ui/TheInput.vue'
import TheButton from '@/components/ui/TheButton.vue'

const  props = defineProps({
  defaultCode: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['next'])

const code = ref(props.defaultCode)

const handleSubmit = () => {
  emit('next', code.value)
}
</script>
