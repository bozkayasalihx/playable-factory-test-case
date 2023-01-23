/// <reference types="express-serve-static-core" />
import * as core from "express-serve-static-core";
import User from "./models/User";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            POSTGRES_USER: string;
            POSTGRES_PASSWORD: string;
            SERVER_PORT: number;
            ACCESS_TOKEN_SECRET_KEY: string;
            REFRESH_TOKEN_SECRET_KEY: string;
            SERVER_SALT: number;
            AWS_ACCESSS_KEY: string;
            AWS_SECRET_KEY: string;
        }
    }

    namespace Express {
        interface Response<
            ResBody = { message: string; data?: Record<string, any> },
            Locals extends Record<string, any> = Record<string, any>
        > extends core.Response<ResBody, Locals> {}

        interface Request {
            user: User;
            files?: fileUpload.FileArray | undefined;
        }

        namespace fileUpload {
            class FileArray {
                file: UploadedFile | Array<UploadedFile>;
                [index: string]: UploadedFile | UploadedFile[];
            }

            interface UploadedFile {
                name: string;
                mv(path: string, callback: (err: any) => void): void;
                mv(path: string): Promise<void>;
                encoding: string;
                mimetype: string;
                data: Buffer;
                tempFilePath: string;
                truncated: boolean;
                size: number;
                md5: string;
            }
        }
    }
}
