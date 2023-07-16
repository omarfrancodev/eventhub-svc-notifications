import { Repository } from 'typeorm';
import { Notification } from '../../domain/Notification';
import { INotificationRepository } from '../../domain/INotificationRepository';
import { AppDataSource } from '../data-source';

export class NotificationRepository implements INotificationRepository {
    private repository: Repository<Notification>;

    constructor() {
        this.repository = AppDataSource.getRepository(Notification)
    }

    async create(notification: Notification): Promise<Notification> {
        return this.repository.save(notification);
    }

    async update(notification: Notification): Promise<Notification> {
        return this.repository.save(notification);
    }

    async findById(notificationId: number): Promise<Notification | null> {
        return this.repository.findOneBy({ notificationId: notificationId });
    }
    
    async findAll(): Promise<Notification[]> {
        return this.repository.find();
    }

    async findByUserId(userId: number): Promise<Notification[]> {
        return await this.repository.findBy({ userId: userId });
    }
}