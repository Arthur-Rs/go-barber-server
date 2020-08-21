import { compile } from 'handlebars'
import { promises } from 'fs'

import ITemplateMail from '../../models/template_mail.interface'
import IParserMailDTO from '../../dtos/parser_template_mail.dto'

class HandlebarsMailTemplate implements ITemplateMail {
  public async parse(data: IParserMailDTO): Promise<string> {
    const { file, variables } = data

    const template = await promises.readFile(file, {
      encoding: 'utf-8',
    })

    const parsedTemplate = compile(template)

    return parsedTemplate(variables)
  }
}

export default HandlebarsMailTemplate
