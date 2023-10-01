import * as crypto from 'crypto'

export function EncryptAES(data: string, pubkey: string) {
  const algorithm = 'aes-192-cbc'
  // Use the async `crypto.scrypt()` instead.
  const key = crypto.scryptSync(pubkey, 'salt', 24)
  // Use `crypto.randomBytes` to generate a random iv instead of the static iv
  // shown here.
  const iv = Buffer.from('myIVmyIVmyIVmyIV', 'utf8')
  const cipher = crypto.createCipheriv(algorithm, key, iv)

  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return encrypted
}
