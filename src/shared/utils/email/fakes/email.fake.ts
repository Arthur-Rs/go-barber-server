import IMail from '../models/mail.interface'
import ISendMailDTO from '../dtos/send_mail.dto'

class FakeMail implements IMail {
  private emails: ISendMailDTO[] = []

  public async sendMail(data: ISendMailDTO): Promise<void> {
    this.emails.push(data)
  }
}

export default FakeMail
