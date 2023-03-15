import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://192.168.0.214:8000'

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  
        const { data } = await axios.post(
          `${backendURL}/api/user/login`,
          { email, password },
          config
        )
  
        // store user's token in local storage
        console.log(data)
        localStorage.setItem('token', data.token)
  
        return data
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

  export const registerUser = createAsyncThunk(
    'user/register',
    async ({ name, email, password,password_confirm,tc }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  
        await axios.post(
          `${backendURL}/api/user/register`,
          { name, email, password,password_confirm,tc },
          config
        )
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )