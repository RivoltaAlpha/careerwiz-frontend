import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Career } from "../../types/types";
import { SERVER_URL } from "../../Utils/utils";

export const careersApi = createApi({
  reducerPath: "careersApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  tagTypes: ["Career"],
  endpoints: (builder) => ({
    getCareers: builder.query<Career[], void>({
      query: () => "/all-careers",
      providesTags: ["Career"],
    }),
    getCareer: builder.query<Career, number>({
      query: (career_id) => `/careers/${career_id}`,
      providesTags: ["Career"],
    }),
    createCareer: builder.mutation<Career, Partial<Career>>({
      query: (newCareer) => ({
        url: "/careers",
        method: "POST",
        body: newCareer,
      }),
      invalidatesTags: ["Career"],
    }),
    updateCareer: builder.mutation<
      Career,
      { career_id: number; data: Partial<Career> }
    >({
      query: ({ career_id, data }) => ({
        url: `/careers/${career_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Career"],
    }),
    deleteCareer: builder.mutation<{ success: boolean; id: number }, number>({
      query: (career_id) => ({
        url: `/careers/${career_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Career"],
    }),
  }),
});

export default careersApi;
export const {
  useGetCareersQuery,
  useGetCareerQuery,
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
} = careersApi;
