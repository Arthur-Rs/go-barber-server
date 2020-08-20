import { compare, hash } from 'bcrypt'
import IPasswordHashModel from '../../model/password_hash.interface'

class Bcrypt implements IPasswordHashModel {
  public async generateHash(payload: string): Promise<string> {
    return await hash(payload, 8)
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed)
  }
}

export default Bcrypt
