import encryptor from 'simple-encryptor'

const getKey = async () => {
  return await fetch("https://soundroom-1.herokuapp.com/encryption")
    .then(response => response.json())
    .then(response => response.key)
}

const configureEncryptor = async () => {
  return encryptor({
    key: await getKey(),
    hmac: false,
  })
}

export default configureEncryptor