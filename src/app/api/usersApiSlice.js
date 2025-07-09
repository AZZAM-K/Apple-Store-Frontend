import { apiSlice } from './apiSlice'
import { USERS_URL, ADMIN_URL } from '../urls'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: userData => ({
        url: `${USERS_URL}/sign-up`,
        method: 'POST',
        body: userData,
        credentials: 'include',
      }),
    }),

    signIn: builder.mutation({
      query: userData => ({
        url: `${USERS_URL}/sign-in`,
        method: 'POST',
        body: userData,
        credentials: 'include',
      }),
    }),

    signOut: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/sign-out`,
        method: 'POST',
        credentials: 'include',
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    updateProfile: builder.mutation({
      query: userData => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: userData,
        credentials: 'include',
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/users`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    updateUser: builder.mutation({
      query: ({ userId, name, email }) => ({
        url: `${ADMIN_URL}/users/${userId}`,
        method: 'PUT',
        body: { name, email },
        credentials: 'include',
      }),
    }),

    deleteUser: builder.mutation({
      query: id => ({
        url: `${ADMIN_URL}/users/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
  }),
})

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice
