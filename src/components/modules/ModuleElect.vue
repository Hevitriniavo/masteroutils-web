<template>
  <module-card
    title="ELECTRICITÉ"
    :icon="Lightbulb"
    :topImg="moduleElecUpLeft"
    :bottomImg="moduleElecBottomRight"
    :modules="modules"
  />
</template>

<script setup>
import { Lightbulb } from 'lucide-vue-next'
import ModuleCard from './ModuleCard.vue'
import moduleElecUpLeft from '@/assets/images/icones/module-elec-up-left.png'
import moduleElecBottomRight from '@/assets/images/icones/module-elec-bottom-right.png'
import { modules } from '@/utils/modules.js'
</script>
