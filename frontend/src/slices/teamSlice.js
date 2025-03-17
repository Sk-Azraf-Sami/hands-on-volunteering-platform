import { apiSlice } from './apiSlice';
import { TEAMS_API } from '../constants';

export const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (data) => ({
        url: `${TEAMS_API}/create`,
        method: 'POST',
        body: data,
      }),
    }),
    getTeams: builder.query({
      query: () => `${TEAMS_API}/list`,
    }),
    getTeam: builder.query({
      query: (teamId) => `${TEAMS_API}/${teamId}`,
    }),
    joinTeam: builder.mutation({
      query: (data) => ({
        url: `${TEAMS_API}/join`,
        method: 'POST',
        body: data,
      }),
    }),
    withdrawTeam: builder.mutation({
      query: (data) => ({
        url: `${TEAMS_API}/withdraw`,
        method: 'POST',
        body: data,
      }),
    }),
    sendInvitation: builder.mutation({
      query: (data) => ({
        url: `${TEAMS_API}/invite`,
        method: 'POST',
        body: data,
      }),
    }),
    acceptInvitation: builder.mutation({
      query: (data) => ({
        url: `${TEAMS_API}/accept-invitation`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteTeam: builder.mutation({
      query: (teamId) => ({
        url: `${TEAMS_API}/${teamId}`,
        method: 'DELETE',
      }),
    }),
    updateTeam: builder.mutation({
      query: (data) => ({
        url: `${TEAMS_API}/${data.teamId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    getLeaderboard: builder.query({
      query: () => `${TEAMS_API}/leaderboard`,
    }),
    createEventForTeam: builder.mutation({
      query: ({ teamId, event }) => ({
        url: `${TEAMS_API}/${teamId}/events`,
        method: 'POST',
        body: event,
      }),
    }),
  }),
});

export const { 
  useCreateTeamMutation, 
  useGetTeamsQuery, 
  useGetTeamQuery, 
  useJoinTeamMutation, 
  useWithdrawTeamMutation, 
  useSendInvitationMutation, 
  useAcceptInvitationMutation, 
  useDeleteTeamMutation, 
  useUpdateTeamMutation, 
  useGetLeaderboardQuery,
  useCreateEventForTeamMutation
} = teamApiSlice;