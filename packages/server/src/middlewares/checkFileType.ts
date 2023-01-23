import { NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import httpStatus from "http-status";
import { TypedRequest, TypedResponse } from "../types";

const ALLOWEDTYPES = ["png", "jpeg"];

export const checkFileType = (allowdType = ALLOWEDTYPES) => {
    return async function checkFileType(
        req: TypedRequest,
        res: TypedResponse,
        next: NextFunction
    ) {
        if (!req.files?.file) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "no file uploaded",
            });
        }

        const regex = new RegExp(".([a-z]{2,})$", "gi");
        const file = req.files?.file as UploadedFile;
        const results = regex.exec(file.name);

        if (!results) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "invalid file type",
            });
        }

        if (allowdType.includes(results[1])) {
            return next();
        }

        return res.status(httpStatus.BAD_REQUEST).json({
            message: "invalid file type",
        });
    };
};
