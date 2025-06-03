import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {StudentPersonalInterests, PersonalnterestsData, CreateInterestPayload} from "../../types/types";
import { SERVER_URL } from "../../Utils/utils";

export const personalInterestsAPI  = createApi({
    reducerPath: "personalInterestsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
    tagTypes: ["PersonalInterests"],
    endpoints: (builder) => ({
        getUserInterests: builder.query<PersonalnterestsData[], number>({
            query: (user_id) => `/get-student-intrests/${user_id}`,
            providesTags: ["PersonalInterests"],
        }),
        getaPersonalIntrest: builder.query<StudentPersonalInterests, number>({
            query: (id) => `/get-personal-intrest/${id}`,
            providesTags: ["PersonalInterests"],
        }),
        getPersonalIntrests: builder.query<PersonalnterestsData, number>({
            query: (id) => `/get-personal-intrest/${id}`,
            providesTags: ["PersonalInterests"],
        }),
        createPersonalInterest: builder.mutation<CreateInterestPayload, Partial<CreateInterestPayload>>({
            query: (newPersonalInterest) => ({
                url: "/create-personal-intrest",
                method: "POST",
                body: newPersonalInterest,
            }),
            invalidatesTags: ["PersonalInterests"],
        }),
        updatePersonalInterest: builder.mutation<
        PersonalnterestsData,
            { id: number; data: Partial<PersonalnterestsData> }
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