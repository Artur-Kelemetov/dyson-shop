import { useState } from "react"
import { Logo } from "../ui/Logo/Logo"
import { useAppSelector } from "../../store/hooks"
import { Link } from "react-router-dom"
import "./Header.scss"

export const Header = () => {
  const[isMenuOpen, setIsMenuOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const cartItemsCount = useAppSelector((state) => state.cart.items.length)


  return (
    <header className="header">
      <div className="header__body">
        <div className="header__body-inner container">
          <button 
            className={`header__burger-button burger-button ${isMenuOpen ? "is-active" : ""}`} 
            aria-label={isMenuOpen ? "Close Menu" : "OpenMenu"}
            title={isMenuOpen ? "Close Menu" : "OpenMenu"}
            onClick={toggleMenu}
            >
            <span className="burger-button__line"></span>
            <span className="burger-button__line"></span>
            <span className="burger-button__line"></span>
          </button>
          <Logo className="header__logo"/>
          <nav className="header__menu">
            <ul className="header__menu-list">
              <li className="header__menu-item">
                <a href="#experts-opinion" className="header__menu-link" onClick={closeMenu}>
                  О нас
                </a>
              </li>
              <li className="header__menu-item">
                <a href="#special-offers" className="header__menu-link" onClick={closeMenu}>
                  Доставка и оплата
                </a>
              </li>
              <li className="header__menu-item">
                <a href="#special-offers" className="header__menu-link" onClick={closeMenu}>
                  Регистрация продукта
                </a>
              </li>
              <li className="header__menu-item--laptop-compact-hidden">
                <a href="#special-offers" className="header__menu-link" onClick={closeMenu}>
                  Сервис
                </a>
              </li>
              <li className="header__menu-item--laptop-hidden">
                <a href="#special-offers" className="header__menu-link" onClick={closeMenu}>
                  Сертификаты и лицензии
                </a>
              </li>
            </ul>
          </nav>
          <div className="header__actions">
            <Link to="/favourites" className={`header__favourite ${cartItemsCount > 0 ? "has-badge" : ""}`}>
              <svg className={"header__favourite-icon"} width="46" height="41" viewBox="0 0 46 41" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.465 39.4817L4.41503 21.727C-0.387451 16.7261 -0.0850275 8.52614 5.07164 3.92347C10.1874 -0.642742 17.9443 0.243945 21.987 5.85704L22.6667 6.80069L23.3463 5.85704C27.3891 0.243945 35.1458 -0.642742 40.2617 3.92347C45.4184 8.52614 45.7209 16.7261 40.9182 21.727L23.8683 39.4817C23.2046 40.1727 22.1287 40.1727 21.465 39.4817Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </Link>
            <Link to="/cart" className={`header__cart ${cartItemsCount > 0 ? "has-badge" : ""}`}>
              <svg className="header__cart-icon" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 13.5C4.5 11.8431 5.84314 10.5 7.5 10.5H28.5C30.1569 10.5 31.5 11.8431 31.5 13.5V30C31.5 31.6569 30.1569 33 28.5 33H7.5C5.84314 33 4.5 31.6569 4.5 30V13.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V9C12 5.68629 14.6863 3 18 3C21.3137 3 24 5.68629 24 9V14.5332" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <span className={`header__cart-badge ${cartItemsCount > 0 ? "is-visible" : ""}`}>
                {cartItemsCount}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className={`header__overlay ${isMenuOpen ? "is-active" : ""}`}>
        <div className="header__overlay-inner container">
          <div className="header__overlay-menu">
            <section className="header__overlay-group header__overlay-group--primary">
              <h2 className="header__overlay-title">Основные разделы</h2>
              <ul className="header__overlay-list header__overlay-list">
                <li className="header__overlay-item">
                  <Link to="/catalog" className="header__overlay-link" onClick={closeMenu}>
                    Каталог
                  </Link>
                </li>
                <li className="header__overlay-item header__overlay-item--laptop-compact-only">
                  <Link to="/catalog" className="header__overlay-link" onClick={closeMenu}>
                    Сервис
                  </Link>
                </li>
                <li className="header__overlay-item">
                  <Link to="/catalog" className="header__overlay-link" onClick={closeMenu}>
                    Новинки
                  </Link>
                </li>
                <li className="header__overlay-item">
                  <Link to="/cart" className="header__overlay-link" onClick={closeMenu}>
                    Корзина
                  </Link>
                </li>
                <li className="header__overlay-item">
                  <Link to="/favourites" className="header__overlay-link" onClick={closeMenu}>
                    Избранное
                  </Link>
                </li>
                <li className="header__overlay-item header__overlay-item--laptop-only">
                  <Link to="/catalog" className="header__overlay-link" onClick={closeMenu}>
                    Сертификаты и лицензии
                  </Link>
                </li>
              </ul>
            </section>

            <section className="header__overlay-group header__overlay-group--secondary">
              <h2 className="header__overlay-title">Информация и сервис</h2>
              <ul className="header__overlay-list header__overlay-list">
                <li className="header__overlay-item">
                  <a href="#experts-opinion" className="header__overlay-link" onClick={closeMenu}>
                    О нас
                  </a>
                </li>
                <li className="header__overlay-item">
                  <Link to="/catalog" className="header__overlay-link" onClick={closeMenu}>
                    Сервис
                  </Link>
                </li>
                <li className="header__overlay-item">
                  <Link to="/catalog" className="header__overlay-link" onClick={closeMenu}>
                    Доставка и оплата
                  </Link>
                </li>
                <li className="header__overlay-item">
                  <Link to="/catalog" className="header__overlay-link" onClick={closeMenu}>
                    Регистрация продукта
                  </Link>
                </li>
                <li className="header__overlay-item">
                  <Link to="/catalog" className="header__overlay-link" onClick={closeMenu}>
                    Сертификаты и лицензии
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </header>
  )
}