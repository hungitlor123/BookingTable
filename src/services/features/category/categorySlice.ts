import { ICategory, ICategoryTree } from "@/interfaces/Category";
import {
  CREATE_CATEGORY_ENDPOINT,
  DELETE_CATEGORY_ENDPOINT,
  EDIT_CATEGORY_ENDPOINT,
  GET_CATEGORY_ENDPOINT,
  GET_CATEGORY_TREE_ENDPOINT,
} from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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

export const createCategory = createAsyncThunk<
  ICategory,
  { name: string; parentId?: string | null }
>("Categories/createCategory", async (data, thunkAPI) => {
  try {
    const token = localStorage.getItem("bookingToken");
    const response = await axiosInstance.post(
      CREATE_CATEGORY_ENDPOINT,
      data, // Gửi trực tiếp JSON, không cần FormData
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Đảm bảo server nhận JSON
        },
      }
    );

    if (response.data.errCode === 0) {
      toast.success(`${response.data.errMessage}`);
    } else {
      toast.error(`${response.data.errMessage}`);
    }

    return response.data;
  } catch (error: any) {
    toast.error(`${error.response?.data?.errors ?? "Có lỗi xảy ra"}`);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const updateCategory = createAsyncThunk<
  ICategory,
  { id: string; name: string; parentId?: string | null }
>("Categories/updateCategory", async (data, thunkAPI) => {
  try {
    const token = localStorage.getItem("bookingToken");

    // Chuyển dữ liệu thành URL-encoded format
    const encodedData = new URLSearchParams();
    encodedData.append("id", data.id);
    encodedData.append("name", data.name);
    if (data.parentId) {
      encodedData.append("parentId", data.parentId);
    }

    const response = await axiosInstance.put(
      EDIT_CATEGORY_ENDPOINT,
      encodedData, // Gửi dữ liệu dưới dạng x-www-form-urlencoded
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.data.errCode === 0) {
      toast.success(`${response.data.errMessage}`);
    } else {
      toast.error(`${response.data.errMessage}`);
    }

    return response.data;
  } catch (error: any) {
    toast.error(`${error.response?.data?.errors ?? "Có lỗi xảy ra"}`);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const deleteCategory = createAsyncThunk<ICategory, { id: number }>(
  "Categories/deleteCategory",
  async (data, thunkAPI) => {
    const { id } = data;
    try {
      const token = localStorage.getItem("bookingToken");
      const response = await axiosInstance.delete(
        `${DELETE_CATEGORY_ENDPOINT}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.errCode === 0) {
        toast.success(`${response.data.errMessage}`);
      } else {
        toast.error(`${response.data.errMessage}`);
      }

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
    // createCategory
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string[];
      });
    // updateCategory
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string[];
      });
    // deleteCategory
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string[];
      });
  },
});

export const { setError } = categorySlice.actions;
export default categorySlice.reducer;
