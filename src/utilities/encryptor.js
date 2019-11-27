import encryptor from 'simple-encryptor'
import { superSecretKey } from './env'

export default encryptor(superSecretKey)