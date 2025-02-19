import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productSlice from "../features/product/productSlice";
import authSlice from "../features/authentication/authSlice";
import categorySlice from "../features/category/categorySlice";

const presistConfig = {
  key: "root",
  storage,
  whitelist: ["products", "auth", "categories"],
};

// Create a hook for using TypedUseSelectorHook
const rootReducer = combineReducers({
  products: productSlice,
  auth: authSlice,
  categories: categorySlice,
  // Add your reducers here
});

const persistedReducer = persistReducer(presistConfig, rootReducer);

// Combine all reducers
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persist the store
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks for using TypedUseSelectorHook
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
