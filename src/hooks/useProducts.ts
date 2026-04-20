import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import type { Product } from "../types/products";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  })
}