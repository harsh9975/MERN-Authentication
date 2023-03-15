import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authActions'

// initialize token from local storage
const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

const initialState = {
  loading: false,
  userInfo:null,
  token,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.token = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.token = payload.token
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer