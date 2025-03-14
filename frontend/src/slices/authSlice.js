// filepath: /home/azraf-sami/Documents/hands-on-volunteering-platform/frontend/src/slices/authSlice.js
import { apiSlice } from './apiSlice';
import { REGISTER_API, LOGIN_API } from '../constants';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: REGISTER_API,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: LOGIN_API,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApiSlice;