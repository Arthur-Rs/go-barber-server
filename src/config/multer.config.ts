import multer, { diskStorage } from 'multer'
import { resolve, extname } from 'path'
import { randomBytes } from 'crypto'

export const path = resolve(__dirname, '..', '..', 'tmp')

const storage = diskStorage({
  destination: path,
  filename: (req, file, cb) => {
    const { originalname } = file
    const filename = `${randomBytes(16).toString('hex')}${extname(
      originalname
    )}`

    return cb(null, filename)
  },
})

const upload = multer({ storage })

export default upload
