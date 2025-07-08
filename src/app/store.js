import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './api/apiSlice'
import userReducer from './slices/userSlice'
import favoriteReducer from './slices/favoriteSlice'
import cartReducer from './slices/cartSlice'
import { getFavoritesFromLocalStorage } from './utils/localStorage'

const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    favorite: favoriteReducer,
    cart: cartReducer,
  },
  preloadedState: {
    favorite: initialFavorites,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

setupListeners(store.dispatch)

export default store
