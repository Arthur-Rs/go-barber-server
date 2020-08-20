import { container } from 'tsyringe'
import IHashPassword from '../utils/password_hash/model/password_hash.interface'
import Bcrypt from '../utils/password_hash/implementations/bcrypt'

container.registerSingleton<IHashPassword>('Hash', Bcrypt)
