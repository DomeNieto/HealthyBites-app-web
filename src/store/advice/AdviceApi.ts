import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Advice } from "../../interfaces/Advices";
import { BaseResponse } from "../../interfaces/Response";

const API_URL = import.meta.env.VITE_API_URL;

export const adviceApi = createApi({
  reducerPath: "adviceApi",
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
  tagTypes: ["Advices"],
  endpoints: (builder) => ({
    getAllAdvices: builder.query<Advice[], void>({
      query: () => "advices",
      providesTags: ["Advices"],
      transformResponse: (response: BaseResponse<Advice[]>): Advice[] => {
        return response.data;
      },
    }),
    getAdviceById: builder.query<Advice, string>({
      providesTags: ["Advices"],
      query: (id: string) => {
        const url = `advices/${id}`;
        return url;
      },
      transformResponse: (response: BaseResponse<Advice>): Advice => {
        console.log(response.data);
        return response.data;
      },
    }),
    createAdvice: builder.mutation<string, Partial<Advice>>({
      query: (newIngredient) => ({
        url: "advices",
        method: "POST",
        body: newIngredient,
      }),
      transformResponse: (response: BaseResponse<Advice>): string => {
        return response.message;
      },
      invalidatesTags: ["Advices"],
    }),
    updateAdvice: builder.mutation<string, Partial<Advice>>({
      query: (ingredient: Partial<Advice>) => {
        const { id, ...body } = ingredient;
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
    deleteAdvice: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `advices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Advices"],
    }),
  }),
});

export const {
  useGetAllAdvicesQuery,
  useCreateAdviceMutation,
  useDeleteAdviceMutation,
  useUpdateAdviceMutation,
} = adviceApi;
