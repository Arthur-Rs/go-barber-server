import IParserTemplateMail from '../dtos/parser_template_mail.dto'

export default interface ITemplateMail {
  parse(data: IParserTemplateMail): Promise<string>
}
