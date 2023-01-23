import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import "./envLoader";
import { __PROD__ } from "./utils/prod";

const entityDir = path.join(__dirname, "../dist/models/*.js");
const entityTsDir = path.join(__dirname, "./models/*.ts");

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    database: process.env.POSTGRES_DB,
    host: process.env.DB_HOST,
    useUTC: true,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    synchronize: true,
    entities: [entityDir, entityTsDir],
};

export default function config() {
    const connectDb = async () => {
        await appDataSource.initialize();
    };

    return Promise.all([connectDb()]);
}

export const appDataSource = new DataSource(dataSourceOptions);
