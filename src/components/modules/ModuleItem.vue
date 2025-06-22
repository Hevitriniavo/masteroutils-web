<template>
  <div
    @click="onClickModuleItem"
    class="group w-[290px] h-[220px] relative [transform-style:preserve-3d] [perspective:1000px]"
    :class="[itemEnabled ? 'cursor-pointer' : 'cursor-not-allowed']"
  >
    <div
      class="absolute inset-0 flex items-center justify-center bg-white rounded-lg transition-transform duration-500 group-hover:rotate-y-180 [backface-visibility:hidden]"
    >
      <div class="flex flex-col items-center gap-2 px-4 text-center" test-id="test_miit">
        <ModuleIcon :name="moduleValue.name" />

        <p class="text-md font-semibold text-gray-800">
          {{ moduleValue.title }}
        </p>
      </div>
    </div>

    <div
      class="absolute inset-0 overflow-hidden bg-white rounded-lg transition-transform duration-500 rotate-y-180 group-hover:rotate-y-0 [backface-visibility:hidden] flex items-center justify-center"
    >
      <div class="relative w-full h-full">
        <img
          :src="group === 'gaz' ? gazUpLeft : elecUpLeft"
          alt="image du module"
          class="absolute max-h-64 top-0 left-0"
        />

        <ul
          class="text-sm text-gray-700 w-full h-full flex justify-center items-center flex-col gap-2 p-5 text-center z-10"
        >
          <li v-for="(line, index) in moduleValue.descriptions" :key="index" test-id="test_mid">
            {{ line }}
          </li>
        </ul>

        <img
          :src="group === 'gaz' ? gazBottomRight : elecBottomRight"
          alt="image du module"
          class="absolute max-h-52 bottom-0 right-0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ModuleIcon from './ModuleIcon.vue'
import gazUpLeft from '@/assets/images/icones/gaz-up-left.png'
import gazBottomRight from '@/assets/images/icones/gaz-bottom-right.png'
import elecUpLeft from '@/assets/images/icones/elec-up-left.png'
import elecBottomRight from '@/assets/images/icones/elec-bottom-right.png'
import { computed } from 'vue'

const props = defineProps({
  group: {
    type: String,
    default: 'elec', // elect, gaz
  },
  /**
   * @type {
   *  title: String,
   *  name: String
   *  descriptions: String[]
   * }
   */
  moduleValue: {
    type: Object,
    reauired: true,
  },
  spaceEnabled: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['moduleItemShow'])

const itemEnabled = computed(() => {
  const apiModule = props.moduleValue._api_module || {}

  return !!apiModule.lien && props.spaceEnabled
})

const onClickModuleItem = () => {
  if (itemEnabled.value) {
    emit('moduleItemShow')
  }
}
</script>
