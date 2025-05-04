import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse } from "../../interfaces/Response";
import { Auth, AuthBody } from "../../interfaces/Auth";
import { initialState, setCredentials } from "./AuthSlice";
import { decodeJwt } from "./TokenUtility";

const API_URL = import.meta.env.VITE_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}api/auth/`,
    prepareHeaders: (headers) => {
      headers.set("content-type", `application/json`);
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<Auth, AuthBody>({
      query: (credentials: AuthBody) => ({
        url: "login",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: { email: credentials.email, password: credentials.password },
      }),
      transformResponse: (response: AuthResponse): Auth => {
        const decodedToken = decodeJwt(response.accessToken);
        const role = decodedToken.role;

        return {
          token: response.accessToken,
          role: role,
        };
      },
      async onQueryStarted(
        _credentials: AuthBody,
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
          console.log(data);
        } catch (error) {
          dispatch(setCredentials(initialState.auth));
          console.log("Error al inciar sesión. POST LOGIN ", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
