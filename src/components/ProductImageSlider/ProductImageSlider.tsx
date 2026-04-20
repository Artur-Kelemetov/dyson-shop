import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import "./ProductImageSlider.scss"

type ProductImageSliderProps = {
  id: number
  images: string[],
  alt: string,
  className?: string
  onImageClick?: (index: number) => void
  disableLink?: boolean
  showDots?: boolean
}

export const ProductImageSlider = ({ id, images, alt, className }: ProductImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const hasMultipleImages = images.length > 1

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handlePrev = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    goToPrev()
  }

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    goToNext()
  }

  const handleDotClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault()
    event.stopPropagation()

    setCurrentIndex(index)
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX
    touchEndX.current = null
  }
  
  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return

    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      goToNext()
    }

    if (distance < -minSwipeDistance) {
      goToPrev()
    }

    touchStartX.current = null
    touchEndX.current = null
  }


  if (!images.length) {
    return (
      <div className="product-image-slider product-image-slider--empty">
        <div className="product-image-slider__placeholder">No image</div>
      </div>
    )
  }

  return (
    <div className={`product-image-slider ${className ?? ""}`}>
      <div 
        className="product-image-slider__viewport"
        onTouchStart={hasMultipleImages ? handleTouchStart : undefined}
        onTouchMove={hasMultipleImages ? handleTouchMove : undefined}
        onTouchEnd={hasMultipleImages ? handleTouchEnd : undefined}
      >
        <div className="product-image-slider__track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <Link to={`/product/${id}`} key={index} className="product-image-slider__image-link">
              <img 
                className="product-image-slider__image" 
                src={image} 
                alt={alt} 
                loading="lazy"
              />
            </Link>
          ))}
        </div>

        {hasMultipleImages && (
          <>
            <button 
              className="product-image-slider__button product-image-slider__button--prev"
              type="button"
              aria-label="Previous image"
              onClick={handlePrev}>
              <svg className="product-image-slider__button-icon" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.13395 1.06L6.07295 1.90735e-06L0.29395 5.777C0.200796 5.86957 0.126867 5.97965 0.0764193 6.1009C0.0259713 6.22215 0 6.35218 0 6.4835C0 6.61483 0.0259713 6.74486 0.0764193 6.86611C0.126867 6.98736 0.200796 7.09743 0.29395 7.19L6.07295 12.97L7.13295 11.91L1.70895 6.485L7.13395 1.06Z" fill="black"/>
              </svg>
            </button>

            <button 
              className="product-image-slider__button product-image-slider__button--next"
              type="button"
              aria-label="Next image"
              onClick={handleNext}>
              <svg className="product-image-slider__button-icon" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-3.91006e-05 1.06L1.06096 1.90735e-06L6.83996 5.777C6.93312 5.86957 7.00704 5.97965 7.05749 6.1009C7.10794 6.22215 7.13391 6.35218 7.13391 6.4835C7.13391 6.61483 7.10794 6.74486 7.05749 6.86611C7.00704 6.98736 6.93312 7.09743 6.83996 7.19L1.06096 12.97L0.000960827 11.91L5.42496 6.485L-3.91006e-05 1.06Z" fill="black"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="product-image-slider__pagination">
          {images.map((_, index) => (
            <button 
              className={`product-image-slider__dot ${index === currentIndex ? "is-active" : ""}`}
              key={index}
              type="button"
              aria-label={`Go to image ${index + 1}`}
              onClick={(event) => handleDotClick(event, index)}
            >
            </button>
          ))}
        </div>
      )}
    </div>
  )
}