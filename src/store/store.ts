import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import coursesApiSlice from "../api/coursesSlice";
import enrollmentsSlice from "../api/enrollmentsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    courses: coursesApiSlice,
    enrollments: enrollmentsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
