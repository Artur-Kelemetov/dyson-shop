import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../features/cart/cartSlice"
import favouritesReducer from "../features/favourites/favouritesSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourites: favouritesReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch