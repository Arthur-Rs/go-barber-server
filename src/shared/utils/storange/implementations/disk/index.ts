import fs from 'fs'
import { resolve } from 'path'

import { pathFolder, pathUpload } from '@config/multer.config'
import IStorage from '../../models/storange.interface'

class DiskStorage implements IStorage {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      resolve(pathFolder, file),
      resolve(pathUpload, 'upload', file)
    )

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = resolve(pathUpload, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

export default DiskStorage
