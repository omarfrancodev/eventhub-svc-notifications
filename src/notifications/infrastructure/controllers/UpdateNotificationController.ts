import { Request, Response } from 'express';
import { UpdateNotificationUseCase } from '../../application/UpdateNotificationUseCase';
import { FindByIdNotificationUseCase } from '../../application/FindByIdNotificationUseCase';
import saveLogFile from '../LogsErrorControl';

export class UpdateNotificationController {
    constructor(
        private readonly updateNotificationUseCase: UpdateNotificationUseCase,
        private readonly findByIdNotificationUseCase: FindByIdNotificationUseCase
    ) { }


    async run(req: Request, res: Response): Promise<Response> {
        const notificationId = isNaN(Number(req.params.id)) ? null : Number(req.params.id);
        if (!notificationId) {
            return res.status(400).json({ error: 'Invalid notification ID' });
        }
        try {
            const updatedNotificationData = req.body;
            const existingNotification = await this.findByIdNotificationUseCase.run(notificationId);

            if (!existingNotification) {
                return res.status(404).json({ error: "Notification not found" });
            }

            let status = existingNotification.status;
            if (updatedNotificationData.status !== undefined){
                status = Boolean(updatedNotificationData.status);
            }
            
            const updatedNofication = {
                ...existingNotification,
                ...updatedNotificationData,
                status,
            };

            const result = await this.updateNotificationUseCase.run(existingNotification, updatedNofication);

            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            saveLogFile(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}