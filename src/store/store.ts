import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import usersReducer from "./users/UserSlice";
import { authApi } from "./auth/AuthApi";
import { usersApi } from "./users/UserApi";
import utilityReducer from "./utilities/UtitlitySlice";

const reducer = {
  auth: authReducer,
  users: usersReducer,
  utility: utilityReducer,
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
