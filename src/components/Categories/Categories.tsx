import { Link } from "react-router-dom";
import "./Categories.scss";
import categoriesImage1 from "../../assets/images/categories-image-1.png"
import categoriesImage2 from "../../assets/images/categories-image-2.png"
import categoriesImage3 from "../../assets/images/categories-image-3.png"
import categoriesImage4 from "../../assets/images/categories-image-4.png"

type CategoriesProps = {
  id: number, 
  title: string,
  href: string,
  image: string,
  isActive: boolean,
}

const categoriesData: CategoriesProps[] = [
  {
    id: 1,
    title: 'Акции',
    href: '/catalog',
    image: categoriesImage1,
    isActive: false,
  },
  {
    id: 2,
    title: 'Фены',
    href: '/catalog',
    image: categoriesImage2,
    isActive: false,
  },
  {
    id: 3,
    title: 'Стайлеры',
    href: '/catalog',
    image: categoriesImage3,
    isActive: false,
  },
  {
    id: 4,
    title: 'Выпрямители',
    href: '/catalog',
    image: categoriesImage4,
    isActive: false,
  },
    {
    id: 5,
    title: 'Акции',
    href: '/catalog',
    image: categoriesImage1,
    isActive: false,
  },
  {
    id: 6,
    title: 'Фены',
    href: '/catalog',
    image: categoriesImage2,
    isActive: false,
  },
  {
    id: 7,
    title: 'Стайлеры',
    href: '/catalog',
    image: categoriesImage3,
    isActive: false,
  },
  {
    id: 8,
    title: 'Выпрямители',
    href: '/catalog',
    image: categoriesImage4,
    isActive: false,
  },
]

export const Categories = () => {
  return (
    <section className="categories">
      <div className="container">
        <div className="categories__list">
          {categoriesData.map(({ id, title, href, image, isActive }) => {
          return (
            <article className={`categories__item ${isActive ? 'is-active' : ''}`} key={id}>
              <Link to={href} className="categories__link" >
                <img 
                  className="categories__image" 
                  src={image} 
                  alt={title} 
                  width="324" 
                  height="324"
                  loading="lazy"/>

                <div className="categories__body">
                  <h3 className="categories__title">{title}</h3>
                  <span className="categories__more">
                    Подробнее
                    <svg className="categories__more-icon" width="26" height="26" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M24.9974 13.0109L0.806042 12.8057C0.353791 12.8018 -0.00838741 12.4296 0.000107047 11.9774C0.0084787 11.5318 0.374125 11.176 0.819838 11.1798L25.1461 11.3862L15.8103 1.37472C15.5024 1.04457 15.5205 0.527345 15.8506 0.219474C16.1808 -0.0883978 16.698 -0.0703355 17.0059 0.259816L27.5044 11.5181C27.881 11.922 27.8589 12.5548 27.455 12.9314L15.5336 24.0483C15.2069 24.3531 14.6949 24.3352 14.3902 24.0084C14.0855 23.6816 14.1034 23.1697 14.4302 22.865L24.9974 13.0109Z" fill="#111111"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
          )
          })}
        </div>
      </div>
    </section>
  )
}