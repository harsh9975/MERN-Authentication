import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.0.214:8000',
    // baseUrl: 'http://127.0.0.1:5000/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        url: 'api/user/profile',
        method: 'GET',
      }),
    }),
  }),
})

// export react hook
export const { useGetDetailsQuery } = authApi