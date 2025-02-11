import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =  import.meta.env.VITE_API_URL


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
  "users/getMyProfile",
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

interface RegisterPayload {
  email: string;
  password: string;
  socialMedia?: string;
  accountId: string;
  name: string;
  accountType: string;
  role: string;
}
export const regsiter = createAsyncThunk(
  "/regsiter",
  async (user:RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/user/register`, user, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "users/logoutUser",
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

export const requestForAds = createAsyncThunk("/requestForAds", async (data: any, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseUrl}/user/requestForAd`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
})

export const myRequestsForAd = createAsyncThunk("/my-requests", async(_,{rejectWithValue})=>{
  try {
    const response = await axios.get(`${baseUrl}/user/myRequestsForAd`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
})

export const getAllUsers = createAsyncThunk("/all-users", async(_,{rejectWithValue})=>{
  try {
    const response = await axios.get(`${baseUrl}/user/all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
})

export const approveAdsRequest = createAsyncThunk("/approveAds", async(data: any,{rejectWithValue})=>{
  try {
    const response = await axios.put(`${baseUrl}/user/approveAdRequest`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
})


interface UserState {
  user: Record<string, any> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: null | string;
}

const initialState: UserState = {
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
      // Login cases
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
        state.error = action.payload as string;
      })
      // Get profile cases
      .addCase(getMyProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
