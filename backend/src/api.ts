import express from 'express'
import { errors } from 'celebrate'

class Api {
  public express: express.Application
  public port: number

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.express = express()
    this.port = appInit.port

    this.middlewares(appInit.middleWares)
    this.routes(appInit.controllers)
    this.express.use(errors())
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }): void {
    middleWares.forEach((middleWare) => {
      this.express.use(middleWare)
    })
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }): void {
    controllers.forEach((controller) => {
      this.express.use('/', controller.router)
    })
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`)
    })
  }
}

export default Api
