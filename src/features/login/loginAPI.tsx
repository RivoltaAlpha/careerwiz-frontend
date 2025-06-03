import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginResponse } from '../../types/types';
import { SERVER_URL } from '../../Utils/utils';

export const loginApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }), 
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user: LoginResponse) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});



export default loginApi;