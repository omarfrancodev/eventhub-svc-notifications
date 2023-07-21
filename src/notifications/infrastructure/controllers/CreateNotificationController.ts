import { Request, Response } from 'express';
import { CreateNotificationUseCase } from '../../application/CreteNotificationUseCase';
import { Notification } from '../../domain/Notification';
import { validationResult } from 'express-validator';
import saveLogFile from '../LogsErrorControl';

export class CreateNotificationController {
    constructor(private readonly createNotificationUseCase: CreateNotificationUseCase) { }

    async run(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        try {
            const jsonData = req.body;
            const notification = new Notification();
            notification.senderId = jsonData.senderId;
            notification.receiverId = jsonData.receiverId;
            notification.title = jsonData.title;
            notification.body = jsonData.body;
            notification.providerName = jsonData.providerName;
            notification.eventName = jsonData.eventName;
            notification.type = jsonData.type;

            const createdProvider = await this.createNotificationUseCase.run(notification);

            return res.status(201).json(createdProvider);
        } catch (error) {
            console.error(error);
            saveLogFile(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}