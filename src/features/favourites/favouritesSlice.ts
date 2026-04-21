import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FavouriteItem = {
  id: number
  title: string
  price: number
  images: string[]
}

export type FavouritesState = {
  items: FavouriteItem[]
}

const initialState: FavouritesState = {
  items: [],
}

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<FavouriteItem>) => {
      const { id } = action.payload

      const existingItemIndex = state.items.findIndex((item) => item.id === id)

      if (existingItemIndex !== -1) {
        state.items.splice(existingItemIndex, 1)
        return
      }

      state.items.push(action.payload)
    },

    removeFromFavourites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    clearFavourites: (state) => {
      state.items = []
    }
  }
})

export const { toggleFavourite, removeFromFavourites, clearFavourites } = favouritesSlice.actions
export default favouritesSlice.reducer