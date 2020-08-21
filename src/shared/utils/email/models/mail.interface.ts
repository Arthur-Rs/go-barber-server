import ISendMailDTO from '../dtos/send_mail.dto'

export default interface IMail {
  sendMail(data: ISendMailDTO): Promise<void>
}
