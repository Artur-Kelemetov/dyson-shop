import { useState, useRef } from "react"
import { PhotoGalleryModal } from "../PhotosGalleryModal/PhotoGalleryModal"
import "./ProductMedia.scss"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useThumbnailColumn } from "../../hooks/useThumbnailColumn"

type ProductMediaProps = {
  images: string[],
  title: string,
  description: string,
  isFavourite: boolean,
  onToggleFavourite: () => void
}

type PhotoGalleryModalState = {
  photos: string[];
  currentIndex: number;
  isOpen: boolean;
  title: string;
  description: string;
}

export const ProductMedia = ({ images, title, description, isFavourite, onToggleFavourite }: ProductMediaProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [photoGalleryModal, setPhotoGalleryModal] = useState<PhotoGalleryModalState>({
    photos: [],
    currentIndex: 0,
    isOpen: false,
    title: "",
    description: ""
  })
  
  const isMobile = useMediaQuery("(max-width: 767.98px)")
  const hasMultipleImages = images.length > 1

  const {
    thumbnailStartIndex,
    thumbnailStep,
    thumbnailsViewportHeight,
    thumbnailTrackRef,
    thumbnailRefs,
    shiftThumbnailWindowOnClick,
    syncThumbnailWindow,
  } = useThumbnailColumn({ imagesLength: images.length, isMobile })
  

  const handlePrev = () => {
    const nextIndex = activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1

    setActiveImageIndex(nextIndex)
    syncThumbnailWindow(nextIndex)
  }

  const handleNext = () => {
    const nextIndex = activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1

    setActiveImageIndex(nextIndex)
    syncThumbnailWindow(nextIndex)
  }

  const handleThumbnailClick = (realIndex: number, visibleIndex: number) => {
    setActiveImageIndex(realIndex)
    shiftThumbnailWindowOnClick(visibleIndex)
  }
  

  const openPhotoModal = (photos: string[], currentIndex: number, title: string, description: string) => {
    setPhotoGalleryModal({
      photos,
      currentIndex,
      isOpen: true,
      title,
      description,
    })
  }

  const closePhotoModal = () => {
    setPhotoGalleryModal((prev) => ({
      ...prev,
      isOpen: false
    }))
  }

  const showPrevPhoto = () => {
    setPhotoGalleryModal((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.photos.length - 1 : prev.currentIndex - 1
    }))
  }

  const showNextPhoto = () => {
    setPhotoGalleryModal((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === prev.photos.length - 1 ? 0 : prev.currentIndex + 1
    }))
  }


  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const goToPrev = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
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

  const handleDotClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault()
    event.stopPropagation()

    setActiveImageIndex(index)
  }


  if (!images.length) {
    return (
      <div className="product-media">
        <div className="product-media__body">Нет картинок</div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <>
        <div className="product-media product-media--mobile">
          <div className="product-media__mobile-slider">
            <div 
              className="product-media__mobile-viewport" 
              onTouchStart={hasMultipleImages ? handleTouchStart : undefined}
              onTouchMove={hasMultipleImages ? handleTouchMove : undefined}
              onTouchEnd={hasMultipleImages ? handleTouchEnd : undefined}
            >
              <div className="product-media__mobile-track" style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}>
                {images.map((image, index) => (
                  <div className="product-media__mobile-slide" key={index}>
                    <button
                      className="product-media__mobile-image-button"
                      type="button"
                      onClick={() => openPhotoModal(images, index, title, description)}
                    >
                      <img className="product-media__mobile-image" src={image} alt={index === activeImageIndex ? title : ""} />
                    </button>

                    <button 
                      className={`product-media__mobile-favourite-button ${isFavourite ? "is-active" : ""}`}
                      type="button"
                      aria-label={isFavourite ? "Удалить из избранного" : "Добавить в избранное"}
                      onClick={onToggleFavourite}
                    >
                      <svg className="product-media__mobile-favourite-icon" width="46" height="41" viewBox="0 0 46 41" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.465 39.4817L4.41503 21.727C-0.387451 16.7261 -0.0850275 8.52614 5.07164 3.92347C10.1874 -0.642742 17.9443 0.243945 21.987 5.85704L22.6667 6.80069L23.3463 5.85704C27.3891 0.243945 35.1458 -0.642742 40.2617 3.92347C45.4184 8.52614 45.7209 16.7261 40.9182 21.727L23.8683 39.4817C23.2046 40.1727 22.1287 40.1727 21.465 39.4817Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {hasMultipleImages && (
              <div className="product-media__mobile-pagination">
                {images.map((_, index) => (
                  <button 
                    className={`product-media__mobile-dot ${index === activeImageIndex ? "is-active" : ""}`}
                    key={index}
                    type="button"
                    aria-label={`Перейти к изображению ${index + 1}`}
                    onClick={(event) => handleDotClick(event, index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <PhotoGalleryModal 
          isOpen={photoGalleryModal.isOpen}
          photos={photoGalleryModal.photos}
          currentIndex={photoGalleryModal.currentIndex}
          title={photoGalleryModal.title}
          description={photoGalleryModal.description}
          onClose={closePhotoModal}
          onPrev={showPrevPhoto}
          onNext={showNextPhoto}
        />
      </>
    )
  }

  return (
    <>
      <div className="product-media">
        <div className="product-media__body">
          <div 
            className="product-media__thumbnails" 
            aria-label="Миниатюры товара" 
            style={{ height: thumbnailsViewportHeight > 0 ? `${thumbnailsViewportHeight}px` : undefined }}
          >
            <div 
              className="product-media__thumbnails-track" 
              ref={thumbnailTrackRef}
              style={{ transform: thumbnailStep > 0 ? `translateY(-${thumbnailStartIndex * thumbnailStep}px)` : undefined }}
            >
              {images.map((image, index) => {
                const visibleIndex = index - thumbnailStartIndex

                return (
                  <button 
                    className={`product-media__thumbnail ${index === activeImageIndex ? "is-active" : ""}`}
                    key={index}
                    type="button"
                    aria-label={`Показать изображение ${index + 1}`}
                    onClick={() => handleThumbnailClick(index, visibleIndex)}
                    ref={(element) => {
                      thumbnailRefs.current[index] = element
                    }}
                  >
                    <img 
                      className="product-media__thumbnail-image"
                      src={image} 
                      alt=""
                      loading="lazy"
                    />
                  </button>
                )
              })}
              </div>
          </div>

          <div className="product-media__main">
            <div className="product-media__viewer">
              <button 
                className={`product-media__favourite-button ${isFavourite ? "is-active" : ""}`}
                type="button"
                aria-label={isFavourite ? "Удалить из избранного" : "Добавить в избранное"}
                onClick={onToggleFavourite}
              >
                <svg className="product-media__favourite-icon" width="46" height="41" viewBox="0 0 46 41" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.465 39.4817L4.41503 21.727C-0.387451 16.7261 -0.0850275 8.52614 5.07164 3.92347C10.1874 -0.642742 17.9443 0.243945 21.987 5.85704L22.6667 6.80069L23.3463 5.85704C27.3891 0.243945 35.1458 -0.642742 40.2617 3.92347C45.4184 8.52614 45.7209 16.7261 40.9182 21.727L23.8683 39.4817C23.2046 40.1727 22.1287 40.1727 21.465 39.4817Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="product-media__viewport">
                <div 
                  className="product-media__track"
                  style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                >
                  {images.map((image, index) => (
                    <div className="product-media__slide" key={index}>
                      <button 
                        className="product-media__main-image-button"
                        type="button"
                        onClick={() => openPhotoModal(images, activeImageIndex, title, description)}
                      >
                        <img 
                        className="product-media__main-image" 
                        src={image} 
                        alt={index === activeImageIndex ? title : ""}
                      />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
                
              {hasMultipleImages && (
                <>
                  <button 
                    className="product-media__button product-media__button--prev"
                    type="button"
                    aria-label="Предыдущее изображение"
                    onClick={handlePrev}
                  >
                    <svg width="16" height="30" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.9035 0.37609C14.348 -0.147181 13.4735 -0.121042 12.9502 0.434471L0.376139 13.7833C-0.117561 14.3075 -0.126049 15.1228 0.356637 15.6571L12.8948 29.5356C13.4064 30.1019 14.2802 30.1463 14.8465 29.6347C15.4128 29.1231 15.4571 28.2493 14.9455 27.683L3.26188 14.7504L14.9619 2.3294C15.4852 1.77389 15.459 0.899362 14.9035 0.37609Z" fill="#ABABAB"/>
                    </svg>
                  </button>
              
                  <button 
                    className="product-media__button product-media__button--next"
                    type="button"
                    aria-label="Следующее изображение"
                    onClick={handleNext}
                  >
                    <svg width="16" height="30" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.434369 0.37609C0.989884 -0.147181 1.86441 -0.121042 2.38768 0.434471L14.9618 13.7833C15.4555 14.3075 15.4639 15.1228 14.9813 15.6571L2.44305 29.5356C1.93145 30.1019 1.05766 30.1463 0.491372 29.6347C-0.074913 29.1231 -0.119247 28.2493 0.392351 27.683L12.076 14.7504L0.375988 2.3294C-0.147282 1.77389 -0.121146 0.899362 0.434369 0.37609Z" fill="#ABABAB"/>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <PhotoGalleryModal
        isOpen={photoGalleryModal.isOpen}
        photos={photoGalleryModal.photos}
        currentIndex={photoGalleryModal.currentIndex}
        title={photoGalleryModal.title}
        description={photoGalleryModal.description}
        onClose={closePhotoModal}
        onPrev={showPrevPhoto}
        onNext={showNextPhoto}
      />
    </>
  )
}