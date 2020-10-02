import { container } from 'tsyringe'

import DiskStorage from '../implementations/disk'
import IStorage from '../models/storange.interface'

container.registerSingleton<IStorage>('Storage', DiskStorage)
