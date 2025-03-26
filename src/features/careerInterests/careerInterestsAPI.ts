import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {CareerInterests} from "../../types/types";

export const careerInterestsAPI  = createApi({
    reducerPath: "careerInterestsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    tagTypes: ["CareerInterests"],
    endpoints: (builder) => ({
        getUserCareerInterests: builder.query<CareerInterests[], number>({
            query: (user_id) => `/get-students-career-interest/${user_id}`,
            providesTags: ["CareerInterests"],
        }),
        getCareerInterest: builder.query<CareerInterests, number>({
            query: (careerInterests_id) => `/get-career-interest/${careerInterests_id}`,
            providesTags: ["CareerInterests"],
        }),
        createCareerInterest: builder.mutation<CareerInterests, Partial<CareerInterests>>({
            query: (newCareerInterest) => ({
                url: "/create-career-intrest",
                method: "POST",
                body: newCareerInterest,
            }),
            invalidatesTags: ["CareerInterests"],
        }),
        updateCareerInterest: builder.mutation<
            CareerInterests,
            { careerInterests_id: number; data: Partial<CareerInterests> }
            >({
            query: ({ careerInterests_id, data }) => ({
                url: `/update-career-intrest/${careerInterests_id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["CareerInterests"],
        }),
        deleteCareerInterest: builder.mutation<{ success: boolean; id: number }, number>({
            query: (careerInterest_id) => ({
                url: `/delete-career-intrest/${careerInterest_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CareerInterests"],
        }),
    }),
});