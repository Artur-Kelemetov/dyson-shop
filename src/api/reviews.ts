import { apiClient } from "./apiClient";
import type { Review } from "../types/review";

export const getReviews = () => {
  return apiClient<Review[]>('/reviews')
}

export const getReviewsByProductId = (productId: number) => {
  return apiClient<Review[]>(`/reviews?productId=${productId}`)
}


export type CreateReviewPayload = {
  rating: number,
  author: string,
  comment: string,
  photos: string[],
  date: string,
  dateTime: string
}

export const createReview = (review: CreateReviewPayload) => {
  return apiClient<Review>("/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review)
  })
}