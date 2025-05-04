import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import { authApi } from "./auth/AuthApi";
import { usersApi } from "./users/UserApi";

const reducer = {
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
