import { z } from "zod"
import { nameSchema } from "./validation"

export const MAX_REVIEW_RATING = 5

const MAX_COMMENT_LENGTH = 500

export const reviewFormSchema = z.object({
  rating: z
    .number()
    .min(1, "Пожалуйста, поставьте оценку")
    .max(MAX_REVIEW_RATING),

  author: nameSchema,

  comment: z
    .string()
    .trim()
    .max(MAX_COMMENT_LENGTH, `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`),
})

export type ReviewFormValues = z.infer<typeof reviewFormSchema>
