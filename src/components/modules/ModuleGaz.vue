<template>
  <module-card
    title="GAZ"
    :icon="Droplet"
    :topImg="moduleGazUpLeft"
    :bottomImg="moduleGazBottomRight"
    :modules="modules"
  />
</template>

<script setup>
import { Droplet } from 'lucide-vue-next'
import ModuleCard from './ModuleCard.vue'
import moduleGazUpLeft from '@/assets/images/icones/module-gaz-up-left.png'
import moduleGazBottomRight from '@/assets/images/icones/module-gaz-bottom-right.png'
import { modules } from '@/utils/modules.js'

</script>
