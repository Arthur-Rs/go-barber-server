import { container } from 'tsyringe'

import '../utils/storage/container'

import '@modules/users/container'
import '@modules/notifications/container'
import '@modules/appointments/container'

import IMail from '@shared/utils/email/models/mail.interface'
import Mail from '@shared/utils/email/implementations/ethereal'

import MailTemplate from '@shared/utils/email/templates/implementations/handlebars'
import IMailTemplate from '@shared/utils/email/templates/models/template_mail.interface'

import Cache from '@shared/utils/cache/implementations/redis'
import ICache from '@shared/utils/cache/models/cache.interface'

container.registerSingleton<IMailTemplate>('MailTemplate', MailTemplate)

container.registerInstance<IMail>('Email', container.resolve(Mail))

container.registerSingleton<ICache>('Cache', Cache)
