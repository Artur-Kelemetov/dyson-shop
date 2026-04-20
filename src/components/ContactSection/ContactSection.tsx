import { useState, type ChangeEvent, } from "react"
import type { ContactFormValues, SubscribeFormValues, ContactFormErrors, SubscribeFormErrors } from "../../utils/validation/contactSectionValidation"
import { validateContactForm, validateSubscribeForm } from "../../utils/validation/contactSectionValidation"
import { useSubmitContactForm } from "../../hooks/useSubmitContactForm"
import { useSubmitSubscribeForm } from "../../hooks/useSubmitSubscribeForm"
import { IMaskInput } from "react-imask"
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
  const [contactFormValues, setContactFormValues] = useState<ContactFormValues>(initialContactFormValues)
  const [contactFormErrors, setContactFormErrors] = useState<ContactFormErrors>({})

  const [subscribeFormValues, setSubscribeFormValues] = useState<SubscribeFormValues>(initialSubscribeFormValues)
  const [subscribeFormErrors, setSubscribeFormErrors] = useState<SubscribeFormErrors>({})

  const contactFormMutation = useSubmitContactForm()
  const subscribeFormMutation = useSubmitSubscribeForm()

  const handleContactInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (contactFormMutation.isSuccess || contactFormMutation.isError) {
      contactFormMutation.reset()
    }

    setContactFormValues((prev) => ({
      ...prev,
      [name]: value
    }))

    setContactFormErrors((prev) => ({
      ...prev,
      [name]: ""
    }))
  }

  const handleSubscribeInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target

    if (subscribeFormMutation.isSuccess || subscribeFormMutation.isError) {
      contactFormMutation.reset()
    }

    setSubscribeFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))

    setSubscribeFormErrors((prev) => ({
      ...prev,
      [name]: ""
    }))
  }

  
  const handleContactSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const errors = validateContactForm(contactFormValues)

    if (Object.keys(errors).length > 0) {
      setContactFormErrors(errors)
      return
    }

    try {
      await contactFormMutation.mutateAsync(contactFormValues)

      setContactFormValues(initialContactFormValues)
      setContactFormErrors({})
    } catch (error) {
      console.log(error);
    }
  }


  const handleSubscribeSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const errors = validateSubscribeForm(subscribeFormValues)

    if (Object.keys(errors).length > 0) {
      setSubscribeFormErrors(errors)
      return
    }

    try {
      await subscribeFormMutation.mutateAsync(subscribeFormValues)

      setSubscribeFormValues(initialSubscribeFormValues)
      setSubscribeFormErrors({})
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <section className="contact-section" aria-labelledby="contact-section-title">
      <div className="contact-section__body container">
        <h2 className="visually-hidden" id="contact-section-title">
          Связаться с нами и подписаться на новости
        </h2>

        <div className="contact-section__columns">
          <div className="contact-section__column">
            <form 
              className="contact-section__form contact-form"
              onSubmit={handleContactSubmit}
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
                    name="name" 
                    type="text" 
                    placeholder="Ваше имя" 
                    autoComplete="name" 
                    value={contactFormValues.name}
                    onChange={handleContactInputChange}
                  />
                  {contactFormErrors.name && (
                    <span className="contact-form__error">
                      {contactFormErrors.name}
                    </span>
                  )}
                </div>

                <div className="contact-form__field">
                  <label className="visually-hidden" htmlFor="contact-phone">
                    Ваш номер телефона
                  </label>
                  <IMaskInput 
                    className="contact-form__input"
                    id="contact-form"
                    name="phone"
                    mask="+{7} (000) 000-00-00"
                    value={contactFormValues.phone}
                    onAccept={(value) =>
                      setContactFormValues((prev) => ({
                        ...prev,
                        phone: value,
                      }))
                    }
                    placeholder="Ваш номер телефона"
                  />
                  {contactFormErrors.phone && (
                    <span className="contact-form__error">
                      {contactFormErrors.phone}
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

              {contactFormMutation.isError && (
                <p className="contact-form__message contact-form__message--error">
                  {(contactFormMutation.error).message}
                </p>
              )}

              {contactFormMutation.isSuccess && (
                <p className="contact-form__message contact-form__message--success">
                  Заявка успешно отправлена
                </p>
              )}
            </form>
          </div>

          <div className="contact-section__column">
            <form 
              className="contact-section__form subscribe-form" 
              onSubmit={handleSubscribeSubmit}
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
                    name="email" 
                    type="email" 
                    placeholder="Ваш email" 
                    autoComplete="email"  
                    value={subscribeFormValues.email}
                    onChange={handleSubscribeInputChange}
                  />
                  {subscribeFormErrors.email && (
                    <span className="subscribe-form__error">
                      {subscribeFormErrors.email}
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
                  name="agreement" 
                  type="checkbox" 
                  checked={subscribeFormValues.agreement}
                  onChange={handleSubscribeInputChange}
                  />
                <span className="checkbox__box" aria-hidden="true"></span>
                <span className="checkbox__label">
                  Я ознакомлен(а) с политикой конфиденциальности и согласен(а) с обработкой
                  персональных данных
                </span>
              </label>
              {subscribeFormErrors.agreement && (
                <span className="subscribe-form__error">
                  {subscribeFormErrors.agreement}
                </span>
              )}

              {subscribeFormMutation.isError && (
                <p className="subscribe-form__message subscribe-form__message--error">
                  {(subscribeFormMutation.error).message}
                </p>
              )}

              {subscribeFormMutation.isSuccess && (
                <p className="subscribe-form__message subscribe-form__message--success">
                  Вы успешно подписались на новости
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}