import { DataSource } from "typeorm";
import { Notification } from "../domain/Notification";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde el archivo .env

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [Notification],
    subscribers: [],
    migrations: [Notification],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Conexión con la base de datos establecida");
    })