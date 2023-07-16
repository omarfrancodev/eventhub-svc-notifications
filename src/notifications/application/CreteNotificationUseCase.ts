import { INotificationRepository } from "../domain/INotificationRepository";
import { Notification } from "../domain/Notification";

export class CreateNotificationUseCase {
    constructor(private readonly notificationRepository: INotificationRepository) { }

    async run(notification: Notification): Promise<Notification> {
        return this.notificationRepository.create(notification);
    }
}