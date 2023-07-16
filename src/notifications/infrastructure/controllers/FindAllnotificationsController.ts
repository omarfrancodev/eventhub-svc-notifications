import { Request, Response } from 'express';
import { FindAllNotificationsUseCase } from '../../application/FindAllNotificationsUseCase';
import saveLogFile from '../LogsErrorControl';

export class FindAllNotificationsController {
    constructor(private readonly findAllNotificationsUseCase: FindAllNotificationsUseCase) {}

    async run(req: Request, res: Response): Promise<Response> {
        try {
            const notifications = await this.findAllNotificationsUseCase.run();
            return res.status(200).json(notifications);
          } catch (error) {
            console.error(error);
            saveLogFile(error);
            return res.status(500).json({ error: 'Internal server error' });
          }
    }
}