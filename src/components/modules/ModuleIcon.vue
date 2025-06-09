<template>
  <img :src="icons[name]" alt="icon du module" class="w-[75px] h-[75px] mb-2 object-contain" />
</template>

<script setup>
import dashboard from '@/assets/images/icones/dashboard.png'
import suivi from '@/assets/images/icones/suivi.png'
import flux from '@/assets/images/icones/flux.png'
import technique from '@/assets/images/icones/technique.png'
import achat from '@/assets/images/icones/achat.png'
import offre from '@/assets/images/icones/offre.png'
import environnement from '@/assets/images/icones/environnement.png'
import rapport from '@/assets/images/icones/rapport.png'

const icons = {
  dashboard,
  suivi,
  flux,
  technique,
  achat,
  offre,
  environnement,
  rapport,
}

defineProps({
  name: {
    type: String,
    required: true,
    validator: (value) => {
      return [
        'dashboard',
        'suivi',
        'flux',
        'technique',
        'achat',
        'offre',
        'environnement',
        'rapport',
      ].includes(value)
    },
  },
})
</script>
