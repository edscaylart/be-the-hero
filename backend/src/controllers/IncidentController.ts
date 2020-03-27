import express, { Request, Response } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import TIncident from '../types/incident'
import TControllerBase from '../types/TControllerBase'
import Db from '../database/connection'

class IncidentController implements TControllerBase {
  public path = '/incidents'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes(): void {
    this.router.get(
      this.path + '/:id',
      celebrate({
        [Segments.PARAMS]: Joi.object().keys({
          id: Joi.number()
        })
      }),
      this.show
    )
    this.router.get(this.path, celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
      })
    }), this.index)
    this.router.post(
      this.path,
      celebrate({
        [Segments.HEADERS]: Joi.object({
          authorization: Joi.string().required()
        }).unknown(),
        [Segments.BODY]: Joi.object().keys({
          title: Joi.string().required().min(4),
          description: Joi.string().required().min(15),
          value: Joi.number().required()
        })
      }),
      this.create
    )
    this.router.put(
      this.path + '/:id',
      celebrate({
        [Segments.PARAMS]: Joi.object().keys({
          id: Joi.number().required()
        })
      }),
      this.update
    )
    this.router.delete(
      this.path + '/:id',
      celebrate({
        [Segments.PARAMS]: Joi.object().keys({
          id: Joi.number().required()
        })
      }),
      this.destroy
    )
  }

  index = async (req: Request, res: Response): Promise<Response> => {
    const { page = 1 } = req.query

    const [count] = await Db('incidents').count()

    const incidents = await Db('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])

    res.header('X-Total-Count', count['count(*)'])

    return res.json(incidents)
  }

  show = async (req: Request, res: Response): Promise<Response> => {
    const incident = await Db<TIncident>('incidents')
      .where('id', req.params.id)
      .first()

    return res.json(incident)
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    const ong_id = req.headers.authorization

    const incident: TIncident = req.body

    const [id] = await Db('incidents').insert({ ...incident, ong_id })

    return res.json({ id })
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    const incident: TIncident = req.body
    delete incident.id

    await Db('incidents').where('id', req.params.id).update(incident)

    return res.json(true)
  }

  destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const ong_id = req.headers.authorization

    const incident = await Db<TIncident>('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    if (incident?.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permited.' })
    }

    await Db('incidents').where('id', req.params.id).del()

    return res.status(204).send()
  }
}

export default IncidentController
