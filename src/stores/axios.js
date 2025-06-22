import axios from 'axios'
import { storage } from './storage'
import * as constant from './stores-constant'

const myInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})
const FORM_DATA = 'multipart/form-data'
const FORM_URLENCODED = 'application/x-www-form-urlencoded'
const injectAuthToken = (options, authNeeded = true) => {
  if (authNeeded) {
    const headers = options.headers ? options.headers : []
    headers['Authorization'] = `Bearer ${storage.getStorage(constant.STORAGE_KEY_TOKEN)}`
    options.headers = headers
  }
  return options
}
const jsonToFormDataConverter = (json) => {
  var formData = new FormData()
  for (var key in json) {
    formData.append(key, json[key])
  }
  return formData
}
const convertDataToParams = (data) => {
  const params = new URLSearchParams()
  for (var key in data) {
    params.append(key, data[key])
  }
  return params
}
/**
 * Convert a data to a form param
 * @param multipart Indicate if a request is a multipart.
 * @param data The data object to convert
 * @return The form data as a FormData object or a form string data.
 */
const convertData = (data, multipart) => {
  if (multipart === FORM_URLENCODED) {
    return convertDataToParams(data)
  }
  return jsonToFormDataConverter(data)
}
const injectData = (options, data, json = null) => {
  if (data) {
    options.data = data
    if (json != null) {
      options.data = convertData(data, json)
      if (!options.headers) {
        options.headers = {}
      }
      options.headers['Content-Type'] = json
    }
  }
  return options
}
const buildRequestOptions = (
  method,
  url,
  data = null,
  authNeeded = true,
  json = false,
  contentType = FORM_DATA,
) => {
  const options = {
    method,
    url,
  }
  const content = json ? null : contentType
  injectData(options, data, content)
  injectAuthToken(options, authNeeded)
  return options
}

myInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const status = error.response.data.status
    return Promise.reject(error.response.data)
  },
)

export var axiosWrapper = {
  get: (url, authNeeded = true) => {
    return myInstance.request(buildRequestOptions('GET', url, null, authNeeded))
  },
  post: (url, data, authNeeded = true, json = false) => {
    return myInstance.request(buildRequestOptions('POST', url, data, authNeeded, json, FORM_DATA))
  },
  put: (url, data, authNeeded = true, json = false) => {
    return myInstance.request(
      buildRequestOptions('PUT', url, data, authNeeded, json, FORM_URLENCODED),
    )
  },
  delete: (url, authNeeded = true) => {
    return myInstance.request(buildRequestOptions('DELETE', url, null, authNeeded))
  },
}
