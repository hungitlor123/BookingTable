import { ICategory, ICategoryTree } from "@/interfaces/Category";
import {
  GET_CATEGORY_ENDPOINT,
  GET_CATEGORY_TREE_ENDPOINT,
} from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoryState = {
  loading: boolean;
  categories: ICategory[] | null;
  categortrees: ICategoryTree[] | null;
  category: ICategory | null;
  error: string[] | unknown;
};

const initialState: CategoryState = {
  loading: false,
  categories: null,
  categortrees: null,
  category: null,
  error: null,
};

export const getAllCategory = createAsyncThunk<ICategory[], void>(
  "categories/getAllCategory",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("bookingToken");
      const response = await axiosInstance.get(GET_CATEGORY_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);
export const getAllCategoryTree = createAsyncThunk<ICategoryTree[], void>(
  "categories/getAllCategoryTree",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("bookingToken");
      const response = await axiosInstance.get(GET_CATEGORY_TREE_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string[] | unknown>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string[];
      });
    // getAllCategoryTree
    builder
      .addCase(getAllCategoryTree.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategoryTree.fulfilled, (state, action) => {
        state.loading = false;
        state.categortrees = action.payload;
      })
      .addCase(getAllCategoryTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string[];
      });
  },
});

export const { setError } = categorySlice.actions;
export default categorySlice.reducer;
