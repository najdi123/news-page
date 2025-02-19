import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "./storage";
import { apiSlice } from "./slices/apiSlice";
import { selectedArticlesApi } from "./slices/selectedArticlesApiSlice"; // new slice
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
    [selectedArticlesApi.reducerPath]: selectedArticlesApi.reducer,
});

// Optionally, persist these slices by including their keys
const persistConfig = {
    key: "root",
    storage,
    whiteList: [apiSlice.reducerPath, selectedArticlesApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== "production",
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(apiSlice.middleware, selectedArticlesApi.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
