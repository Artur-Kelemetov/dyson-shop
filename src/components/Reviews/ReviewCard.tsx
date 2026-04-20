import type { Review } from "../../types/review"
import "./ReviewCard.scss"
import iconStar from "../../assets/icons/icon-star-reviews.svg"
import iconStarEmpty from "../../assets/icons/icon-star-empty-reviews.svg"

type ReviewCardProps = {
  review: Review,
  onOpenPhoto: (photos: string[], currentIndex: number, author: string, comment: string) => void
}

const MAX_RATING = 5

export const ReviewCard = ({ review, onOpenPhoto }: ReviewCardProps) => {
  const { author, date, dateTime, rating, title, comment, photos = [] } = review

  return (
    <article className="review-card">
      <div className="review-card__author-block">
        <span className="review-card__author">{author}</span>
        
        <div className="review-card__stars" aria-label={`Оценка ${rating} из ${MAX_RATING}`}>
          {Array.from({ length: MAX_RATING }, (_, index) => {
            const isFilled = index < rating

            return (
              <img
                key={index}
                className="review-card__star" 
                src={isFilled ? iconStar : iconStarEmpty} 
                alt="" 
                aria-hidden="true"
              />
            )
          })}
        </div>
      </div>

      <div className="review-card__body">
        {title && <h3 className="review-card__title">{title}</h3>}
        <p className="review-card__comment">{comment}</p>

        {photos.length > 0 && (
          <div className="review-card__photos-block">
            <ul className="review-card__photos-list">
              {photos.map((photo, index) => (
                <li className="review-card__photos-item" key={index}>
                  <button 
                    className="review-card__photos-button"
                    type="button"
                    onClick={() => onOpenPhoto(photos, index, author, comment)}
                    aria-label={`Открыть фото ${index + 1}`}
                    >
                    <img 
                      className="review-card__photo" 
                      src={photo} 
                      alt={`Фото к отзыву ${index + 1}`} />
                  </button>
                </li>
              ))}
            </ul>

            <button 
              className="review-card__photo-link"
              type="button"
              onClick={() => onOpenPhoto(photos, 0, author, comment)}
              >
              Смотреть все фото
            </button>
          </div>
        )}
      </div>
      <time dateTime={dateTime} className="review-card__date">
        {date}
      </time>
    </article>
  )
}