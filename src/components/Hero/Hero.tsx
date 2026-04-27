import "./Hero.scss"
import heroImageDesktop from "../../assets/images/hero-image-desktop.png"
import heroImageMobile from "../../assets/images/hero-image-mobile.png";
import heroImageMobileS from "../../assets/images/hero-image-mobile-s.png";

export const Hero = () => {

const BREAKPOINTS = {
  mobile: 767.98,
  mobileS: 480.98,
}

  return (
    <section className="hero">
      <div className="hero__body container">
        <div className="hero__content">
          <h1 className="hero__title">
            Уникальные технологии <br /> для ухода за волосами
          </h1>
          <p className="hero__description">
            Идеальная укладка для всех типов волос вместе с Dyson
          </p>
          <a className="hero__button button button--accent" href="#special-offers">
            Подробнее
          </a>
        </div>

        <picture className="hero__image">
          <source media={`(max-width: ${BREAKPOINTS.mobileS}px)`} srcSet={heroImageMobileS}/>
          <source media={`(max-width: ${BREAKPOINTS.mobile}px)`} srcSet={heroImageMobile}/>
          <img src={heroImageDesktop} alt="Женщина с феном Dyson" />
        </picture>
      </div>
    </section>
  )
}
