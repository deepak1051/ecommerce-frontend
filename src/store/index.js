import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './slices/productSlice';
import { productsApi } from './apis/productApi';
import { cartReducer } from './slices/cartSlice';
import { authReducer } from './slices/authSlice';
import { adminReducer } from './slices/adminSlice';
import { sellerReducer } from './slices/sellerSlice';
import { productCartReducer } from './slices/productCartSlice';
import { colorReducer } from './slices/colorSlice';
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    admin: adminReducer,
    seller: sellerReducer,
    productCart: productCartReducer,
    color: colorReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

export { store };
export { fetchProducts, fetchSingleProduct } from './thunks/products';
export { useGetAllProductsQuery } from './apis/productApi';
export * from './slices/cartSlice';
export * from './thunks/auth';
export * from './thunks/cart';
export * from './thunks/products';
export * from './slices/authSlice';
export * from './thunks/admin';
export * from './thunks/seller';
export * from './slices/productSlice';
export * from './slices/colorSlice';
