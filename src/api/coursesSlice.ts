import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getCourses = createAsyncThunk<ICourses[], void, { rejectValue: string }>("courses/getCourses", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
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

interface IInitialState {
  data: ICourses[] | null;
  loading: boolean;
  error: string | null;
}

export interface ICourses {
  id: number;
  userId: number;
  title: string;
  body: string;
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
      .addCase(getCourses.fulfilled, (state, action: PayloadAction<ICourses[]>) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default courseApiSlice.reducer;
