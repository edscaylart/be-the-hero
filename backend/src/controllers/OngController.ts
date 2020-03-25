import express, { Request, Response } from 'express'
import crypto from 'crypto'

import TOng from '../types/ong'
import TControllerBase from '../types/TControllerBase'
import Db from '../database/connection'

class OngController implements TControllerBase {
  public path = '/ongs'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes(): void {
    this.router.get(this.path + '/:id', this.show)
    this.router.get(this.path, this.index)
    this.router.post(this.path, this.create)
    this.router.put(this.path + '/:id', this.update)
    this.router.delete(this.path + '/:id', this.destroy)
  }

  index = async (req: Request, res: Response): Promise<Response> => {
    const ongs = await Db('ongs').select<[TOng]>('*')

    return res.json(ongs)
  }

  show = async (req: Request, res: Response): Promise<Response> => {
    const ong = await Db<TOng>('ongs').where('id', req.params.id).first()

    return res.json(ong)
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    const ong: TOng = req.body
    ong.id = crypto.randomBytes(4).toString('HEX')

    await Db('ongs').insert(ong)

    return res.json(ong)
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    const ong: TOng = req.body
    delete ong.id

    await Db('ongs').where('id', req.params.id).update(ong)

    return res.json(true)
  }

  destroy = async (req: Request, res: Response): Promise<Response> => {
    await Db('ongs').where('id', req.params.id).del()

    return res.json(true)
  }
}

export default OngController
