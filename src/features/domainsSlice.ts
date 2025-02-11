import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =  import.meta.env.VITE_API_URL


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
      return rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  }
);
export const deleteDomain = createAsyncThunk(
  "/deleteDomain",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/domain/delete/${id}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  }
);

export const toggleRedirectActivity = createAsyncThunk(
  "/toggleRedirectActivity",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/domain/update/${id}`,
        {},
        { withCredentials: true }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  }
);

export const uploadFile = createAsyncThunk(
  "/uploadFile",
  async ({ domainId, file, pass, fileUrl }: any, { rejectWithValue }) => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("domainId", domainId);
    formData.append("password", pass);
    formData.append("fileUrl", fileUrl);
    try {
      const response = await axios.post(
        `${baseUrl}/file/upload`,
        
          formData,

        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  }
);

const domainSlice = createSlice({
  name: "domains",
  initialState,
  reducers: {},
});

export default domainSlice.reducer;
