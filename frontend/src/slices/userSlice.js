import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { REGISTER_API, LOGIN_API, API_BASE_URL } from '../constants';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: REGISTER_API,
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: LOGIN_API,
        method: 'POST',
        body: credentials,
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => {
        const url = `${API_BASE_URL}/users/${userData.id}`; // Corrected URL
        console.log('Update User URL:', url); // Log the URL
        console.log('Update User Data:', userData); // Log the data being sent
        return {
          url,
          method: 'PUT',
          body: userData,
        };
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useUpdateUserMutation } = userApiSlice;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApiSlice.endpoints.updateUser.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(userApiSlice.endpoints.updateUser.matchFulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addMatcher(userApiSlice.endpoints.updateUser.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;