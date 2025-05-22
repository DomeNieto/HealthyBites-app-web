import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../../interfaces/Auth";
import { clearTokenAndRol } from "./TokenUtility";

// Auth state interface
interface AuthState {
  auth: Auth;
  loading: boolean;
  error: string | null;
}

// Load initial auth state from localStorage or sessionStorage
const loadInitState = (): AuthState => {
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const rolId =
    localStorage.getItem("authRol") || sessionStorage.getItem("authRol");
  const email =
    localStorage.getItem("authEmail") || sessionStorage.getItem("authEmail");
  if (!token || !rolId) {
    return {
      auth: {
        token: null,
        role: null,
        email: null,
      },
      loading: false,
      error: null,
    };
  }

  return {
    auth: {
      token: token,
      role: rolId,
      email: email,
    },
    loading: false,
    error: null,
  };
};

// Initial state for the auth slice
export const initialState: AuthState = loadInitState();

// Auth slice definition
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Clear token, role, and email from storage and state
    logout: (state) => {
      clearTokenAndRol();
      state.auth = initialState.auth;
    },

    // Set the auth credentials (token, role, email)
    setCredentials: (state, action: PayloadAction<Auth>) => {
      state.auth = action.payload;
    },

    // Set loading state (e.g., during login)
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error message
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const { logout, setCredentials, setLoading, setError } =
  authSlice.actions;

// Export reducer
export default authSlice.reducer;
