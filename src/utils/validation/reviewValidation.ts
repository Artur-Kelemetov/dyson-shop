import { validateAuthor } from "./validation"

const MAX_COMMENT_LENGTH = 500

export type ReviewFormValues = {
  rating: number,
  author: string,
  comment: string
}

export type ReviewFormErrors = {
  rating?: string,
  author?: string,
  comment?: string
}

export const validateRating = (value: number): string => {
  if (value === 0) {
    return "Пожалуйста, поставьте оценку"
  }

  return ""
}

export const validateComment = (value: string): string => {
  const trimmedValue = value.trim()

  if (!trimmedValue) return ""

  if (trimmedValue.length > MAX_COMMENT_LENGTH) {
    return `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`
  }

  return ""
}


export const validateReviewForm = (values: ReviewFormValues): ReviewFormErrors => {
    const errors: ReviewFormErrors = {}

    const ratingError = validateRating(values.rating)
    if (ratingError) {
      errors.rating = ratingError
    }

    const authorError = validateAuthor(values.author)
    if (authorError) {
      errors.author = authorError
    }

    const commentError = validateComment(values.comment)
    if (commentError) {
      errors.comment = commentError
    }

    return errors
  }