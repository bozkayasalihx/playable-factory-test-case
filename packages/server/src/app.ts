import Express from "express";
import "./envloader";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { __PROD__ } from "./utils/prod";
import config from "./database";
import isAuthenticated from "./middlewares/isAuthenticated";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";
import uploadRoutes from "./routes/uploadRoutes";

const PORT = process.env.SERVER_PORT || 8080;

async function main() {
    const app = Express();
    config();
    app.use(Express.json());
    app.use(Express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );

    app.use(helmet());
    !__PROD__ && app.use(morgan("dev"));

    app.use(userRoutes);
    app.use(isAuthenticated);
    app.use(todoRoutes);
    app.use(uploadRoutes);

    app.listen(PORT, () => {
        console.log("server up and running on port ", PORT);
    });
}

main().catch(err => {
    console.log("server down => \n", JSON.stringify(err, null, 4));
    throw err;
});
