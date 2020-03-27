import Knex from 'knex'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../knexfile')

const configEnv = process.env.NODE_ENV === 'test' ? config.test : config.development

const instance: Knex = Knex(configEnv as Knex.Config)

export const timestamp = (): string => new Date().toUTCString()

export default instance
