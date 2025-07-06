<template>
  <div :class="['relative w-full', containerClass]">
    <div class="relative">
      <span
        v-if="addIconLeft && $slots.iconLeft"
        class="absolute left-[29px] top-1/2 transform -translate-y-1/2"
        :class="{ 'hover:cursor-pointer': addIconLeftHover }"
      >
        <slot name="iconLeft" />
      </span>

      <span
        v-if="addIconRight && $slots.iconRight"
        class="absolute right-[29px] top-1/2 transform -translate-y-1/2"
        :class="{ 'hover:cursor-pointer': addIconRightHover }"
      >
        <slot name="iconRight" />
      </span>

      <input
        :type="inputType"
        v-model="localValue"
        :class="[
          'block w-full py-3 text-sm placeholder-primary-blue placeholder:text-md placeholder:font-light',
          addIconLeft ? 'pl-[55px]' : 'pl-[29px]',
          addIconRight ? 'pr-[55px]' : 'pr-[29px]',
          inputClass,
        ]"
        :placeholder="inputPlaceholder"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
    </div>
    <p v-if="inputError" class="mt-1 text-sm text-red-500">{{ inputErrorMessage }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  inputType: {
    type: String,
    default: 'text',
  },
  containerClass: {
    type: [String, Object, Array],
    default: () => null,
  },
  addIconLeft: {
    type: Boolean,
    default: false,
  },
  addIconLeftHover: {
    type: Boolean,
    default: false,
  },
  addIconRight: {
    type: Boolean,
    default: false,
  },
  addIconRightHover: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: '',
  },
  inputPlaceholder: {
    type: String,
    default: '',
  },
  inputError: {
    type: Boolean,
    default: false,
  },
  inputErrorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const localValue = computed({
  get() {
    return props.modelValue || ''
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
