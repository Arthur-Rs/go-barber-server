import { getMongoRepository, MongoRepository } from 'typeorm'

import INotificationRepository from '../../../repositories/notification-repository.interface'
import CreateNotificationDTO from '../../../dtos/create-notification.dto'
import Notification from '../schemas/notification.schema'

class NotificationRepository implements INotificationRepository {
  private ORMRepository: MongoRepository<Notification>

  constructor() {
    this.ORMRepository = getMongoRepository(Notification, 'mongo')
  }

  public async create({
    content,
    recipientID,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = this.ORMRepository.create({
      content,
      recipientID,
    })

    await this.ORMRepository.save(notification)

    return notification
  }
}

export default NotificationRepository
