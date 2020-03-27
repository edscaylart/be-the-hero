import express from 'express'
import cors from 'cors'

import Api from './api'
import SessionController from './controllers/SessionController'
import OngController from './controllers/OngController'
import IncidentController from './controllers/IncidentController'
import ProfileController from './controllers/ProfileController'

const app = new Api({
  port: 3333,
  controllers: [
    new SessionController(),
    new OngController(),
    new IncidentController(),
    new ProfileController()
  ],
  middleWares: [express.json(), cors()]
})

export default app
