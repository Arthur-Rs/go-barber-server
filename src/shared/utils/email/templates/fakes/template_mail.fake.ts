import ITemplateMail from '../models/template_mail.interface'

class FakeMailTemplate implements ITemplateMail {
  public async parse(): Promise<string> {
    return 'email'
  }
}

export default FakeMailTemplate
