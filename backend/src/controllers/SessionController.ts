import express, { Request, Response } from 'express'

import TOng from '../types/ong'
import TControllerBase from '../types/TControllerBase'
import Db from '../database/connection'

class SessionController implements TControllerBase {
  public path = '/session'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes(): void {
    this.router.post(this.path, this.create)
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.body

    const ong = await Db<TOng>('ongs').where('id', id).select('name').first()

    if (!ong) {
      return res.status(400).json({ error: 'No ONG found with this ID' })
    }

    return res.json(ong)
  }
}

export default SessionController
