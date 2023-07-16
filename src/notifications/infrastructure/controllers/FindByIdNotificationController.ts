import { Request, Response } from 'express';
import { FindByIdNotificationUseCase } from '../../application/FindByIdNotificationUseCase';
import saveLogFile from '../LogsErrorControl';

export class FindByIdNotificationController {
    constructor(private readonly findByIdNotificationUseCase: FindByIdNotificationUseCase) { }

    async run(req: Request, res: Response): Promise<Response>{
        const notificationId = isNaN(Number(req.params.id)) ? null : Number(req.params.id);
        if (!notificationId) {
          return res.status(400).json({ error: 'Invalid notification ID' });
        }
        try {
          const notification = await this.findByIdNotificationUseCase.run(notificationId);
          if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
          }
    
          return res.status(200).json(notification);
        } catch (error) {
          console.error(error);
          saveLogFile(error);
          return res.status(500).json({ error: 'Internal server error' });
        }
    }
}