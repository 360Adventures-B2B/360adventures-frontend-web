import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authApi } from "./services/authService";
import { productApi } from "./services/productService";
import filterReducer from "./features/filterSlices";
import { locationApi } from "./services/locationsService";
import { categoryApi } from "./services/categoryService";
import { cartApi } from "./services/cartService";
import { bookingApi } from "./services/bookingService";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      productApi.middleware,
      locationApi.middleware,
      categoryApi.middleware,
      cartApi.middleware,
      bookingApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
