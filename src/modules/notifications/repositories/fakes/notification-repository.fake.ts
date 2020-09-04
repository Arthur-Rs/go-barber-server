import { ObjectID } from 'mongodb'

import INotificationRepository from '../../repositories/notification-repository.interface'
import CreateNotificationDTO from '../../dtos/create-notification.dto'
import Notification from '../../schemas/notification-entity.interface'

class NotificationRepositoryFake implements INotificationRepository {
  private database: Notification[]

  constructor() {
    this.database = []
  }

  public async create({
    content,
    recipientID,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification: Notification = {
      id: new ObjectID(),
      content,
      recipientID,
    }

    this.database.push(notification)

    return notification
  }
}

export default NotificationRepositoryFake
