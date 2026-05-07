import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  contactFormSchema, 
  subscribeFormSchema, 
  type ContactFormValues, 
  type SubscribeFormValues 
} from "../../utils/validation/contactSectionValidation"
import { useSubmitContactForm } from "../../hooks/useSubmitContactForm"
import { useSubmitSubscribeForm } from "../../hooks/useSubmitSubscribeForm"
import { IMaskInput } from "react-imask"
import { useTimedMessage } from "../../hooks/useTimedMessage"
import "./ContactSection.scss"
import "../ui/Button/Button.scss"

const initialContactFormValues: ContactFormValues = {
  name: "",
  phone: "",
}

const initialSubscribeFormValues: SubscribeFormValues = {
  email: "",
  agreement: false,
}

export const ContactSection = () => {
  const contactFormMutation = useSubmitContactForm()
  const subscribeFormMutation = useSubmitSubscribeForm()

  const contactMessage = useTimedMessage({
    onFinish: () => contactFormMutation.reset(),
  })

  const subscribeMessage = useTimedMessage({
    onFinish: () => subscribeFormMutation.reset(),
  })

  const {
    register: registerContactForm,
    control: contactFormControl,
    handleSubmit: handleContactFormSubmit,
    reset: resetContactForm,
    formState: { errors: contactFormErrors },
  } = useForm<ContactFormValues>({
    defaultValues: initialContactFormValues,
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  })

  const {
    register: registerSubscribeForm,
    handleSubmit: handleSubscribeFormSubmit,
    reset: resetSubscribeForm,
    formState: { errors: subscribeFormErrors },
  } = useForm<SubscribeFormValues>({
    defaultValues: initialSubscribeFormValues,
    resolver: zodResolver(subscribeFormSchema),
    mode: "onBlur",
  })

  const resetContactMutationState = () => {
    if(contactFormMutation.isSuccess || contactFormMutation.isError) {
      contactFormMutation.reset()
    }
  }

  const resetSubscribeMutationState = () => {
    if(subscribeFormMutation.isSuccess || subscribeFormMutation.isError) {
      subscribeFormMutation.reset()
    }
  }
  
  const handleContactSubmit = async (data: ContactFormValues) => {
    try {
      await contactFormMutation.mutateAsync(data)

      resetContactForm()
      contactMessage.showMessage()
    } catch (error) {
        console.error(error);
        contactMessage.showMessage()
    }
  }

  const handleSubscribeSubmit = async (data: SubscribeFormValues) => {
    try {
      await subscribeFormMutation.mutateAsync(data)

      resetSubscribeForm()
      subscribeMessage.showMessage()
    } catch (error) {
        console.error(error);
        subscribeMessage.showMessage()
    }
  }

  return (
    <section className="contact-section" id="contact-section" aria-labelledby="contact-section-title">
      <div className="contact-section__body container">
        <h2 className="visually-hidden" id="contact-section-title">
          Связаться с нами и подписаться на новости
        </h2>

        <div className="contact-section__columns">
          <div className="contact-section__column">
            <form 
              className="contact-section__form contact-form"
              onSubmit={handleContactFormSubmit(handleContactSubmit)}
            >
              <h3 className="contact-form__title">Свяжитесь с нами</h3>

              <div className="contact-form__fields">
                <div className="contact-form__field">
                  <label className="visually-hidden" htmlFor="contact-name">
                    Ваше имя
                  </label>
                  <input 
                    className="contact-form__input" 
                    id="contact-name" 
                    type="text" 
                    placeholder="Ваше имя" 
                    autoComplete="name"
                    {...registerContactForm("name", {
                      onChange: resetContactMutationState
                    })}
                  />
                  {contactFormErrors.name && (
                    <span className="contact-form__error">
                      {contactFormErrors.name.message}
                    </span>
                  )}
                </div>

                <div className="contact-form__field">
                  <label className="visually-hidden" htmlFor="contact-phone">
                    Ваш номер телефона
                  </label>

                  <Controller
                    name="phone"
                    control={contactFormControl}
                    render={({ field }) => (
                      <IMaskInput 
                        className="contact-form__input"
                        id="contact-phone"
                        name={field.name}
                        mask="+{7} (000) 000-00-00"
                        value={field.value}
                        inputRef={field.ref}
                        onBlur={field.onBlur}
                        onAccept={(value) => {
                          resetContactMutationState()
                          field.onChange(value)
                        }}
                        placeholder="Ваш номер телефона"
                      />
                    )}
                  />
                    
                  {contactFormErrors.phone && (
                    <span className="contact-form__error">
                      {contactFormErrors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              <button 
                className="contact-form__button button button--dark" 
                type="submit"
                disabled={contactFormMutation.isPending}
              >
                {contactFormMutation.isPending ? "Отправка..." : "Оставить заявку"}
              </button>

              {contactFormMutation.isError && contactMessage.isVisible && (
                <div className={`contact-form__message-wrap ${contactMessage.isHiding ? "is-hiding" : ""}`}>
                  <span className="contact-form__message-icon"></span>
                    <p className="contact-form__message contact-form__message--error">
                    {contactFormMutation.error.message}
                  </p>
                </div>
                
              )}

              {contactFormMutation.isSuccess && contactMessage.isVisible && (
                <div className={`contact-form__message-wrap ${contactMessage.isHiding ? "is-hiding" : ""}`}>
                  <span className="contact-form__message-icon"></span>
                  <p className="contact-form__message contact-form__message--success">
                    Заявка успешно отправлена
                  </p>
                </div>
              )}
            </form>
          </div>

          <div className="contact-section__column">
            <form 
              className="contact-section__form subscribe-form" 
              onSubmit={handleSubscribeFormSubmit(handleSubscribeSubmit)}
            >
              <h3 className="subscribe-form__title">Подпишитесь на новости</h3>

              <div className="subscribe-form__fields">
                <div className="subscribe-form__field">
                  <label className="visually-hidden" htmlFor="subscribe-email">
                    Ваше e-mail
                  </label>
                  <input 
                    className="subscribe-form__input" 
                    id="subscribe-email" 
                    type="email" 
                    placeholder="Ваш email" 
                    autoComplete="email"
                    {...registerSubscribeForm("email", {
                      onChange: resetSubscribeMutationState 
                    })}
                  />
                  {subscribeFormErrors.email && (
                    <span className="subscribe-form__error">
                      {subscribeFormErrors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <button 
                className="subscribe-form__button button button--dark" 
                type="submit"
                disabled={subscribeFormMutation.isPending}
              >
                {subscribeFormMutation.isPending ? "Отправка..." : "Подписаться"}
              </button>

              <label className="subscribe-form__agreement checkbox" htmlFor="subscribe-agreement">
                <input 
                  className="checkbox__input" 
                  id="subscribe-agreement" 
                  type="checkbox" 
                  {...registerSubscribeForm("agreement", {
                    onChange: resetSubscribeMutationState ,
                  })}
                  />

                <span className="checkbox__box" aria-hidden="true"></span>

                <span className="checkbox__label">
                  Я ознакомлен(а) с политикой конфиденциальности и согласен(а) с обработкой
                  персональных данных
                </span>
              </label>
              {subscribeFormErrors.agreement && (
                <span className="subscribe-form__error">
                  {subscribeFormErrors.agreement.message}
                </span>
              )}

              {subscribeFormMutation.isError && subscribeMessage.isVisible && (
                <div className={`subscribe-form__message-wrap ${subscribeMessage.isHiding ? "is-hiding" : ""}`}>
                  <p className="subscribe-form__message subscribe-form__message--error">
                    {subscribeFormMutation.error.message}
                  </p>
                </div>
              )}

              {subscribeFormMutation.isSuccess && subscribeMessage.isVisible && (
                <div className={`subscribe-form__message-wrap ${subscribeMessage.isHiding ? "is-hiding" : ""}`}>
                  <span className="subscribe-form__message-icon"></span>
                  <p className="subscribe-form__message subscribe-form__message--success">
                    Вы успешно подписались на новости
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}