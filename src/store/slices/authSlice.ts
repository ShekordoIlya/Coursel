import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState } from "./authSliceInterfaces";
import { getToken, getUserData, saveToken, saveUserData, clearAuth } from "../../utils/storage";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IAuthResponse {
  token: string;
  user: IUser;
}

export const initializeAuth = createAsyncThunk<IAuthResponse | null, void, { rejectValue: string }>("auth/initializeAuth", async (_, { rejectWithValue }) => {
  try {
    const token = await getToken();
    const user = await getUserData();
    if (token && user) {
      return { token, user };
    }
    return rejectWithValue("Пользователь не найден");
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

export const register = createAsyncThunk<IAuthResponse, { name: string; email: string; password: string }, { rejectValue: string }>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Ошибка регистрации");
    return result;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const login = createAsyncThunk<IAuthResponse, { email: string; password: string }, { rejectValue: string }>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Ошибка входа");
    return result;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const initialState: IInitialState = {
  isAuthenticated: false,
  userName: null,
  success: false,
  loading: false,
  error: null,
  token: null,
  userId: null,
};

const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.userName = null;
      state.token = null;
      state.userId = null;
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.userName = action.payload.user.name;
          state.token = action.payload.token;
          state.userId = action.payload.user.id;
          state.success = true;
        }
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userName = action.payload.user.name;
        state.token = action.payload.token;
        state.userId = action.payload.user.id;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userName = action.payload.user.name;
        state.token = action.payload.token;
        state.userId = action.payload.user.id;
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
