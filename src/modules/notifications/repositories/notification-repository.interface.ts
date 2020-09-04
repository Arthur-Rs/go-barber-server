import CreateNotificationDTO from '../dtos/create-notification.dto'
import Notification from '../schemas/notification-entity.interface'

export default interface INotificationRepository {
  create(data: CreateNotificationDTO): Promise<Notification>
}
