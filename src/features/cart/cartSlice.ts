import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number,
  title: string,
  price: number,
  image: string,
  quantity: number
}

export type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

type AddToCartPayload = {
  id: number,
  title: string,
  price: number,
  image: string,
  quantity: number
}

type UpdateQuantityPayload = {
  id: number,
  quantity: number
}

type ChangeQuantityPayload = {
  id: number
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { id, title, price, image, quantity } = action.payload

      const existingItem = state.items.find((item) => item.id === id)

      if(existingItem) {
        existingItem.quantity += quantity
        return
      }

      state.items.push({
        id,
        title,
        price,
        image,
        quantity
      })
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    increaseQuantity: (state, action: PayloadAction<ChangeQuantityPayload>) => {
      const item = state.items.find((item) => item.id === action.payload.id)

      if(item) {
        item.quantity += 1
      }
    },

    decreaseQuantity: (state, action: PayloadAction<ChangeQuantityPayload>) => {
      const item = state.items.find((item) => item.id === action.payload.id)

      if(!item) return

      if(item.quantity > 1) {
        item.quantity -= 1
        return
      }

      state.items = state.items.filter((cartItem) => cartItem.id !== item.id)
    },

    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { id, quantity } = action.payload

      const item = state.items.find((item) => item.id === id)

      if(!item) return

      if(quantity <= 0) {
        state.items = state.items.filter((cartItem) => cartItem.id !== id)
        return
      }

      item.quantity = quantity
    },

    clearCart: (state) => {
      state.items = []
    }
  }
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer