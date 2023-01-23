import fileupload from "express-fileupload";

export const fileUploadMiddleware = () => {
    return fileupload({
        limits: {
            fileSize: 1 * 1024 * 1024,
        },
    });
};
