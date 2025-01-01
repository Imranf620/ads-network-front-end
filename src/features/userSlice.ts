import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:4000/api/v1";

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/user/login`, user, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getMyProfile = createAsyncThunk(
  "/user/getMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/user/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/user/logout`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
interface state {
    user:{},
    isAuthenticated:boolean,
    isLoading:boolean,
    error:null | string

}
const initialState:user = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getMyProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      });
  },
});
