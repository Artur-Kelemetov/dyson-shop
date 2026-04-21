import "./Advantages.scss"
import iconAdvantages1 from "../../assets/icons/icon-advantages-1.svg"
import iconAdvantages2 from "../../assets/icons/icon-advantages-2.svg"
import iconAdvantages3 from "../../assets/icons/icon-advantages-3.svg"
import iconAdvantages4 from "../../assets/icons/icon-advantages-4.svg"
import iconAdvantages5 from "../../assets/icons/icon-advantages-5.svg"
import iconAdvantages6 from "../../assets/icons/icon-advantages-6.svg"

export const Advantages = () => {
  return (
    <section className="advantages" id="advantages">
      <div className="advantages__body container">
        <h2 className="advantages__title">Почему выбирают нас</h2>

        <ul className="advantages__list">
          <li className="advantages__item advantage-card">
            <img className="advantage-card__icon" src={iconAdvantages1} alt="" width="110" height="110" />
            <div className="advantage-card__body">
              <h3 className="advantage-card__title">Широкий ассортимент</h3>
              <p className="advantage-card__description">
                Большой выбор техники
                <br />
                и аксессуаров
              </p>
            </div>
          </li>

          <li className="advantages__item advantage-card">
            <img className="advantage-card__icon" src={iconAdvantages2} alt="" width="110" height="110" />
            <div className="advantage-card__body">
              <h3 className="advantage-card__title">Быстрая доставка</h3>
              <p className="advantage-card__description">
                По Москве — 2-3 часа; 
                <br /> 
                По России — 2-4 дня
              </p>
            </div>
          </li>

          <li className="advantages__item advantage-card">
            <img className="advantage-card__icon" src={iconAdvantages3} alt="" width="110" height="110" />
            <div className="advantage-card__body">
              <h3 className="advantage-card__title">Специальное предложение</h3>
              <p className="advantage-card__description">
                Только для клиентов
                <br />
                нашего сайта
              </p>
            </div>
          </li>

          <li className="advantages__item advantage-card">
            <img className="advantage-card__icon" src={iconAdvantages4} alt="" width="110" height="110" />
            <div className="advantage-card__body">
              <h3 className="advantage-card__title">Гарантия производителя</h3>
              <p className="advantage-card__description">
                Гарантия 2 года
                <br />
                на устройства и аксессуары
              </p>
            </div>
          </li>

          <li className="advantages__item advantage-card">
            <img className="advantage-card__icon" src={iconAdvantages5} alt="" width="110" height="110" />
            <div className="advantage-card__body">
              <h3 className="advantage-card__title">Безопасная оплата</h3>
              <p className="advantage-card__description">Оплата после получения товара</p>
            </div>
          </li>

          <li className="advantages__item advantage-card">
            <img className="advantage-card__icon" src={iconAdvantages6} alt="" width="110" height="110" />
            <div className="advantage-card__body">
              <h3 className="advantage-card__title">Бесплатная консультация</h3>
              <p className="advantage-card__description">
                В любом удобном для вас 
                <br />
                формате, 7 дней в неделю
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}