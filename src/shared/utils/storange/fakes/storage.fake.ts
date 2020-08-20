import IStorage from '../models/storange.interface'

class FakeStorage implements IStorage {
  private avatar: string[] = []

  public async saveFile(file: string): Promise<string> {
    this.avatar.push(file)
    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const fileIndex = this.avatar.indexOf(file)
    this.avatar.splice(fileIndex, 1)
  }
}

export default FakeStorage
