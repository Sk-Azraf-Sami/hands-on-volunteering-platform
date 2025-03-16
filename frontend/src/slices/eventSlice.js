import { apiSlice } from './apiSlice';
import { EVENTS_API } from '../constants';

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_API}/create`,
        method: 'POST',
        body: data,
      }),
    }),
    getEvents: builder.query({
      query: () => `${EVENTS_API}/list`,
    }),
    getEvent: builder.query({
      query: (eventId) => `${EVENTS_API}/${eventId}`,
    }),
    joinEvent: builder.mutation({
      query: ({ eventId }) => ({
        url: `${EVENTS_API}/join`,
        method: 'POST',
        body: { eventId },
      }),
    }),
    withdrawEvent: builder.mutation({
      query: ({ eventId }) => ({
        url: `${EVENTS_API}/withdraw`,
        method: 'POST',
        body: { eventId },
      }),
    }),
  }),
});

export const { useCreateEventMutation, useGetEventsQuery, useGetEventQuery, useJoinEventMutation, useWithdrawEventMutation } = eventApiSlice;