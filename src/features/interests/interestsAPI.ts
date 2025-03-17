import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Interests } from "../../types/types";

export const InterestsApi = createApi({
  reducerPath: "InterestsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: ["Interest"],
  endpoints: (builder) => ({
    getInterests: builder.query<Interests[], void>({
      query: () => "/Interests",
      providesTags: ["Interest"],
    }),
    getInterest: builder.query<Interests, number>({
      query: (Interest_id) => `/Interests/${Interest_id}`,
      providesTags: ["Interest"],
    }),
    createInterest: builder.mutation<Interests, Partial<Interests>>({
      query: (newInterest) => ({
        url: "/Interests",
        method: "POST",
        body: newInterest,
      }),
      invalidatesTags: ["Interest"],
    }),
    updateInterest: builder.mutation<Interests,{ Interest_id: number; data: Partial<Interests> }>({
      query: ({ Interest_id, data }) => ({
        url: `/Interests/${Interest_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Interest"],
    }),
    deleteInterest: builder.mutation<{ success: boolean; id: number }, number>({
      query: (Interest_id) => ({
        url: `/Interests/${Interest_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Interest"],
    }),
  }),
});

export default InterestsApi;

