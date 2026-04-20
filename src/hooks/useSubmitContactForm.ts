import { useMutation } from "@tanstack/react-query";
import { submitContactForm } from "../api/contactSection";

export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: submitContactForm
  })
}