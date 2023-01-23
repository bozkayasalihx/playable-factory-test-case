import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../service/userApi";

export interface IUserSlice {
    accessToken: string;
    email: string;
    image?: string;
}

const initialState: IUserSlice = {
    accessToken: "",
    email: "",
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<IUserSlice>) => {
            state.accessToken = action.payload.accessToken;
            state.email = action.payload.email;
            state.image = action.payload.image;
        },
        logout: () => initialState,
    },
    extraReducers: builder => {
        builder.addMatcher(
            userApi.endpoints.loginOrRegister.matchFulfilled,
            (state, action) => {
                state.accessToken = action.payload.data.accessToken;
                state.email = action.payload.data.email;
            }
        );
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
