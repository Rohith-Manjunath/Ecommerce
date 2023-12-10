// userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_USER = "userData";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ formData, avatarPic }, { rejectWithValue }) => {
    const { name, email, password } = formData;

    try {
      const formDataFile = new FormData();
      formDataFile.append("name", name);
      formDataFile.append("email", email);
      formDataFile.append("password", password);
      formDataFile.append("avatar", avatarPic);

      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        body: formDataFile,
      });

      const data = await response.json();

      data.success &&
        localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(data));

      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ formData }, { rejectWithValue }) => {
    const { email, password } = formData;

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        credentials: "include", // Enable credentials
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check if the login was successful before storing in localStorage
      if (data.success) {
        localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(data));
      }

      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);

const storedData = localStorage.getItem(LOCAL_STORAGE_USER);
const initialState = {
  user: storedData ? JSON.parse(storedData) : "",
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
