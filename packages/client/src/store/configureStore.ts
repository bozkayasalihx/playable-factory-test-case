import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistCombineReducers,
} from "redux-persist";
import persistStore from "redux-persist/lib/persistStore";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import baseApi from "./service/baseApi";
import userSlice from "./slices/userSlice";
import todoSlice from "./slices/todoSlice";
import textAreaSlice from "./slices/textAreaSlice";
import selectionSlice from "./slices/selectionSlice";

const __PROD__ = process.env.NODE_ENV === "production";

const persistConfig = {
    key: "test",
    version: 1,
    storage: storage,
    whitelist: ["user"],
};

const persistedReducer = persistCombineReducers(persistConfig, {
    user: userSlice,
    todos: todoSlice,
    textArea: textAreaSlice,
    selection: selectionSlice,
    [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
    reducer: persistedReducer,
    devTools: !__PROD__,
    middleware: getDefaultMiddleware => {
        const midware = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        });

        return [...midware, baseApi.middleware, thunk];
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
