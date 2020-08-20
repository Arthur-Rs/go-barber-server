import IMail from '../models/mail.interface'

interface IMessages {
  to: string
  body: string
}

class FakeMail implements IMail {
  private emails: IMessages[] = []

  public async sendMail(to: string, body: string): Promise<void> {
    this.emails.push({ to, body })
  }
}

export default FakeMail
