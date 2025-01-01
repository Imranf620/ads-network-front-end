import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:4000/api/v1";

interface DomainState {
  allDomains: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DomainState = {
  allDomains: [],
  loading: false,
  error: null,
};

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface Domain {
  _id: string;
  domain: string;
  type: string;
  assignedDomainAt: Date;
  assignedTo: string;
}

export const getAllDomains = createAsyncThunk<
  ApiResponse<Domain[]>,
  void,
  { rejectValue: string }
>("/allDomains", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseUrl}/domain/all`, {
      withCredentials: true,
    });

    return response.data; // Response will already be parsed as JSON by axios
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

interface newDomain {
  domain: string;
  type: string;
}

export const createDomain = createAsyncThunk(
  "/domain/create",
  async (domain: newDomain, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/domain/create`,
        {
          domain: domain.domain,
          type: domain.type,
        },
        { withCredentials: true }
      );

      return response.data; // Response will already be parsed as JSON by axios
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "An unexpected error occurred");
    }
  }
);

const domainSlice = createSlice({
  name: "domains",
  initialState,
  reducers: {},
});

export default domainSlice.reducer;
