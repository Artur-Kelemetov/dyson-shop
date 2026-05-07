import { z } from "zod"
import { nameSchema } from "./validation"

export const contactFormSchema = z.object({
  name: nameSchema,
  phone: z
    .string()
    .min(1, "Пожалуйста, введите номер телефона")
    .refine(
      (value) => value.replace(/\D/g, "").length === 11,
      "Пожалуйста, введите номер телефона полностью"
    ),
})

export const subscribeFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Пожалуйста, введите ваш email")
    .pipe(
      z.email({
        message: "Пожалуйста, введите конкретный email"
      })
    ),

  agreement: z
    .boolean()
    .refine((value) => value, {
      message: "Необходимо согласие на обработку персональных данных"
    })
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
export type SubscribeFormValues = z.infer<typeof subscribeFormSchema>