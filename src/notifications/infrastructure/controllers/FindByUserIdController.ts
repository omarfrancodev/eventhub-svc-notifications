import { Request, Response } from 'express';
import { FindByUserIdUseCase } from '../../application/FindByUserIdUseCase';
import saveLogFile from '../LogsErrorControl';

export class FindByUserIdController {
    constructor(private readonly findByUserIdUseCase: FindByUserIdUseCase) { }

    async run(req: Request, res: Response): Promise<Response> {
        const userId = isNaN(Number(req.params.id)) ? null : Number(req.params.id);
        if (!userId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        try {
            const notifications = await this.findByUserIdUseCase.run(userId);
            if (!notifications) {
                return res.status(404).json({ error: 'Notifications not found' });
            }
            return res.status(200).json(notifications);
        } catch (error) {
            console.error(error);
            saveLogFile(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}