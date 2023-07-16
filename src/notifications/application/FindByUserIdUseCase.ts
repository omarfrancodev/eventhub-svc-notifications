import { INotificationRepository } from "../domain/INotificationRepository";
import { Notification } from "../domain/Notification";

export class FindByUserIdUseCase {
    constructor(private readonly notificationRepository: INotificationRepository) { }

    async run(userId: number): Promise<Notification[]> {
        return await this.notificationRepository.findByUserId(userId);
    }
}