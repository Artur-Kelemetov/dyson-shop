const MIN_AUTHOR_LENGTH = 2
const MAX_AUTHOR_LENGTH = 30

export const validateAuthor = (value: string): string => {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return "Пожалуйста, введите имя"
  }

  if (trimmedValue.length < MIN_AUTHOR_LENGTH) {
    return `Имя должно содержать минимум ${MIN_AUTHOR_LENGTH} символа`
  }

  if (trimmedValue.length > MAX_AUTHOR_LENGTH) {
    return `Имя должно содержать не больше ${MAX_AUTHOR_LENGTH} символов`
  }

  const authorPattern = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/;

  if (!authorPattern.test(trimmedValue)) {
    return "Имя может содержать только буквы, пробел, дефис и апостроф"
  }

  return ""
}