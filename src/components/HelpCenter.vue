<template>
  <div class="fixed bottom-5 right-5 z-50">
    <transition name="help-toggle" mode="out-in">
      <TheButton
        v-if="!helpOpened"
        key="button"
        btnClass="w-[90px] h-[90px] flex justify-center items-center bg-dark-blue-text rounded-full"
        @btn-click="helpOpened = true"
      >
        <IconHelp />
      </TheButton>

      <div v-else key="card" class="bg-dark-blue-text text-white p-5 rounded-lg w-[300px]">
        <div class="flex justify-between">
          <div class="text-h6">Centre d'aide</div>
          <div>
            <IconClose class="cursor-pointer" @click="helpOpened = false" />
          </div>
        </div>
        <div class="text-h1 my-5">Comment souhaitez-vous que l'admin vous contacte?</div>
        <hr class="opacity-30" />

        <div class="flex flex-col gap-3 mt-3">
          <TheButton
            btn-class="border-1 border-white rounded-full"
            @btn-click="storeHelpCenter.sendDemandeHelp('telephone')"
            :disabled="storeHelpCenter.helpRequested || storeHelpCenter.helpToastVisible"
          >
            Téléphone
          </TheButton>
          <TheButton
            btn-class="border-1 border-white rounded-full"
            @btn-click="storeHelpCenter.sendDemandeHelp('email')"
            :disabled="storeHelpCenter.helpRequested || storeHelpCenter.helpToastVisible"
          >
            Email
          </TheButton>
        </div>
      </div>
    </transition>

    <TheToast
      :show="storeHelpCenter.helpToastVisible"
      :message="storeHelpCenter.helpToastMessage"
      :duration="60000"
      @close="onCloseHelpToast"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IconHelp from './icons/IconHelp.vue'
import TheButton from './ui/TheButton.vue'
import IconClose from './icons/IconClose.vue'
import TheToast from './ui/TheToast.vue'
import { useHelpCenterStore } from '@/stores/store-help-center'

const helpOpened = ref(false)

const storeHelpCenter = useHelpCenterStore()

const onCloseHelpToast = () => {
  storeHelpCenter.$patch({ helpToastVisible: false, helpToastMessage: '' })
}
</script>

<style scoped>
.help-toggle-enter-active,
.help-toggle-leave-active {
  transition: all 0.4s ease;
}

.help-toggle-enter-from,
.help-toggle-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
