import { INotificationRepository } from "../domain/INotificationRepository";
import { Notification } from "../domain/Notification";

export class FindAllNotificationsUseCase {
    constructor(private readonly notificationRepository: INotificationRepository) { }

    async run(): Promise<Notification[]> {
        const notifications = await this.notificationRepository.findAll();
        return notifications;
    }
}
