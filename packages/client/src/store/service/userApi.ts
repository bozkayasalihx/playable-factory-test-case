import baseapi from "./baseApi";
import { IUser } from "server/src/controller/user/loginController";

export const userApi = baseapi.injectEndpoints({
    endpoints: builder => ({
        loginOrRegister: builder.mutation<
            { data: { email: string; accessToken: string } },
            IUser & { route: "login" | "register" }
        >({
            query: ({ route, ...crendentials }) => ({
                url: `/${route}`,
                method: "POST",
                data: crendentials,
            }),
        }),
    }),
});

export const { useLoginOrRegisterMutation } = userApi;
