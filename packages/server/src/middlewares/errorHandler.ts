import { NextFunction } from "express";
import httpStatus from "http-status";
import { TypedRequest, TypedResponse } from "../types";
import { __PROD__ } from "../utils/prod";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { QueryFailedError } from "typeorm";

type HandlerFunc = (
    req: TypedRequest<any, any>,
    res: TypedResponse<any>
) => Promise<any>;

type CustomError = Error & Record<string, any>;

type HandlerReturnFunc = (
    req: TypedRequest<any, any>,
    res: TypedResponse<any>,
    next: NextFunction
) => Promise<any>;

class ErrorHandler {
    public handleErrors(handlerFunc: HandlerFunc): HandlerReturnFunc {
        return async (req, res) => {
            try {
                return await handlerFunc(req, res);
            } catch (err) {
                !__PROD__ && console.log(err);
                return this.matcher(res, err);
            }
        };
    }
    matcher(res: TypedResponse, error: CustomError) {
        if (error?.detail?.includes("already exists")) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: error.detail.split("=")[1],
            });
        }

        if (error instanceof TokenExpiredError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "token expired",
            });
        }

        if (error instanceof JsonWebTokenError) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "malformed token",
            });
        }

        if (error instanceof QueryFailedError) {
            return res.status(httpStatus.BAD_REQUEST).json({
                //@ts-ignore
                message: error.detail
                    ? //@ts-ignore
                      error.detail.replace(/[^a-zA-Z0-9_= ]/g, "")
                    : error.message,
            });
        }

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "an error accured",
        });
    }
}

export default new ErrorHandler();
