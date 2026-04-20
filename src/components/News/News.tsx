import { useEffect, useMemo, useState } from "react"
import { useNews } from "../../hooks/useNews"
import "./News.scss"
import { useMediaQuery } from "../../hooks/useMediaQuery"


const MOBILE_MEDIA_QUERY = "(max-width: 767.98px)"

export const News = () => {
  const { data: news = [] } = useNews()

  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY)

  const initialCount = isMobile ? 2 : 3
  const step = isMobile ? 2 : 3

  const [visibleCount, setVisibleCount] = useState(initialCount)

  useEffect(() => {
    setVisibleCount(initialCount)
  }, [initialCount])

  const visibleNews = useMemo(
    () => news.slice(0, visibleCount),
    [news, visibleCount]
  )

  const hasMore = visibleCount < news.length

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + step)
  }

  return (
    <section className="news">
      <div className="news__body container">
        <h2 className="news__title">Новости</h2>

        <ul className="news__list">
          {visibleNews.map(({ id, title, description, date, dateTime, image }) => (
            <li className="news__item" key={id}>
              <article className="news-card">
                <a href="" className="news-card__image-link">
                  <img className="news-card__image" src={image} alt={title} />
                </a>

                <time className="news-card__date" dateTime={dateTime} >
                  {date}
                </time>

                <h3 className="news-card__title">
                  <a className="news-card__title-link" href="" >
                    {title}
                  </a>
                </h3>

                <div className="news-card__description">
                  <p>
                    {description}
                  </p>
                </div>

                <a className="news-card__more-link" href="">
                  Читать далее
                </a>
              </article>
            </li>
            ))}
        </ul>

        {hasMore && (
          <div className="news__more">
            <button 
              className="news__more-button button" 
              type="button"
              onClick={handleShowMore}
              >
              <span className="news__more-text">Показать еще</span>
              <svg className="news__more-icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24.7031 25.722L3.22199 5.13588C2.82325 4.75375 2.80978 4.12073 3.19191 3.72199C3.57403 3.32325 4.20706 3.30978 4.6058 3.69191L26.1919 24.3786V7.44733C26.1919 6.89504 26.6396 6.44733 27.1919 6.44733C27.7442 6.44733 28.1919 6.89504 28.1919 7.44733V26.722C28.1919 27.2743 27.7442 27.722 27.1919 27.722H7.03635C6.48406 27.722 6.03635 27.2743 6.03635 26.722C6.03635 26.1697 6.48406 25.722 7.03635 25.722H24.7031Z" fill="#111111"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}