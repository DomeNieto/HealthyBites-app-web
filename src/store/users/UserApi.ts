import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { BaseResponse } from "../../interfaces/Response";
import { User } from "../../interfaces/User";
import { Recipe } from "../../interfaces/Recipe";

const API_URL = import.meta.env.VITE_API_URL;

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}api/v1/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => "users",
      transformResponse: (response: BaseResponse<User[]>): User[] => {
        return response.data;
      },
    }),
    getUserByEmail: builder.query<User, string>({
      query: (email) => ({
        url: "users/by-email",
        method: "GET",
        params: { email },
      }),
      transformResponse: (response: BaseResponse<User>): User => {
        return response.data;
      },
    }),
    getUserById: builder.query<User, string>({
      query: (id: string) => {
        const url = `users/${id}`;
        return url;
      },

      transformResponse: (response: BaseResponse<User>): User => {
        console.log(response.data);
        return response.data;
      },
    }),
    getUserRecipes: builder.query<Recipe[], string>({
      query: (id: string) => {
        const url = `recipes/user/${id}`;
        return url;
      },

      transformResponse: (response: BaseResponse<Recipe[]>): Recipe[] => {
        console.log(response.data);
        return response.data;
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByEmailQuery,
  useGetUserByIdQuery,
  useGetUserRecipesQuery,
} = usersApi;
