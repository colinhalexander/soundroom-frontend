import encryptor from 'simple-encryptor'
import firebase from 'firebase-functions'

export default encryptor({
  key: firebase.config().encryption.key,
  hmac: false,
})