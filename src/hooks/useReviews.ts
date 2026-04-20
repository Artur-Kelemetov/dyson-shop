import { useQuery } from "@tanstack/react-query";
import { getReviews, getReviewsByProductId } from "../api/reviews";

export const useAllReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews
  })
}

export const useReviews = (productId: number) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviewsByProductId(productId)
  })
}