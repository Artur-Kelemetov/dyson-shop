import { apiClient } from "./apiClient"

export type ContactFormPayload = {
  name: string,
  phone: string
}

export type SubscribeFormPayload = {
  email: string,
  agreement: boolean
}

export const submitContactForm = (payload: ContactFormPayload) => {
  return apiClient<ContactFormPayload>('/contactRequests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
}

export const submitSubscribeForm = (payload: SubscribeFormPayload) => {
  return apiClient<SubscribeFormPayload>('/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
}
