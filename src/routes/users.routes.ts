import { Router } from 'express'

// => Services
import CreateUser from '../services/user/create.service'
import UploadAvatar from '../services/avatar/upload.service'
import DeleteUser from '../services/user/delete.service'

// => Configs
import upload from '../config/multer.config'
import authMiddleware from '../middlewares/auth.middleware'

const routes = Router()

routes.post('/', async (req, res) => {
  const user = await CreateUser.execute(req.body)
  return res.status(201).json(user)
})

routes.use(authMiddleware)

routes.post('/avatar', upload.single('file'), async (req, res) => {
  const { filename: file } = req.file
  const { id: userId } = req.user

  UploadAvatar.execute({ file, userId })

  return res.status(201).json({ message: 'Success' })
})

routes.delete('/', upload.single('file'), async (req, res) => {
  const { password } = req.body as { password: string }
  const { id } = req.user

  DeleteUser.execute({ id, password })

  return res.status(201).json({ message: 'Success' })
})

export default routes
