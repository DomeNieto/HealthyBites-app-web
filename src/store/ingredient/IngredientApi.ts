import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { BaseResponse } from "../../interfaces/Response";
import { Ingredient } from "../../interfaces/Ingredient";

const API_URL = import.meta.env.VITE_API_URL;

// API service for ingredients
export const ingredientApi = createApi({
  // Name of the reducer in the store
  reducerPath: "ingredientApi",

  // API base configuration
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

  // Definition of endpoints
  endpoints: (builder) => ({
    // Get all ingredients
    getAllIngredients: builder.query<Ingredient[], void>({
      query: () => "ingredients",
      providesTags: ["Ingredient"],
      transformResponse: (
        response: BaseResponse<Ingredient[]>
      ): Ingredient[] => {
        return response.data;
      },
    }),

    // Create a new ingredient
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

    // Update an existing ingredient
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

    // Disable an ingredient
    disableIngredient: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `ingredients/${id}/disable`,
        method: "PUT",
      }),
      invalidatesTags: ["Ingredient"],
    }),

    // Reactivate a disabled ingredient
    activateIngredient: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `ingredients/${id}/reactivate`,
        method: "PUT",
      }),
      invalidatesTags: ["Ingredient"],
    }),
  }),
});

// Hooks
export const {
  useGetAllIngredientsQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDisableIngredientMutation,
  useActivateIngredientMutation,
} = ingredientApi;
