import { Router } from "express";
import fileupload from "../controller/fileupload/fileUpload";
import uploadImage from "../controller/fileupload/imageFileUpload";
import { checkFileType } from "../middlewares/checkFileType";
import errorHandler from "../middlewares/errorHandler";
import { fileUploadMiddleware } from "../middlewares/fileRestriction";

const router = Router();

router.post(
    "/image-upload",
    fileUploadMiddleware(),
    checkFileType(),
    errorHandler.handleErrors(uploadImage)
);
router.post(
    "/file-upload",
    fileUploadMiddleware(),
    checkFileType(["txt", "md", "xlsx"]),
    errorHandler.handleErrors(fileupload)
);

export default router;
