import CryptoJS from 'crypto-js'
const CRYPTOKEY = 'otwoo'

const cryptoEncrypt = (data) => {
  return CryptoJS.AES.encrypt(data, CRYPTOKEY).toString()
}

const cryptoDecrypt = (data) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data.toString(), CRYPTOKEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (e) {
    return null
  }
}

export const storage = {
  getStorage(key) {
    const item = localStorage.getItem(key)
    return JSON.parse(cryptoDecrypt(item))
  },
  setStorage(key, item) {
    localStorage[key] = cryptoEncrypt(JSON.stringify(item))
  },
  removeStorage(key) {
    localStorage.removeItem(key)
  },
  clearAllStorage() {
    localStorage.clear()
  },
}
