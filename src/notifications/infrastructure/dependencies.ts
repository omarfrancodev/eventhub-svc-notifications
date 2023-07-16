import { CreateNotificationUseCase } from "../application/CreteNotificationUseCase";
import { FindAllNotificationsUseCase } from "../application/FindAllNotificationsUseCase";
import { FindByIdNotificationUseCase } from "../application/FindByIdNotificationUseCase";
import { FindByUserIdUseCase } from "../application/FindByUserIdUseCase";
import { UpdateNotificationUseCase } from "../application/UpdateNotificationUseCase";

import { CreateNotificationController } from "./controllers/CreateNotificationController";
import { FindAllNotificationsController } from "./controllers/FindAllnotificationsController";
import { FindByIdNotificationController } from "./controllers/FindByIdNotificationController";
import { FindByUserIdController } from "./controllers/FindByUserIdController";
import { UpdateNotificationController } from "./controllers/UpdateNotificationController";

import { NotificationRepository} from "./implementation/NotificationRepository";

const notificationRepository = new NotificationRepository();

const createNotificationUseCase = new CreateNotificationUseCase(notificationRepository);
export const createNotificationController = new CreateNotificationController(createNotificationUseCase);

const findAllNotificationsUseCase = new FindAllNotificationsUseCase(notificationRepository);
export const findAllNotificationsController = new FindAllNotificationsController(findAllNotificationsUseCase);

const findByIdNotificationUseCase = new FindByIdNotificationUseCase(notificationRepository);
export const findByIdNotificationController = new FindByIdNotificationController(findByIdNotificationUseCase);

const findByUserIdUseCase = new FindByUserIdUseCase(notificationRepository);
export const findByUserIdController = new FindByUserIdController(findByUserIdUseCase);

const updateNotificationUseCase = new UpdateNotificationUseCase(notificationRepository);
export const updateNotificationController = new UpdateNotificationController(updateNotificationUseCase, findByIdNotificationUseCase);


