import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState } from "./authSliceInterfaces";
import { loadUser } from "../../utils/storage";

export const initializeAuth = createAsyncThunk<string, void, { rejectValue: string }>("auth/initializeAuth", async (_, { rejectWithValue }) => {
  try {
    const getUser = await loadUser();
    if (getUser !== null) {
      return getUser;
    } else {
      return rejectWithValue("Пользователь не найден");
    }
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

const initialState: IInitialState = {
  isAuthenticated: false,
  userName: null,
  success: false,
};

const authSlice = createSlice({
  name: "authorization",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.isAuthenticated = true;
      state.success = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userName = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isAuthenticated = false;
        state.success = false;
      })
      .addCase(initializeAuth.fulfilled, (state, action: PayloadAction<string>) => {
        state.userName = action.payload;
        state.success = true;
        state.isAuthenticated = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.success = false;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
