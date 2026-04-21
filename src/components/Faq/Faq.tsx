import { useState } from "react";
import "./Faq.scss"

type FaqItem = {
  id: number,
  question: string,
  answer: string
}

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "Главное отличие фена Dyson в быстром и безопасном высушивании волос?",
    answer: "Главное отличие фена Dyson в быстром и безопасном высушивании волос. В рукоятку встроен датчик температуры, благодаря которому она не поднимается выше 100 градусов. В комплекте 5 насадок, которые подходят для укладки и сушки на разных режимах. Есть практичный черный чехол, предназначенный для аккуратной перевозки и хранения. Расчески можно использовать отдельно от девайса или во время сушки с целью предотвратить запутывание.",
  },
  {
    id: 2,
    question: "В рукоятку встроен датчик температуры, благодаря которому она не поднимается выше 100 градусов?",
    answer: "Да, устройство регулярно измеряет температуру воздушного потока и автоматически корректирует нагрев для более бережной сушки.",
  },
  {
    id: 3,
    question: "Какие насадки входят в комплект?",
    answer: "Комплектация зависит от модели, но обычно включает насадки для направленного потока воздуха, бережной сушки и укладки.",
  },
  {
    id: 4,
    question: "Подходит ли фен Dyson для ежедневного использования?",
    answer: "Да, благодаря контролю температуры и продуманной конструкции фен подходит для регулярного использования.",
  },
  {
    id: 5,
    question: "Можно ли использовать Dyson для разных типов волос?",
    answer: "Да, разные режимы мощности и температуры, а также насадки позволяют адаптировать устройство под разные типы волос.",
  },
  {
    id: 6,
    question: "Чем Dyson отличается от обычных фенов?",
    answer: "Он быстрее сушит волосы, лучше контролирует температуру и помогает снизить риск повреждения волос от перегрева.",
  },
]

export const Faq = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(null)

  const toggleItem = (itemId: number) => {
    setOpenItemId((currentItemId) => 
      currentItemId === itemId ? null : itemId
    )
  }

  return (
    <section className="faq" id="faq">
      <div className="faq__body container">
        <h2 className="faq__title">
          <span className="faq__title-prefix">FAQ — </span>
          Часто задаваемые вопросы
        </h2>

        <ul className="faq__list">
          {faqItems.map(({ id, question, answer }) => {
            const isOpen = openItemId === id
            const contentId = `faq-content-${id}`
            const buttonId = `faq-button-${id}`

            return (
              <li 
                className={`faq__item ${isOpen ? "is-open" : ""}`}
                key={id}
              >
                <button 
                  className="faq__button"
                  id={buttonId}
                  type="button" 
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleItem(id)}
                >
                  <span className="faq__question">{question}</span>

                  <span className="faq__icon"  aria-hidden="true">
                  </span>
                </button>

                <div 
                  className="faq__content"
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                >
                  <div className="faq__answer">
                    <p>{answer}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}