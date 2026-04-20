import type { Review } from "../types/review";

export const getReviews = async (): Promise<Review[]> => {
  const response = await fetch("http://localhost:8080/reviews")

  if(!response.ok) {
    throw new Error("Не удалось загрузить отзывы")
  }

  return response.json()
}

export const getReviewsByProductId = async (productId: number): Promise<Review[]> => {
  const response = await fetch(`http://localhost:8080/reviews?productId=${productId}`)

  if(!response.ok) {
    throw new Error("Не удалось загрузить отзывы")
  }

  return response.json()
}


export type CreateReviewPayload = {
  rating: number,
  author: string,
  comment: string,
  photos: string[],
  date: string,
  dateTime: string
}

export const createReview = async (review: CreateReviewPayload): Promise<Review> => {
  const response = await fetch("http://localhost:8080/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review)
  })

  if (!response.ok) {
    throw new Error("Не удалось отправить отзыв")
  }

  const createdReview: Review = await response.json() 
  return createdReview
}