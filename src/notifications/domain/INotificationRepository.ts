import { Notification } from "./Notification";

export interface INotificationRepository {
  create(notification: Notification): Promise<Notification>;
  update(notification: Notification): Promise<Notification>;
  findById(notificationId: number): Promise<Notification | null>;
  findAll(): Promise<Notification[]>;
  findByUserId(userId: number): Promise<Notification[]>;
}
