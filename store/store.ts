import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "./storage";
import counterReducer from "./slices/couterSlice";
import { apiSlice } from "./slices/apiSlice";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    counter: counterReducer,
});
const persistConfig = {
    key: "root",
    storage,
    whiteList: ['apiSlice']
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== "production",
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(apiSlice.middleware),
    });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];