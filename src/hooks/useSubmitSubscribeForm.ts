import { useMutation } from "@tanstack/react-query";
import { submitSubscribeForm } from "../api/contactSection";

export const useSubmitSubscribeForm = () => {
  return useMutation({
    mutationFn: submitSubscribeForm
  })
}