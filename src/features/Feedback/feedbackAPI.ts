import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Feedback} from "../../types/types";

export const FeedbackAPI  = createApi({
    reducerPath: "FeedbackAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    tagTypes: ["Feedback"],
    endpoints: (builder) => ({
        getUserFeedback: builder.query<Feedback[], number>({
            query: (user_id) => `/get-student-feedback/${user_id}`,
            providesTags: ["Feedback"],
        }),
        getFeedback: builder.query<Feedback, number>({
            query: (feedback_id) => `/get-feedback/${feedback_id}`,
            providesTags: ["Feedback"],
        }),
        createFeedback: builder.mutation<Feedback, Partial<Feedback>>({
            query: (newFeedback) => ({
                url: "/create-feedback",
                method: "POST",
                body: newFeedback,
            }),
            invalidatesTags: ["Feedback"],
        }),
        updateFeedback: builder.mutation<
            Feedback,
            { feedback_id: number; data: Partial<Feedback> }
            >({
            query: ({ feedback_id, data }) => ({
                url: `/update-feedback/${feedback_id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Feedback"],
        }),
        deleteFeedback: builder.mutation<{ success: boolean; id: number }, number>({
            query: (feedback_id) => ({
                url: `/delete-feedback/${feedback_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Feedback"],
        }),
    }),
});