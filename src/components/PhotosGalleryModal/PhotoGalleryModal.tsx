import { useEffect } from "react";
import "./PhotoGalleryModal.scss"

type PhotoGalleryModalProps = {
  isOpen: boolean,
  photos: string[],
  currentIndex: number,
  title?: string,
  description?: string,
  onClose: () => void,
  onPrev: () => void,
  onNext: () => void,
}

const DESCRIPTION_MAX_LENGTH = 240

export const PhotoGalleryModal = ({ isOpen, photos, currentIndex, title, description, onClose, onPrev, onNext }: PhotoGalleryModalProps) => {
  useEffect(() => {
    if(!isOpen) return
  

  const handleKeyDown = (event: KeyboardEvent) => {
    if(event.key === "Escape") {
      onClose()
    }

    if(event.key === "ArrowLeft") {
      onPrev()
    }

    if(event.key === "ArrowRight") {
      onNext()
    }
  }

  document.addEventListener("keydown", handleKeyDown)

  return () => {
    document.removeEventListener("keydown", handleKeyDown)
  } 
  }, [isOpen, onClose, onPrev, onNext])

  useEffect(() => {
    if(!isOpen) {
      document.body.style.overflow = ""
      return
    }

    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if(!isOpen || photos.length === 0) {
    return null
  }

  const currentImage = photos[currentIndex]

  const visibleDescription = 
    description && description.length > DESCRIPTION_MAX_LENGTH 
      ? `${description.slice(0, DESCRIPTION_MAX_LENGTH).trim()}...`
      : description

  return (
    <div className="photo-gallery-modal" onClick={onClose}>
      <div className="photo-gallery-modal__window" onClick={(event) => event.stopPropagation()}>
        <div className="photo-gallery-modal__content">
          <div className="photo-gallery-modal__media">
            <button 
              className="photo-gallery-modal__close-button" 
              type="button"
              onClick={onClose} 
              aria-label="Закрыть галерею">
              <svg className="photo-gallery-modal__close-button-icon" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M25.1276 2.35867C25.6673 1.81904 25.6673 0.94412 25.1276 0.404487C24.588 -0.135147 23.7131 -0.135147 23.1734 0.404486L12.7666 10.8113L2.35976 0.404486C1.82012 -0.135148 0.945205 -0.135147 0.405572 0.404487C-0.134061 0.94412 -0.134062 1.81904 0.405572 2.35867L10.8124 12.7655L0.404567 23.1734C-0.135066 23.713 -0.135065 24.5879 0.404569 25.1275C0.944202 25.6672 1.81912 25.6672 2.35875 25.1276L12.7666 14.7197L23.1745 25.1275C23.7141 25.6672 24.589 25.6672 25.1286 25.1275C25.6683 24.5879 25.6683 23.713 25.1286 23.1734L14.7208 12.7655L25.1276 2.35867Z" fill="#ABABAB"/>
              </svg>
            </button>

            <div className="photo-gallery-modal__counter">
              {currentIndex + 1} / {photos.length}
            </div>

            {photos.length > 1 && (
              <button 
                className="photo-gallery-modal__nav-button photo-gallery-modal__nav-button--prev"
                type="button"
                onClick={onPrev} 
                aria-label="Предыдущее изображение"
                >
                <svg className="photo-gallery-modal__nav-button-icon" width="16" height="30" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9035 0.37609C14.348 -0.147181 13.4735 -0.121042 12.9502 0.434471L0.376139 13.7833C-0.117561 14.3075 -0.126049 15.1228 0.356637 15.6571L12.8948 29.5356C13.4064 30.1019 14.2802 30.1463 14.8465 29.6347C15.4128 29.1231 15.4571 28.2493 14.9455 27.683L3.26188 14.7504L14.9619 2.3294C15.4852 1.77389 15.459 0.899362 14.9035 0.37609Z" fill="#ABABAB"/>
                </svg>
              </button>
            )}


            <img 
              className="photo-gallery-modal__image" 
              src={currentImage} 
              alt={`Фото отзыва ${currentIndex + 1}`} 
            />

            {photos.length > 1 && (
              <button 
                className="photo-gallery-modal__nav-button photo-gallery-modal__nav-button--next"
                type="button"
                onClick={onNext} 
                aria-label="Следующее изображение"
                >
                <svg className="photo-gallery-modal__nav-button-icon" width="16" height="30" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.434369 0.37609C0.989884 -0.147181 1.86441 -0.121042 2.38768 0.434471L14.9618 13.7833C15.4555 14.3075 15.4639 15.1228 14.9813 15.6571L2.44305 29.5356C1.93145 30.1019 1.05766 30.1463 0.491372 29.6347C-0.074913 29.1231 -0.119247 28.2493 0.392351 27.683L12.076 14.7504L0.375988 2.3294C-0.147282 1.77389 -0.121146 0.899362 0.434369 0.37609Z" fill="#ABABAB"/>
                </svg>
              </button>
            )}
          </div>

          <div className="photo-gallery-modal__info">
            <div className="photo-gallery-modal__author">{title}</div>
            <p className="photo-gallery-modal__comment">{visibleDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}