import express, { Request, Response } from 'express'

import TIncident from '../types/incident'
import TControllerBase from '../types/TControllerBase'
import Db from '../database/connection'

class ProfileController implements TControllerBase {
  public path = '/profile'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes(): void {
    this.router.get(this.path, this.index)
  }

  index = async (req: Request, res: Response): Promise<Response> => {
    const ong_id = req.headers.authorization

    const incidents = await Db<TIncident>('incidents').where('ong_id', ong_id).select('*')

    return res.json(incidents)
  }
}

export default ProfileController
