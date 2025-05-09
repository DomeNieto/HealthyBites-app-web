import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import usersReducer from "./users/UserSlice";
import { authApi } from "./auth/AuthApi";
import ingredientReducer from "./ingredient/IngredientSlice";
import { usersApi } from "./users/UserApi";
import utilityReducer from "./utilities/UtitlitySlice";
import { ingredientApi } from "./ingredient/IngredientApi";

const reducer = {
  auth: authReducer,
  users: usersReducer,
  utility: utilityReducer,
  ingredients: ingredientReducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [ingredientApi.reducerPath]: ingredientApi.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(ingredientApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
