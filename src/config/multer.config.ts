import multer, { diskStorage } from 'multer'
import { resolve, extname } from 'path'
import { randomBytes } from 'crypto'

export const pathFolder = resolve(__dirname, '..', '..', 'tmp')
export const pathUpload = resolve(__dirname, '..', '..', 'tmp', 'upload')

const storage = diskStorage({
  destination: pathFolder,
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
