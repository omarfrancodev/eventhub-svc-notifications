import { INotificationRepository } from "../domain/INotificationRepository";
import { Notification } from "../domain/Notification";

export class FindByIdNotificationUseCase {
    constructor(private readonly notificationRepository: INotificationRepository) { }

    async run(notificationId: number): Promise<Notification | null> {
        const notification = await this.notificationRepository.findById(notificationId);
        return notification;
    }
}