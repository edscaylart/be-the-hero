/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require('crypto')

export default function createUID(): string {
  return crypto.randomBytes(4).toString('HEX')
}
