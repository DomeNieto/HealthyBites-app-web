import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../../interfaces/Auth";
import { clearTokenAndRol } from "./TokenUtility";

interface AuthState {
  auth: Auth;
  loading: boolean;
  error: string | null;
}
const loadInitState = (): AuthState => {
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const rolId =
    localStorage.getItem("authRol") || sessionStorage.getItem("authRol");
  if (!token || !rolId) {
    return {
      auth: {
        token: null,
        role: null,
      },
      loading: false,
      error: null,
    };
  }

  return {
    auth: {
      token: token,
      role: rolId,
    },
    loading: false,
    error: null,
  };
};

export const initialState: AuthState = loadInitState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      clearTokenAndRol();
      state.auth = {
        token: null,
        role: null,
      };
      state.auth = initialState.auth;
    },
    setCredentials: (state, action: PayloadAction<Auth>) => {
      state.auth = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { logout, setCredentials, setLoading, setError } =
  authSlice.actions;

export default authSlice.reducer;
