import { Request, Response } from "express";
import { FindByIdNotificationUseCase } from "../../application/FindByIdNotificationUseCase";
import saveLogFile from '../LogsErrorControl';
import admin = require("firebase-admin");
const serviceAccount = require('../../../config/push-notification-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export class SendNotificationController {
    private fcmService: admin.messaging.Messaging;

    constructor(private readonly findByIdNotificationUseCase: FindByIdNotificationUseCase) {
        this.fcmService = admin.messaging();
    }

    async run(req: Request, res: Response): Promise<Response> {
        const notificationId = isNaN(Number(req.params.id)) ? null : Number(req.params.id);
        if (!notificationId) {
            return res.status(400).json({ error: 'Invalid notification ID' });
        }
        try {
            const notification = await this.findByIdNotificationUseCase.run(notificationId);
            if (!notification) {
                return res.status(404).json({ error: 'Notification not found' });
            }
            const targetDeviceToken = req.body.fcm_token;

            const message: admin.messaging.Message = {
                token: targetDeviceToken,
                notification: {
                    title: notification.title,
                    body: notification.body,
                },
                data: {
                    senderId: String(notification.senderId),
                    receiverId: String(notification.receiverId),
                    providerName: notification.providerName,
                    eventName: notification.eventName,
                    type: notification.type
                },
                // android: {
                //     priority: "high",
                // },
            };
            const response = await this.fcmService.send(message);
            console.log("Successfully sent notification:", response)
            return res.status(202).json(response);
        } catch (error) {
            console.error(error);
            saveLogFile(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}