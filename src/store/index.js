import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './slices/productSlice';
import { productsApi } from './apis/productApi';
import { cartReducer } from './slices/cartSlice';
import { authReducer } from './slices/authSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

export { store };
export { fetchProducts } from './thunks/products';
export { useGetAllProductsQuery } from './apis/productApi';
export * from './slices/cartSlice';
export * from './thunks/auth';
export * from './slices/authSlice';
