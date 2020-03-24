import Knex from 'knex'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../knexfile')

const instance: Knex = Knex(config.development as Knex.Config)

export const timestamp = (): string => new Date().toUTCString()

export default instance
