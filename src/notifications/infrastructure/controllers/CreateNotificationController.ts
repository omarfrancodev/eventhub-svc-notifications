import { Request, Response } from 'express';
import { CreateNotificationUseCase } from '../../application/CreteNotificationUseCase';
import { Notification } from '../../domain/Notification';
import saveLogFile from '../LogsErrorControl';
import admin = require("firebase-admin");
import { validationResult } from 'express-validator';
const serviceAccount = require('../../../config/push-notification-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export class CreateNotificationController {
    private fcmService: admin.messaging.Messaging;

    constructor(private readonly createNotificationUseCase: CreateNotificationUseCase) {
        this.fcmService = admin.messaging();
    }

    async run(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        try {
            const formData = req.body;
            const targetDeviceToken = formData.fcm_token;

            const notification = new Notification();
            notification.senderId = formData.senderId;
            notification.receiverId = formData.receiverId;
            notification.providerName = formData.providerName;
            notification.eventName = formData.eventName;
            notification.typeNotification = formData.typeNotification;

            const createdProvider = await this.createNotificationUseCase.run(notification);

            await this.sendNotificationToDevice(notification, targetDeviceToken, formData.title, formData.body);

            return res.status(201).json(createdProvider);
        } catch (error) {
            console.error(error);
            saveLogFile(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    private async sendNotificationToDevice(notification: Notification, deviceToken: string, title: string, body: string){
        try {
            const message: admin.messaging.Message = {
                token: deviceToken,
                notification: {
                    title: title,
                    body: body,
                },
                data: {
                    senderId: String(notification.senderId),
                    receiverId: String(notification.receiverId),
                    providerName: notification.providerName,
                    eventName: notification.eventName,
                },
            };

            await this.fcmService.send(message);
            console.log("Notification sent")
        } catch (error) {
            console.error(error);
            saveLogFile(error);
        }
    }
}