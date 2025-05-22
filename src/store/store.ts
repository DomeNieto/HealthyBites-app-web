import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import usersReducer from "./users/UserSlice";
import { authApi } from "./auth/AuthApi";
import ingredientReducer from "./ingredient/IngredientSlice";
import { usersApi } from "./users/UserApi";
import utilityReducer from "./utilities/UtitlitySlice";
import adviceReducer from "./advice/AdviceSlice";
import { ingredientApi } from "./ingredient/IngredientApi";
import { adviceApi } from "./advice/AdviceApi";

// Reducers Definition
const reducer = {
  auth: authReducer,
  users: usersReducer,
  utility: utilityReducer,
  ingredients: ingredientReducer,
  advices: adviceReducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [ingredientApi.reducerPath]: ingredientApi.reducer,
  [adviceApi.reducerPath]: adviceApi.reducer,
};

// Redux store configuration with defined reducers
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(ingredientApi.middleware)
      .concat(adviceApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
