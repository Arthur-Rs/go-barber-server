import { injectable, inject } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'
import IMail from '../../models/mail.interface'
import ISendMailDTO from '../../dtos/send_mail.dto'
import ITemplateEmail from '../../templates/models/template_mail.interface'

@injectable()
class EtherealMail implements IMail {
  private client: Transporter

  constructor(
    @inject('MailTemplate')
    private template: ITemplateEmail
  ) {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })

      this.client = transporter
    })
  }

  public async sendMail(data: ISendMailDTO): Promise<void> {
    const { to, from, subject, templateData } = data
    const message = await this.client.sendMail({
      to: {
        address: to.email,
        name: to.name,
      },
      from: {
        address: from?.email || 'contato@gobarber.com',
        name: from?.name || 'GoBarber',
      },
      subject,
      html: await this.template.parse(templateData),
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default EtherealMail
