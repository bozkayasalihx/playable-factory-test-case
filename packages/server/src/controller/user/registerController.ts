import httpStatus from "http-status";
import User from "../../models/User";
import { __PROD__ } from "../../utils/prod";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/tokens/generateTokens";
import { IUser } from "./loginController";
import { appDataSource } from "../../database";
import { TypedRequest, TypedResponse } from "../../types";

function serialize(user: User, res: TypedResponse, cb: () => any) {
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

    return cb();
}

async function registerControler(req: TypedRequest<IUser>, res: TypedResponse) {
    const userRepo = appDataSource.getRepository(User);
    const user = userRepo.create(req.body);
    await userRepo.save(user);
    const accessToken = generateAccessToken(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET_KEY as string
    );

    return serialize(user, res, () => {
        return res.status(httpStatus.CREATED).json({
            message: "operation succesful",
            data: {
                email: user.email,
                accessToken,
            },
        });
    });
}

export default registerControler;
