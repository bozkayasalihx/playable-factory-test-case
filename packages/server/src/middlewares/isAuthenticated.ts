import { NextFunction } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { appDataSource } from "../database";
import User from "../models/User";
import { TypedRequest, TypedResponse } from "../types";
import errorHandler from "./errorHandler";

export default async function isAuthenticated(
    req: TypedRequest,
    res: TypedResponse,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            message: "unauthorized request",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "you must logged in for further operations",
        });
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET_KEY as string
        );

        if (typeof payload === "string") {
            return undefined;
        }

        const user = await appDataSource
            .getRepository(User)
            .findOne({ where: { id: payload.id } });

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "unauthorized",
            });
        }

        req.user = user;
        return next();
    } catch (err) {
        return errorHandler.matcher(res, err);
    }
}
