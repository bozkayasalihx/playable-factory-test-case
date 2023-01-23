import { UploadedFile } from "express-fileupload";
import httpStatus from "http-status";
import { TypedRequest, TypedResponse } from "../../types";
import { s3FileUpload } from "../../utils/aws";
import { fileExtensionRegex, randomText } from "../../utils/regex";

async function fileUpload(req: TypedRequest, res: TypedResponse) {
    const file = req.files?.file as UploadedFile;
    const user = req.user;

    const arr = file.name.split(".");

    if (arr.length == 0) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const filename =
        randomText() + "__" + Date.now() + "." + arr[arr.length - 1];
    await s3FileUpload.uploadFileToS3(file.data, filename);

    return res.status(httpStatus.OK).json({
        message: "operation succesfull",
        data: {
            fileName: filename,
        },
    });
}

export default fileUpload;
