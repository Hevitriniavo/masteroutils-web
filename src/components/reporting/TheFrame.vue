<template>
  <div class="pt-[80px]">
    <div
      ref="report-container"
      id="report-container"
      class="frame"
      :style="`height: calc(100vh - ${head}px);`"
    ></div>

    <WelcomeModal v-if="storeModule.showWelcome" :is-open />
  </div>
</template>

<script setup>
import { useModuleStore } from '@/stores/store-module'
import { usePingingStore } from '@/stores/store-pinging'
import * as pbi from 'powerbi-client'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import WelcomeModal from '../WelcomeModal.vue'
import { useWelcome } from '@/composables/use-welcome'

const head = ref(80)
const { isOpen, hideWelcome } = useWelcome()

const storeModule = useModuleStore()
const route = useRoute()
const storePing = usePingingStore()

const loadEmbedReport = () => {
  storeModule
    .getEmbedInfo(getEmbedInfoParams())
    .then((embedData) => {
      showEmbedInfoOnView(embedData)
    })
    .catch((err) => {
      console.log('ERR_LOAD_REPORT: ', err)
    })
}

const syncCapaciteDetails = async () => {
  const capaciteDetails = await storeModule.getCapacityDetails()
  if (
    capaciteDetails.properties &&
    capaciteDetails.properties.state &&
    capaciteDetails.properties.state.toLowerCase() === 'succeeded'
  ) {
    loadEmbedReport()
  } else {
    setTimeout(() => {
      loadEmbedReport()
    }, 5000)
  }
}

const getEmbedInfoParams = () => {
  const payload = {
    id: route.params.id,
    type: route.params.type,
  }
  if (route.query.group) {
    payload.group = route.query.group
  }
  if (route.query.onglet) {
    payload.onglet = route.query.onglet
  }
  return payload
}

const showEmbedInfoOnView = (embedData) => {
  const models = pbi.models
  const reportContainer = document.querySelector('#report-container')
  const reportLoadConfig = {
    type: 'report',
    tokenType: models.TokenType.Embed,
    accessToken: embedData.token,
    embedUrl: embedData.embedReports[0].embedUrl,
  }
  const powerbi = new pbi.service.Service(
    pbi.factories.hpmFactory,
    pbi.factories.wpmpFactory,
    pbi.factories.routerFactory,
  )
  const report = powerbi.embed(reportContainer, reportLoadConfig)

  // Clear any other loaded handler events
  report.off('loaded')

  // Triggers when a report schema is successfully loaded
  report.on('loaded', function () {
    console.log('Report load successful')
  })

  // Clear any other rendered handler events
  report.off('rendered')

  // Triggers when a report is successfully embedded in UI
  report.on('rendered', function () {
    console.log('Report render successful')
    storePing.pingActivity('report-rendered', getEmbedInfoParams())
  })

  // Clear any other error handler events
  report.off('error')

  // Handle embed errors
  report.on('error', function (event) {
    const errorMsg = event.detail
    console.error(errorMsg)
  })
}

onMounted(() => {
  syncCapaciteDetails()

  hideWelcome(3)
})
</script>

<style scoped>
.frame-container {
  position: relative;
}

.free-trial-bar {
  position: absolute;
  width: 100%;
  height: 43px;
  background-color: #fff;
}

.frame {
  width: 100%;
  overflow: hidden;
}
</style>
