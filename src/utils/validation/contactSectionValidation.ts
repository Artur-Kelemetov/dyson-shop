import { validateAuthor } from "./validation"

export type ContactFormValues = {
    name: string,
    phone: string
}

export type SubscribeFormValues = {
  email: string,
  agreement: boolean
}

export type ContactFormErrors= {
  name?: string,
  phone?: string
}

export type SubscribeFormErrors = {
  email?: string,
  agreement?: string
}

export const validatePhone = (value: string): string => {
  const trimmedValue = value.trim()

  if (!trimmedValue) return "Пожалуйста, введите номер телефона"

  const digitsOnly = trimmedValue.replace(/\D/g, "")

  if (digitsOnly.length !== 11) {
    return "Пожалуйста, введите номер телефона полностью"
  }

  return ""
}

export const validateEmail = (value: string): string => {
  const trimmedValue = value.trim()

  if (!trimmedValue) return "Пожалуйста, введите email"

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(trimmedValue)) {
    return "Пожалуйста, введите корректный email"
  }

  return ""
}

export const validateAgreement = (value: boolean): string => {
  if (!value) {
    return "Необходимо согласие на обработку персональных данных"
  }

  return ""
}


export const validateContactForm = (values: ContactFormValues): ContactFormErrors => {
  const errors: ContactFormErrors = {}

  const nameError = validateAuthor(values.name)
  if (nameError) {
    errors.name = nameError
  }

  const phoneError = validatePhone(values.phone)
  if (phoneError) {
    errors.phone = phoneError
  }

  return errors
}

export const validateSubscribeForm = (values: SubscribeFormValues): SubscribeFormErrors => {
  const errors: SubscribeFormErrors = {}

  const emailError = validateEmail(values.email)
  if (emailError) {
    errors.email = emailError
  }

  const agreementError = validateAgreement(values.agreement)
  if (agreementError) {
    errors.agreement = agreementError
  }

  return errors
}