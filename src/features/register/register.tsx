import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TUser } from '../../types/types';
import { SERVER_URL } from '../../Utils/utils';

export const registrationAPI = createApi({
    reducerPath: 'registrationAPI',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerUser: builder.mutation<TUser, Partial<TUser>>({
            query: (newUser) => ({
                url: 'auth/register',
                method: 'POST',
                body: newUser,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
    }),
});

export default registrationAPI;