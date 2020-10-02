import { container } from 'tsyringe'

import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/notification.repository'
import INotificationRepository from '@modules/notifications/repositories/notification-repository.interface'

container.registerSingleton<INotificationRepository>(
  'notification-repository',
  NotificationRepository
)
