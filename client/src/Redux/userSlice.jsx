import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

      const response = await fetch(
        "https://ecommerce-ev4m.onrender.com/api/register",
        {
          method: "POST",
          body: formDataFile,
        }
      );

      const data = await response.json();

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

      const response = await fetch(
        "https://ecommerce-ev4m.onrender.com/api/login",
        {
          method: "POST",
          body: formDataFile,
          credentials: "include",
        }
      );

      const data = await response.json();
      const user = data.user;
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
      const response = await fetch(
        "https://ecommerce-ev4m.onrender.com/api/me",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      const user = data.user;
      if (data.success) {
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));
      }

      return data;
    } catch (e) {
      console.log({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://ecommerce-ev4m.onrender.com/api/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

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

      const response = await fetch(
        "https://ecommerce-ev4m.onrender.com/api/update/profile",
        {
          method: "PUT",
          credentials: "include",
          body: formDataFile,
        }
      );

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

export const updatePassword = createAsyncThunk(
  "user/password/update",
  async ({ formData }, { rejectWithValue }) => {
    const { oldPassword, newPassword, confirmPassword } = formData;
    const formDataFile = new FormData();
    formDataFile.set("oldPassword", oldPassword);
    formDataFile.set("newPassword", newPassword);
    formDataFile.set("confirmPassword", confirmPassword);
    try {
      const response = await fetch(
        "https://ecommerce-ev4m.onrender.com/api/update/password",
        {
          method: "PUT",
          credentials: "include",
          body: formDataFile,
        }
      );

      const data = await response.json();
      if (data.success) {
        // Update local storage userData
        const storedData = localStorage.getItem("userData");
        if (storedData) {
          const userData = JSON.parse(storedData);
          const updatedUserData = { ...userData, password: newPassword };
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
        }
      }
      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/password/forgot",
  async ({ email }, { rejectWithValue }) => {
    const formData = new FormData();

    formData.set("email", email);

    try {
      const response = await fetch(
        "https://ecommerce-ev4m.onrender.com/api/password/forgot",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/password/reset",
  async ({ formData, token }, { rejectWithValue }) => {
    const { password, confirmPassword } = formData;
    const formDataFile = new FormData();

    formDataFile.set("password", password);
    formDataFile.set("confirmPassword", confirmPassword);

    try {
      const response = await fetch(
        `https://ecommerce-ev4m.onrender.com/api/password/reset/${token}`,
        {
          method: "PUT",
          body: formDataFile,
        }
      );

      const data = await response.json();

      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);

const storedData = localStorage.getItem("userData");
const auth = localStorage.getItem("auth");

export const resetMessage = createAction("user/resetMessage");
export const resetError = createAction("user/resetError");
export const resetSuccess = createAction("user/resetSuccess");

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
      state.message = "";
    },
    resetMessage: (state) => {
      state.message = "";
    },
    resetError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { err } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.isAuthenticated = false;
          state.loading = false;
          state.success = true;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err;
        state.success = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, err, message } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.isAuthenticated = true;
          state.user = user;
          state.message = message;
          state.loading = false;
          state.success = true;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err;
        state.success = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        const { user, err, message } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.isAuthenticated = true;
          state.user = user;
          state.message = message;
          state.loading = false;
          state.success = true;
        }
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err;
        state.success = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        const { err } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.isAuthenticated = false;
          state.user = {};
          state.message = "";
          state.loading = false;
          state.success = true;
          resetUser(state);
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err;
        state.success = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const { err } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.isAuthenticated = true;
          state.loading = false;
          state.success = true;
        }
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        const { err, message } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.isAuthenticated = true;
          state.message = message;
          state.loading = false;
          state.success = true;
        }
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.err;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        const { err, message } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.message = message;
          state.loading = false;
          state.success = true;
        }
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.err;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        const { err, message } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
          state.success = false;
        } else {
          state.message = message;
          state.loading = false;
          state.success = true;
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.err;
      });
  },
});
export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
