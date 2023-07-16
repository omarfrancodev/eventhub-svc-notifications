import express from 'express';

import {
    createNotificationController,
    findAllNotificationsController,
    findByIdNotificationController,
    findByUserIdController,
    updateNotificationController,
} from './dependencies';

export const notificationRouter = express.Router();

notificationRouter.post('/', createNotificationController.run.bind(createNotificationController));
notificationRouter.patch('/:id', updateNotificationController.run.bind(updateNotificationController));
notificationRouter.get('/', findAllNotificationsController.run.bind(findAllNotificationsController));
notificationRouter.get('/:id', findByIdNotificationController.run.bind(findByIdNotificationController));
notificationRouter.get('/user/:id', findByUserIdController.run.bind(findByUserIdController));

