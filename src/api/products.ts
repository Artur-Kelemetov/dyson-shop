import { apiClient } from "./apiClient";
import type { Product } from "../types/products";

export const getProducts = () => {
  return apiClient<Product[]>('/products')
}