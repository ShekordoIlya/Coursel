import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEnrollment {
  id: number;
  courseId: number;
  status: string;
  enrolledAt: string;
  course: {
    id: number;
    title: string;
    description: string;
  };
}

interface IStatistics {
  total: number;
  completed: number;
  failed: number;
  enrolled: number;
}

interface IInitialState {
  enrollments: IEnrollment[];
  statistics: IStatistics | null;
  loading: boolean;
  error: string | null;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const initialState: IInitialState = {
  enrollments: [],
  statistics: null,
  loading: false,
  error: null,
};

export const getEnrollments = createAsyncThunk<IEnrollment[], void, { rejectValue: string }>("enrollments/getEnrollments", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/api/enrollments`);
    if (!response.ok) throw new Error("Ошибка получения записей");
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const enrollToCourse = createAsyncThunk<IEnrollment, { courseId: number }, { rejectValue: string }>("enrollments/enrollToCourse", async ({ courseId }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/api/enrollments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });
    if (!response.ok) throw new Error("Ошибка записи на курс");
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const updateEnrollmentStatus = createAsyncThunk<IEnrollment, { id: number; status: string }, { rejectValue: string }>("enrollments/updateStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/api/enrollments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Ошибка обновления статуса");
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const getStatistics = createAsyncThunk<IStatistics, void, { rejectValue: string }>("enrollments/getStatistics", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/api/statistics`);
    if (!response.ok) throw new Error("Ошибка получения статистики");
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnrollments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload;
      })
      .addCase(getEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      })
      .addCase(enrollToCourse.fulfilled, (state, action) => {
        state.enrollments.unshift(action.payload);
        if (state.statistics) {
          state.statistics.total += 1;
          state.statistics.enrolled += 1;
        }
      })
      .addCase(updateEnrollmentStatus.fulfilled, (state, action) => {
        const index = state.enrollments.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.enrollments[index] = action.payload;
        }
        if (state.statistics) {
          if (action.payload.status === "completed") {
            state.statistics.completed += 1;
            state.statistics.enrolled -= 1;
          } else if (action.payload.status === "failed") {
            state.statistics.failed += 1;
            state.statistics.enrolled -= 1;
          }
        }
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      });
  },
});

export default enrollmentsSlice.reducer;
