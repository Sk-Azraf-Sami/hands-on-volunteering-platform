import { apiSlice } from './apiSlice';
import { HELP_REQUESTS_API } from '../constants';

export const helpRequestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createHelpRequest: builder.mutation({
      query: (data) => ({
        url: `${HELP_REQUESTS_API}/create`,
        method: 'POST',
        body: data,
      }),
    }),
    getHelpRequests: builder.query({
      query: () => `${HELP_REQUESTS_API}/list`,
    }),
    getHelpRequest: builder.query({
      query: (helpRequestId) => `${HELP_REQUESTS_API}/${helpRequestId}`,
    }),
    updateHelpRequest: builder.mutation({
      query: ({ helpRequestId, data }) => ({
        url: `${HELP_REQUESTS_API}/${helpRequestId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteHelpRequest: builder.mutation({
      query: (helpRequestId) => ({
        url: `${HELP_REQUESTS_API}/${helpRequestId}`,
        method: 'DELETE',
      }),
    }),
    getComments: builder.query({
      query: (helpRequestId) => `${HELP_REQUESTS_API}/${helpRequestId}/comments`,
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `${HELP_REQUESTS_API}/comment`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateHelpRequestMutation, useGetHelpRequestsQuery, useGetHelpRequestQuery, useUpdateHelpRequestMutation, useDeleteHelpRequestMutation, useGetCommentsQuery, useAddCommentMutation } = helpRequestApiSlice;