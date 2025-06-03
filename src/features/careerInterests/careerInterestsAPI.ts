import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {CareerInterests, StudentCareerInterests} from "../../types/types";
import { SERVER_URL } from "../../Utils/utils";

export const careerInterestsAPI  = createApi({
    reducerPath: "careerInterestsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
    tagTypes: ["CareerInterests"],
    endpoints: (builder) => ({
        getUserCareerInterests: builder.query<StudentCareerInterests[], number>({
            query: (user_id) => `/get-students-career-interests/${user_id}`,
            providesTags: ["CareerInterests"],
        }),
        getCareerInterest: builder.query<CareerInterests, number>({
            query: (careerInterests_id) => `/get-career-interest/${careerInterests_id}`,
            providesTags: ["CareerInterests"],
        }),
        createCareerInterest: builder.mutation<CareerInterests, Partial<CareerInterests>>({
            query: (newCareerInterest) => ({
                url: "/create-career-interest",
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
                url: `/update-career-interest/${careerInterests_id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["CareerInterests"],
        }),
        deleteCareerInterest: builder.mutation<{ success: boolean; id: number }, number>({
            query: (careerInterest_id) => ({
                url: `/delete-career-interest/${careerInterest_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CareerInterests"],
        }),
    }),
});