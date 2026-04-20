import { useState } from "react"
import { ReviewCard } from "./ReviewCard"
import { useAllReviews } from "../../hooks/useReviews"
import { WriteReviewModal } from "./WriteReviewModal"
import { PhotoGalleryModal } from "../PhotosGalleryModal/PhotoGalleryModal"
import "./Reviews.scss"
import iconStar from "../../assets/icons/icon-star-reviews.svg"
import iconStarEmpty from "../../assets/icons/icon-star-empty-reviews.svg"

const INITIAL_REVIEWS_COUNT = 2
const REVIEWS_STEP = 2
const MAX_RATING = 5

type ReviewPhotosModalState = {
  photos: string[],
  currentIndex: number,
  isOpen: boolean,
  title: string,
  description: string
}

export const Reviews = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_REVIEWS_COUNT)

  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(false)

  const [photosModal, setPhotosModal] = useState<ReviewPhotosModalState>({
    photos: [],
    currentIndex: 0,
    isOpen: false,
    title: "",
    description: "",
  })
  
  const { data: reviews = [], isLoading, isError } = useAllReviews()

  const visibleReviews = reviews.slice(0, visibleCount)
  const hasMore = visibleCount < reviews.length

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = reviews.length ? totalRating / reviews.length : 0
  const roundedRating = Math.round(averageRating)

  const openWriteReviewModal = () => {
    setIsWriteReviewModalOpen(true)
  }

  const closeWriteReviewModal = () => {
    setIsWriteReviewModalOpen(false)
  }

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + REVIEWS_STEP)
  }

  const openPhotoModal = (photos: string[], currentIndex: number, title: string, description: string) => {
    setPhotosModal({
      photos,
      currentIndex,
      isOpen: true,
      title,
      description
    })
  }

  const closePhotoModal = () => {
    setPhotosModal((prev) => ({
      ...prev,
      isOpen: false
    }))
  }

  const showPrevPhoto = () => {
    setPhotosModal((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.photos.length - 1 : prev.currentIndex - 1
    }))
  }

  const showNextPhoto = () => {
    setPhotosModal((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === prev.photos.length - 1 ? 0 : prev.currentIndex + 1
    }))
  }



  if(isLoading) {
    return <section className="reviews">Загрузка отзывов...</section>
  }

  if(isError) {
    return <section className="reviews">Не удалось загрузить отзывы</section>
  }

  return (
    <section className="reviews">
      <div className="reviews__inner container">
        <div className="reviews__header">
          <div className="reviews__summary">
            <h2 className="reviews__title" id="reviews-title">
              Отзывы <span className="reviews__count">{reviews.length}</span>
            </h2>

            <div className="reviews__rating">
              <span className="reviews__rating-value">
                  <span className="reviews__rating-current">
                    {Number.isInteger(averageRating) ? averageRating : averageRating.toFixed(1)}
                  </span>

                  <span className="reviews__rating-separator">/</span>

                  <span className="reviews__rating-max">
                    {MAX_RATING}
                  </span>
              </span>
              <div className="reviews__stars" aria-label={`Рейтинг ${roundedRating} из ${MAX_RATING}`}>
                {Array.from({ length: MAX_RATING }, (_, index) => {
                  const isFilled = index < roundedRating

                  return (
                    <img 
                      key={index}
                      className="reviews__star" 
                      src={isFilled ? iconStar : iconStarEmpty} 
                      alt=""
                      aria-hidden="true"
                    />
                  )
                })}
              </div>
            </div>
          </div>

          <button className="reviews__write button" type="button" onClick={openWriteReviewModal}>
            Написать отзыв
          </button>
        </div>

        {reviews.length > 0 ? (
          <>
            <ul className="reviews__list">
              {visibleReviews.map((review) => (
                <li className="reviews__item" key={review.id}>
                  <ReviewCard review={review} onOpenPhoto={openPhotoModal} />
                </li>
              ))}
            </ul>

            <PhotoGalleryModal 
              isOpen={photosModal.isOpen}
              photos={photosModal.photos}
              currentIndex={photosModal.currentIndex}
              title={photosModal.title}
              description={photosModal.description}
              onClose={closePhotoModal}
              onPrev={showPrevPhoto}
              onNext={showNextPhoto}
            />

            {hasMore && (
              <div className="reviews__more">
                <button className="reviews__more-button button" type="button" onClick={handleShowMore}>
                  <span className="reviews__more-text">Показать еще</span>
                  <svg className="reviews__more-icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M24.7031 25.722L3.22199 5.13588C2.82325 4.75375 2.80978 4.12073 3.19191 3.72199C3.57403 3.32325 4.20706 3.30978 4.6058 3.69191L26.1919 24.3786V7.44733C26.1919 6.89504 26.6396 6.44733 27.1919 6.44733C27.7442 6.44733 28.1919 6.89504 28.1919 7.44733V26.722C28.1919 27.2743 27.7442 27.722 27.1919 27.722H7.03635C6.48406 27.722 6.03635 27.2743 6.03635 26.722C6.03635 26.1697 6.48406 25.722 7.03635 25.722H24.7031Z" fill="#111111"/>
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : <p className="reviews__empty">Отзывов пока нет</p> }
      </div>

      {isWriteReviewModalOpen && (
        <WriteReviewModal onClose={closeWriteReviewModal} />
      )}
    </section>
  )
}