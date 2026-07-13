import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState } from "./authSliceInterfaces";

const initialState: IInitialState = {
  isAuthenticated: false,
  userName: null,
};

const authSlice = createSlice({
  name: "authorization",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userName = null;
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
