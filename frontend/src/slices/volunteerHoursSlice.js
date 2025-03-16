import { apiSlice } from './apiSlice';
import { VOLUNTEER_HOURS_API } from '../constants';

export const volunteerHoursApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logHours: builder.mutation({
      query: (data) => ({
        url: `${VOLUNTEER_HOURS_API}/log`,
        method: 'POST',
        body: data,
      }),
    }),
    getLeaderboard: builder.query({
      query: () => `${VOLUNTEER_HOURS_API}/leaderboard`,
    }),
  }),
});

export const { useLogHoursMutation, useGetLeaderboardQuery } = volunteerHoursApiSlice;