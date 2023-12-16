import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      const user = data.user;
      console.log(user);
      // Check if registration was successful before storing in localStorage
      if (data.success) {
        localStorage.setItem("userData", JSON.stringify(user));
      }

      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ formData }, { rejectWithValue }) => {
    const { email, password } = formData;

    try {
      const formDataFile = new FormData();
      formDataFile.append("email", email);
      formDataFile.append("password", password);

      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        body: formDataFile,
        credentials: "include",
      });

      const data = await response.json();
      const user = data.user;
      console.log(user);
      if (data.success) {
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));
      }

      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/me", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      const user = data.user;
      console.log(user);
      if (data.success) {
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));
      }

      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        localStorage.removeItem("userData");
        localStorage.removeItem("auth");
      }

      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ formData }, { rejectWithValue }) => {
    const { name, email } = formData;

    try {
      const formDataFile = new FormData();
      formDataFile.append("name", name);
      formDataFile.append("email", email);

      const response = await fetch("http://localhost:4000/api/update/profile", {
        method: "PUT",
        credentials: "include",
        body: formDataFile,
      });

      const data = await response.json();
      if (data.success) {
        // Update local storage userData
        const storedData = localStorage.getItem("userData");
        if (storedData) {
          const userData = JSON.parse(storedData);
          const updatedUserData = { ...userData, name, email };
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
        }
      }

      console.log(data);
      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);
const storedData = localStorage.getItem("userData");
const auth = localStorage.getItem("auth");

const initialState = {
  user: storedData ? JSON.parse(storedData) : {},
  error: null,
  loading: false,
  message: "",
  isAuthenticated: auth ? JSON.parse(auth).isAuthenticated : false,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user, err, message, success } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.isAuthenticated = true;
          state.user = user;
          state.message = message;
          state.loading = false;
          state.success = success;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, err, message, success } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.isAuthenticated = true;
          state.user = user;
          state.message = message;
          state.loading = false;
          state.success = success;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        const { user, err, message, success } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.isAuthenticated = true;
          state.user = user;
          state.message = message;
          state.loading = false;
          state.success = success;
        }
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        const { err, message, success } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.isAuthenticated = true;
          state.user = {};
          state.message = message;
          state.loading = false;
          state.success = success;
          resetUser(state);
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const { success } = action.payload;

        state.success = success;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
