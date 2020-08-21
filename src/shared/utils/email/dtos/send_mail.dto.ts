import iParserTemplateDTO from '../templates/dtos/parser_template_mail.dto'

interface IMailContent {
  name: string
  email: string
}

export default interface ISendMailDTO {
  to: IMailContent
  from?: IMailContent
  subject: string
  templateData: iParserTemplateDTO
}
