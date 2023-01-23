import dotenv from "dotenv";
import path from "path";
import { __PROD__ } from "./utils/prod";

(function () {
    dotenv.config({
        path: path.resolve(__dirname, "../../../.env"),
    });
})();
