import type { Product } from "../types/products";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:8080/products")

  if (!response.ok) {
    throw new Error("Не удалось загрузить товары")
  }

  return response.json()
}