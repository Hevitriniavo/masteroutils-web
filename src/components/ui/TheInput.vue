<template>
  <div :class="[
    'relative w-full',
     containerClass
  ]">
    <span
      v-if="addIconLeft && $slots.iconLeft"
      class="absolute hover:cursor-pointer left-3 top-1/2 transform -translate-y-1/2"
    >
      <slot name="iconLeft" />
    </span>

    <span
      v-if="addIconRight && $slots.iconRight"
      class="absolute right-3  hover:cursor-pointer top-1/2 transform -translate-y-1/2"
    >
      <slot name="iconRight" />
    </span>

    <input
      :id="inputId"
      :type="inputType"
      v-model="localValue"
      @focus="isFocused = true"
      @blur="onBlur"
      :class="[
        'block w-full py-3 text-sm',
        addIconLeft ? 'pl-9' : 'pl-3',
        addIconRight ? 'pr-9' : 'pr-3',
        inputClass
      ]"
    />

    <label
      v-if="addLabel"
      :for="inputId"
      :class="[
        'absolute left-10 transition-all duration-200 ease-in-out pointer-events-none',
        labelClass,
        isFloating ? '-top-6' : 'top-2.5',
      ]"
    >
      {{ labelText }}
    </label>
  </div>
</template>


<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  value: String,
  labelText: String,
  inputType: {
    type: String,
    default: 'text',
  },
  addLabel: {
    type: Boolean,
    default: true,
  },
  containerClass: {
    type: [String, Object, Array],
    default: () => null,
  },
  addIconLeft: {
    type: Boolean,
    default: false,
  },
  addIconRight: {
    type: Boolean,
    default: false,
  },
  labelClass: {
    type: String,
    default: '',
  },
  inputClass: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['updateValue'])

const inputId = 'input-' + Math.random().toString(36).substring(2, 9)
const localValue = ref(props.value || '')
const isFocused = ref(false)

const isFloating = computed(() => isFocused.value || localValue.value !== '')

watch(() => props.value, (newVal) => {
  localValue.value = newVal
})

watch(localValue, (val) => {
  emit('updateValue', val)
})

function onBlur() {
  isFocused.value = false
}
</script>
