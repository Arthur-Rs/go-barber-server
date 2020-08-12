import { Router } from 'express'

// => Services
import Authenticate from '../services/session/authenticate.service'

const routes = Router()

routes.post('/', async (req, res) => {
  const appointment = await Authenticate.execute(req.body)
  return res.status(201).send(appointment)
})

export default routes
