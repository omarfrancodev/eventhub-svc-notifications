import express from "express";
import bodyParser from "body-parser";
import { notificationRouter } from "./notifications/infrastructure/NotificationRouter";

import moment from 'moment';
import 'moment-timezone';

moment.tz.setDefault('America/Mexico_City');
const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(currentDateTime);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/notificaions", notificationRouter);

const port = parseInt(process.env.SERVER_PORT ?? "3000");

app.listen(port, () => {
  console.log('[Application] Server online in port ' + port)
});
