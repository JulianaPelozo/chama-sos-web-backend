import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./entities/Usuario";
import { Ocorrencia } from "./entities/Ocorrencia";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "chamasos",
    synchronize: true, 
    logging: false,
    entities: [Usuario, Ocorrencia],
});
