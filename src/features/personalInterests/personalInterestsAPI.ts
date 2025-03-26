import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {PersonalInterests} from "../../types/types";

export const personalInterestsAPI  = createApi({
    reducerPath: "personalInterestsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    tagTypes: ["PersonalInterests"],
    endpoints: (builder) => ({
        getUserInterests: builder.query<PersonalInterests[], number>({
            query: (user_id) => `/get-student-intrests/${user_id}`,
            providesTags: ["PersonalInterests"],
        }),
        getaPersonalIntrest: builder.query<PersonalInterests, number>({
            query: (id) => `/get-personal-intrest/${id}`,
            providesTags: ["PersonalInterests"],
        }),
        createPersonalInterest: builder.mutation<PersonalInterests, Partial<PersonalInterests>>({
            query: (newPersonalInterest) => ({
                url: "/create-personal-intrest",
                method: "POST",
                body: newPersonalInterest,
            }),
            invalidatesTags: ["PersonalInterests"],
        }),
        updatePersonalInterest: builder.mutation<
        PersonalInterests,
            { id: number; data: Partial<PersonalInterests> }
            >({
            query: ({ id, data }) => ({
                url: `/update-personal-intrest/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["PersonalInterests"],
        }),
        deletePersonalInterest: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/delete-personal-intrest/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["PersonalInterests"],
        }),
    }),
});