import jwt from "jsonwebtoken";
import { __PROD__ } from "../prod";

export interface IGenerateToken {
    id: number;
}

export function generateAccessToken(params: IGenerateToken, secretKey: string) {
    return jwt.sign(params, secretKey, {
        expiresIn: !__PROD__ ? "7d" : "10m",
    });
}

export function generateRefreshToken(
    params: IGenerateToken,
    secretKey: string
) {
    return jwt.sign(params, secretKey, {
        expiresIn: "1d",
    });
}
