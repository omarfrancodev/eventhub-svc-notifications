import { INotificationRepository } from "../domain/INotificationRepository";
import { Notification } from "../domain/Notification";

export class UpdateNotificationUseCase {
    constructor(private readonly notificationRepository: INotificationRepository) { }

    async run(notification: Notification, updatedNotificationData: Partial<Notification>): Promise<Notification> {
        const updatedNotification = Object.assign(notification, updatedNotificationData);

        return this.notificationRepository.update(updatedNotification);
    }
}