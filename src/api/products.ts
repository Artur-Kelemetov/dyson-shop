import type { Product } from "../types/products";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("/products")

  if (!response.ok) {
    throw new Error("Не удалось загрузить товары")
  }

  return response.json()
}