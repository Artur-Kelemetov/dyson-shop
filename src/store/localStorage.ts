import { type CartState } from "../features/cart/cartSlice"
import { type FavouritesState } from "../features/favourites/favouritesSlice"

const STORAGE_KEY = "dyson-store"

type PersistedState = {
  cart: CartState
  favourites: FavouritesState
}

const isPersistedState = (value:unknown): value is PersistedState => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const state = value as Record<string, unknown>

  if (!("cart" in state) || !("favourites" in state)) {
    return false
  }

  return true
}

export const loadState = (): PersistedState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)

    if (!serializedState) return undefined

    const parsedState: unknown = JSON.parse(serializedState)
    
    if (!isPersistedState(parsedState)) {
      return undefined
    }

    return parsedState
  } catch (error) {
    console.log("Failed to load state from localStorage:", error);
    return undefined
  }
}

export const saveState = (state: PersistedState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (error) {
    console.log("Failed to save state to localStorage:", error);
  }
}