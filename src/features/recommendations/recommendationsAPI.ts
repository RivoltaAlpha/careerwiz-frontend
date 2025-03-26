import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recommendations } from "../../types/types";

export const recommendationsAPI = createApi({
    reducerPath: "recommendationsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    tagTypes: ["Recommendations"],
    endpoints: (builder) => ({
        getUserRecommendations: builder.query<Recommendations[], number>({
            query: (user_id) => `/get-user-recommendations/${user_id}`,
            providesTags: ["Recommendations"],
        }),
        getRecommendation: builder.query<Recommendations, number>({
            query: (id) => `/get-recommendation/${id}`,
            providesTags: ["Recommendations"],
        }),
        createRecommendation: builder.mutation<Recommendations, Partial<Recommendations>>({
            query: (newRecommendation) => ({
                url: "/create-recommendation",
                method: "POST",
                body: newRecommendation,
            }),
            invalidatesTags: ["Recommendations"],
        }),
        updateRecommendation: builder.mutation<
        Recommendations,
            { id: number; data: Partial<Recommendations> }
            >({
            query: ({ id, data }) => ({
                url: `/update-recommendation/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Recommendations"],
        }),
        deleteRecommendation: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/delete-recommendation/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Recommendations"],
        }),
    }),
});