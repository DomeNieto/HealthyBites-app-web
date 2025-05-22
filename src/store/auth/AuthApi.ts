import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse } from "../../interfaces/Response";
import { Auth, AuthBody } from "../../interfaces/Auth";
import { initialState, setCredentials } from "./AuthSlice";
import { decodeJwt } from "./TokenUtility";

const API_URL = import.meta.env.VITE_API_URL;

export const authApi = createApi({
  // Name of the reducer in the store
  reducerPath: "authApi",

  // Base API configuration
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}api/auth/`,
    prepareHeaders: (headers) => {
      headers.set("content-type", `application/json`);
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),

  // Endpoints definition
  endpoints: (builder) => ({
    login: builder.mutation<Auth, AuthBody>({
      // Login mutation
      query: (credentials: AuthBody) => ({
        url: "login",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: { email: credentials.email, password: credentials.password },
      }),

      // Transform the server response into Auth object
      transformResponse: (response: AuthResponse): Auth => {
        const decodedToken = decodeJwt(response.accessToken);
        const role = decodedToken.role;
        const email = decodedToken.sub;

        console.log(role, email);
        return {
          token: response.accessToken,
          role: role,
          email: email,
        };
      },

      // Side effects after query starts
      async onQueryStarted(
        _credentials: AuthBody,
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data)); // Store auth credentials in Redux
          console.log(data);
        } catch (error) {
          dispatch(setCredentials(initialState.auth)); // Clear credentials on error
          console.log("Error al inciar sesión. POST LOGIN ", error);
        }
      },
    }),
  }),
});

// Hook
export const { useLoginMutation } = authApi;
