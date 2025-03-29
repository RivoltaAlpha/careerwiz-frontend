import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Academics, StudentAcademics, Subjects} from "../../types/types";

export const academicsAPI  = createApi({
    reducerPath: "academicsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    tagTypes: ["Academics"],
    endpoints: (builder) => ({
        getAcademics: builder.query<Academics[], void>({
            query: () => "/academics",
            providesTags: ["Academics"],
        }),
        getSubjects: builder.query<Subjects[], void>({
            query: () => "/all-subjects",
            providesTags: ["Academics"],
        }),
        getUserAcademics: builder.query<StudentAcademics[], number>({
            query: (user_id) => `/academics/user/${user_id}`,
            providesTags: ["Academics"],
        }),
        getAcademic: builder.query<Academics, number>({
            query: (academic_id) => `/academics/${academic_id}`,
            providesTags: ["Academics"],
        }),
        createAcademic: builder.mutation<Academics, Partial<Academics>>({
            query: (newAcademic) => ({
                url: "/academics",
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
                url: `/academics/${academic_id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Academics"],
        }),
        deleteAcademic: builder.mutation<{ success: boolean; id: number }, number>({
            query: (academic_id) => ({
                url: `/academics/${academic_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Academics"],
        }),
    }),
});