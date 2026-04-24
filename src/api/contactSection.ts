export type ContactFormPayload = {
  name: string,
  phone: string
}

export type SubscribeFormPayload = {
  email: string,
  agreement: boolean
}

export const submitContactForm = async (payload: ContactFormPayload): Promise<ContactFormPayload> => {
  const response = await fetch("/contactRequests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error("Не удалось отправить заявку")
  }

  return response.json()
}

export const submitSubscribeForm = async (payload: SubscribeFormPayload): Promise<SubscribeFormPayload> => {
  const response = await fetch("/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error("Не удалось оформить подписку")
  }

  return response.json()
}