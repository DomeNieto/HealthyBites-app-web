import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { BaseResponse } from "../../interfaces/Response";
import { Ingredient } from "../../interfaces/Ingredient";

const API_URL = import.meta.env.VITE_API_URL;

export const ingredientApi = createApi({
  reducerPath: "ingredientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}api/v1/`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Ingredient"],
  endpoints: (builder) => ({
    getAllIngredients: builder.query<Ingredient[], void>({
      query: () => "ingredients",
      providesTags: ["Ingredient"],
      transformResponse: (
        response: BaseResponse<Ingredient[]>
      ): Ingredient[] => {
        return response.data;
      },
    }),
    getIngredientById: builder.query<Ingredient, string>({
      providesTags: ["Ingredient"],
      query: (id: string) => {
        const url = `ingredients/${id}`;
        return url;
      },
      transformResponse: (response: BaseResponse<Ingredient>): Ingredient => {
        console.log(response.data);
        return response.data;
      },
    }),
    createIngredient: builder.mutation<string, Partial<Ingredient>>({
      query: (newIngredient) => ({
        url: "ingredients",
        method: "POST",
        body: newIngredient,
      }),
      transformResponse: (response: BaseResponse<Ingredient>): string => {
        return response.message;
      },
      invalidatesTags: ["Ingredient"],
    }),
    updateIngredient: builder.mutation<string, Partial<Ingredient>>({
      query: (ingredient: Partial<Ingredient>) => {
        const { id, ...body } = ingredient;
        return {
          url: `ingredients/${id}`,
          method: "PUT",
          body: body,
        };
      },
      transformResponse: (response: BaseResponse<Ingredient>): string => {
        return response.message;
      },
      invalidatesTags: ["Ingredient"],
    }),
    deleteIngredient: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `ingredients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ingredient"],
    }),
  }),
});

export const {
  useGetAllIngredientsQuery,
  useGetIngredientByIdQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
} = ingredientApi;
