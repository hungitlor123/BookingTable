import { IProduct } from "@/interfaces/Product";
import {
  CREATE_PRODUCT_ENDPOINT,
  DELETE_PRODUCT_ENDPOINT,
  EDIT_PRODUCT_ENDPOINT,
  GET_PRODUCT_BY_CATEGORY_ENDPOINT,
  GET_PRODUCT_BY_ID_ENDPOINT,
  GET_PRODUCT_ENDPOINT,
} from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type ProductState = {
  loading: boolean;
  products: IProduct[] | null;
  product: IProduct | null;
  error: string[] | unknown;
};

const initialState: ProductState = {
  loading: false,
  products: null,
  product: null,
  error: null,
};

export const getAllProduct = createAsyncThunk<IProduct[], void>(
  "producs/getAllProduct",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("bookingToken");
      const response = await axiosInstance.get(GET_PRODUCT_ENDPOINT, {
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

export const getProductById = createAsyncThunk<IProduct, { id: number }>(
  "products/getProductById",
  async (data, thunkAPI) => {
    const { id } = data;
    try {
      const token = localStorage.getItem("bookingToken");
      const response = await axiosInstance.get(
        `${GET_PRODUCT_BY_ID_ENDPOINT}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);
export const createProduct = createAsyncThunk<IProduct, FormData>(
  "products/createProduct",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("bookingToken");
      const response = await axiosInstance.post(CREATE_PRODUCT_ENDPOINT, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Remove 'Content-Type': 'multipart/form-data' header here
        },
      });

      // Check errCode for success instead of response.data.success
      if (response.data.errCode === 0) {
        toast.success(`${response.data.errMessage}`);
      } else {
        toast.error(`${response.data.errMessage}`);
      }

      return response.data;
    } catch (error: any) {
      toast.error(`${error.response.data.errors}`);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateProduct = createAsyncThunk<IProduct, { data: FormData }>(
  "products/updateProduct",
  async (data, thunkAPI) => {
    const { data: formData } = data;
    try {
      const token = localStorage.getItem("bookingToken");
      const response = await axiosInstance.put(
        `${EDIT_PRODUCT_ENDPOINT}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
      toast.error(`${error.response.data.errors}`);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk<IProduct, { id: number }>(
  "products/deleteProduct",
  async (data, thunkAPI) => {
    const { id } = data;
    try {
      const token = localStorage.getItem("bookingToken");
      const response = await axiosInstance.delete(
        `${DELETE_PRODUCT_ENDPOINT}/${id}`,
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

export const getProductByCategory = createAsyncThunk<
  IProduct[], // API trả về danh sách sản phẩm
  { categoryId: number } // Tham số đầu vào
>("products/getProductByCategory", async ({ categoryId }, thunkAPI) => {
  try {
    const token = localStorage.getItem("bookingToken");

    if (!token) {
      return thunkAPI.rejectWithValue("Authentication token not found.");
    }

    const response = await axiosInstance.get(GET_PRODUCT_BY_CATEGORY_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { categoryId }, // Truyền categoryId như query param
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching products by category:", error);

    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        "An error occurred while fetching products."
    );
  }
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string[] | unknown>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // getProductById
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...(state.products || []), action.payload];
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = (state.products || []).map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // deleteProduct
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = (state.products || []).filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getProductByCategory
    builder
      .addCase(getProductByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setError } = productSlice.actions;
export default productSlice.reducer;
