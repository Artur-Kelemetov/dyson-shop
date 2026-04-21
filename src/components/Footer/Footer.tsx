import { Link } from "react-router-dom"
import { Logo } from "../ui/Logo/Logo"
import iconTelegram from "../../assets/icons/icon-social-telegram.svg"
import iconVk from "../../assets/icons/icon-social-vk.svg"
import iconYouTube from "../../assets/icons/icon-social-youtube.svg"
import "./Footer.scss"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <Logo className="footer__logo"/>
        <div className="footer__body">
          <p className="footer__about">О компании</p>

          <div className="footer__column footer__column--catalog">
            <p className="footer__title">Магазин</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link to="/catalog" className="footer__link">Фены Dyson Supersonic</Link>
              </li>
              <li className="footer__item">
                <Link to="/catalog" className="footer__link">Стайлеры Dyson Airwrap</Link>
              </li>
              <li className="footer__item">
                <Link to="/catalog" className="footer__link">Выпрямители Dyson Corrale</Link>
              </li>
              <li className="footer__item">
                <Link to="/catalog" className="footer__link">Пылесосы</Link>
              </li>
              <li className="footer__item">
                <Link to="/catalog" className="footer__link">Климатическая техника</Link>
              </li>
              <li className="footer__item">
                <Link to="/catalog" className="footer__link">Освещение</Link>
              </li>
              <li className="footer__item">
                <Link to="/catalog" className="footer__link">Аксессуары</Link>
              </li>
            </ul>
          </div>

          <div className="footer__column footer__column--info">
            <p className="footer__title">Общая информация</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a href="#news" className="footer__link">Новости</a>
              </li>
              <li className="footer__item">
                <a href="#news" className="footer__link">Доставка</a>
              </li>
              <li className="footer__item">
                <a href="#news" className="footer__link">Гарантия</a>
              </li>
              <li className="footer__item">
                <a href="#news" className="footer__link">Оплата товара</a>
              </li>
              <li className="footer__item">
                <a href="#contact-section" className="footer__link">Свяжитесь с нами</a>
              </li>
              <li className="footer__item">
                <a href="#news" className="footer__link">Политика конфиденциальности</a>
              </li>
              <li className="footer__item">
                <a href="#news" className="footer__link">Договор оферты</a>
              </li>
            </ul>
          </div>

          <div className="footer__column footer__column--offers">
            <p className="footer__title">Акции</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a href="#special-offers" className="footer__link">Подарочная коллекция</a>
              </li>
              <li className="footer__item">
                <a href="#special-offers" className="footer__link">Эксклюзивные предложения</a>
              </li>
            </ul>
          </div>

          <div className="footer__column footer__column--contacts">
            <p className="footer__title">Отдел логистики:</p>
            <a className="footer__phone" href="tel:+79998004554">
              +7 (999) 800-45-54
            </a>

            <ul className="footer__socials">
              <li className="footer__social-item">
                <a href="" className="footer__social-link" aria-label="Telegram">
                  <img src={iconTelegram} className="footer__icon footer__icon--telegram" alt="" width="40" height="40"/>
                </a>
              </li>
              <li className="footer__social-item">
                <a href="" className="footer__social-link" aria-label="VK">
                  <img src={iconVk} className="footer__icon footer__icon--vk" alt="" width="40" height="40"/>
                </a>
              </li>
              <li className="footer__social-item">
                <a href="" className="footer__social-link" aria-label="YouTube">
                  <img src={iconYouTube} className="footer__icon footer__icon--youtube" alt="" width="40" height="40"/>
                </a>
              </li>
            </ul>
          </div>
            <p className="footer__copyright">
              Интернет-магазин dysmarket.ru, 2026 © Все права защищены.
            </p>
        </div>
      </div>
    </footer>
  )
}