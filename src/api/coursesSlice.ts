import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getCourses = createAsyncThunk<ICourses[], void, { rejectValue: string }>("courses/getCourses", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/api/courses`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Ошибка сети");
    }

    const result: ICourses[] = await response.json();

    return result;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const createCourse = createAsyncThunk<ICourses, { title: string; description: string }, { rejectValue: string }>("courses/createCourse", async (courseData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      throw new Error("Ошибка при создании курса");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

interface IInitialState {
  data: ICourses[] | null;
  loading: boolean;
  error: string | null;
}

export interface ICourses {
  id: number;
  userId: number;
  title: string;
  description: string;
}

const initialState: IInitialState = {
  data: null,
  loading: false,
  error: null,
};

const courseApiSlice = createSlice({
  name: "courses",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.data = [action.payload, ...(state.data || [])];
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.error = action.payload || "Не удалось создать курс";
      });
  },
});

export default courseApiSlice.reducer;
