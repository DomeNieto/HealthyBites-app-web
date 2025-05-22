import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Advice } from "../../interfaces/Advices";
import { BaseResponse } from "../../interfaces/Response";

const API_URL = import.meta.env.VITE_API_URL;

export const adviceApi = createApi({
  // Name of the reducer in the store
  reducerPath: "adviceApi",

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

  // Tag type for cache invalidation
  tagTypes: ["Advices"],

  // Endpoint definitions
  endpoints: (builder) => ({
    // Fetch all advices
    getAllAdvices: builder.query<Advice[], void>({
      query: () => "advices",
      providesTags: ["Advices"],
      transformResponse: (response: BaseResponse<Advice[]>): Advice[] => {
        return response.data;
      },
    }),

    // Create a new advice
    createAdvice: builder.mutation<string, Partial<Advice>>({
      query: (newAdvice) => ({
        url: "advices",
        method: "POST",
        body: newAdvice,
      }),
      transformResponse: (response: BaseResponse<Advice>): string => {
        return response.message;
      },
      invalidatesTags: ["Advices"],
    }),

    // Update an existing advice by id
    updateAdvice: builder.mutation<string, Partial<Advice>>({
      query: (advice: Partial<Advice>) => {
        const { id, ...body } = advice;
        return {
          url: `advices/${id}`,
          method: "PUT",
          body: body,
        };
      },
      transformResponse: (response: BaseResponse<Advice>): string => {
        return response.message;
      },
      invalidatesTags: ["Advices"],
    }),

    // Delete an advice by id
    deleteAdvice: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `advices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Advices"],
    }),
  }),
});

// Export hooks
export const {
  useGetAllAdvicesQuery,
  useCreateAdviceMutation,
  useDeleteAdviceMutation,
  useUpdateAdviceMutation,
} = adviceApi;
