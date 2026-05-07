import { z } from "zod"

const MIN_AUTHOR_LENGTH = 2
const MAX_AUTHOR_LENGTH = 30

export const nameSchema = z
  .string()
  .trim()
  .min(1, "Пожалуйста, введите имя")
  .min(MIN_AUTHOR_LENGTH, `Имя должно содержать минимум ${MIN_AUTHOR_LENGTH} символа`)
  .max(MAX_AUTHOR_LENGTH, `Имя должно содержать не больше ${MAX_AUTHOR_LENGTH} символов`)
  .regex(
    /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/,
    "Имя может содержать только буквы, пробел, дефис и апостроф",
  )