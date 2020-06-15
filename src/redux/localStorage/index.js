var SecureStorage = require("secure-web-storage")
var CryptoJS = require("crypto-js")
var SECRET_KEY = 'passion poney . com'

const secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECRET_KEY)
        return key.toString()
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);
        data = data.toString()
        return data
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY)
        data = data.toString(CryptoJS.enc.Utf8)
        return data
    }
})

export const loadState = () => {
  try {
    const serializedState = secureStorage.getItem('state');
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    secureStorage.setItem('state', serializedState)
    // localStorage.setItem('state', serializedState)
  } catch {
    // ignore write errors
  }
}