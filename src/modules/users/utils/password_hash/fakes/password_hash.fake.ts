import IPasswordHashModel from '../model/password_hash.interface'

class PasswordHashFake implements IPasswordHashModel {
  public async generateHash(payload: string): Promise<string> {
    return payload
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed
  }
}

export default PasswordHashFake
