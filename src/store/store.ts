import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../features/cart/cartSlice"
import favouritesReducer from "../features/favourites/favouritesSlice"
import { loadState, saveState } from './localStorage'

const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourites: favouritesReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    favourites: store.getState().favourites,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch