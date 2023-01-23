import { compare } from "bcryptjs";
import httpStatus from "http-status";
import { appDataSource } from "../../database";
import User from "../../models/User";
import { TypedRequest, TypedResponse } from "../../types";
import { __PROD__ } from "../../utils/prod";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/tokens/generateTokens";

export interface IUser {
    email: string;
    password: string;
}

async function loginController(req: TypedRequest<IUser>, res: TypedResponse) {
    const { email, password } = req.body;

    const user = await appDataSource
        .getRepository(User)
        .findOne({ where: { email } });

    if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
            message: "user not found!",
        });
    }

    const valid = await compare(password, user.password);

    if (!valid) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "email or password are wrong!",
        });
    }

    const accessToken = generateAccessToken(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET_KEY as string
    );
    const refreshToken = generateRefreshToken(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET_KEY as string
    );
    res.cookie("qid", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: __PROD__,
        maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(httpStatus.OK).json({
        message: "operation succesful",
        data: {
            email: user.email,
            accessToken,
        },
    });
}

export default loginController;
