import * as crypto from 'crypto'

export function DecryptAES(data: string, pubkey: string) {
  const algorithm = 'aes-192-cbc'
  const key = crypto.scryptSync(pubkey, 'salt', 24)
  // The IV is usually passed along with the ciphertext.
  const iv = Buffer.from('myIVmyIVmyIVmyIV', 'utf8')

  const decipher = crypto.createDecipheriv(algorithm, key, iv)

  let decrypted = decipher.update(data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
