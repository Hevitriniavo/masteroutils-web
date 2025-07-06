import { defineStore } from 'pinia'
import { ref } from 'vue'
import { axiosWrapper } from './axios'
import { EMBED_INFO, ESPACE_MODULE, GET_CAPACITE_DETAILS } from './endpoints'
import modules from '@/utils/modules'

export const useModuleStore = defineStore('module', () => {
  const gazs = ref([])
  const elecs = ref([])
  const showWelcome = ref(false)
  const monEspace = ref(null)

  const _mapModulesByOnglet = (modulesList, onglet, apiModules) => {
    return modulesList.map((m) => {
      const espaceModule = apiModules.find(
        (r) => r.onglet === onglet && r.module?.icon_name === m.name,
      )
      return {
        ...m,
        _api_module: espaceModule,
      }
    })
  }

  const getAllModules = async () => {
    try {
      const response = await axiosWrapper.get(`${ESPACE_MODULE}/mon-espace`)
      if (response.data) {
        const apiModules = response.data.modules || []

        gazs.value = _mapModulesByOnglet(modules, 'GAZ', apiModules)
        elecs.value = _mapModulesByOnglet(modules, 'ELECTRICITE', apiModules)

        monEspace.value = response.data.espace_client || null
      }
    } catch (error) {
      console.error('Error fetching modules:', error)
      throw new Error('Erreur lors de la récupération des modules.')
    }
  }

  const getEmbedInfo = ({ id, type, onglet, group }) => {
    let params = `id=${id}&type=${type}`
    if (onglet) {
      params = `${params}&onglet=${onglet}`
    }
    if (group) {
      params = `${params}&group=${group}`
    }
    return axiosWrapper.get(`${EMBED_INFO}?${params}`).then((res) => res.data)
  }

  const getCapacityDetails = () => {
    return axiosWrapper.get(GET_CAPACITE_DETAILS).then((res) => res.data)
  }

  return {
    showWelcome,
    gazs,
    elecs,
    monEspace,
    getAllModules,
    getEmbedInfo,
    getCapacityDetails,
  }
})
