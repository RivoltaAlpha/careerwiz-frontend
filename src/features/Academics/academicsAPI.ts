import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {AcademicHistoryProps, Academics, StudentAcademics, Subjects} from "../../types/types";
import { SERVER_URL } from "../../Utils/utils";

export const academicsAPI  = createApi({
    reducerPath: "academicsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
    tagTypes: ["Academics"],
    endpoints: (builder) => ({
        getAcademics: builder.query<Academics[], void>({
            query: () => "/all-academics",
            providesTags: ["Academics"],
        }),
        getSubjects: builder.query<Subjects[], void>({
            query: () => "/all-subjects",
            providesTags: ["Academics"],
        }),
        getUserAcademics: builder.query<StudentAcademics[], number>({
            query: (user_id) => `/get-student-academics/${user_id}`,
            providesTags: ["Academics"],
        }),
        getAcademicHistory: builder.query<AcademicHistoryProps[], number>({
            query: (user_id) => `/student-history/${user_id}`,
            providesTags: ["Academics"],
        }),
        getAcademic: builder.query<Academics, number>({
            query: (academic_id) => `/get-academic/${academic_id}`,
            providesTags: ["Academics"],
        }),
        createAcademic: builder.mutation<Academics, Partial<Academics>>({
            query: (newAcademic) => ({
                url: "/create-academic",
                method: "POST",
                body: newAcademic,
            }),
            invalidatesTags: ["Academics"],
        }),
        updateAcademic: builder.mutation<
            Academics,
            { academic_id: number; data: Partial<Academics> }
            >({
            query: ({ academic_id, data }) => ({
                url: `/update-academic/${academic_id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Academics"],
        }),
        deleteAcademic: builder.mutation<{ success: boolean; id: number }, number>({
            query: (academic_id) => ({
                url: `/delete-academic/${academic_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Academics"],
        }),
    }),
});