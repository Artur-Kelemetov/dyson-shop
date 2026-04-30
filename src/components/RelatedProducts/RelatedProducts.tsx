import { useState } from "react"
import { useProducts } from "../../hooks/useProducts"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { RelatedProductCard } from "../RelatedProductCard/RelatedProductCard"
import "./RelatedProducts.scss"

// ИСПРАВИТЬ ТИП id В ТИПЕ PRODUCTS. После этого убрать здесь String()

type RelatedProductsProps = {
  id: string
}

const SLIDE__STEP = 1

export const RelatedProducts = ({ id: currentProductId }: RelatedProductsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data: products = [], isLoading, isError } = useProducts()

  const currentProduct = products.find(
    (product) => String(product.id) === currentProductId
  )

  const relatedProducts = currentProduct 
  ? products.filter((product) => (
      product.category === currentProduct?.category && 
      String(product.id) !== currentProductId
    )) 
  : []

  const isMobile = useMediaQuery("(width <= 767.98px)")

  const visibleCardsCount = isMobile ? 2 : 3

  const canSlidePrev = currentIndex > 0
  const canSlideNext = currentIndex < relatedProducts.length - visibleCardsCount

  const handlePrevClick = () => {
    if (!canSlidePrev) return

    setCurrentIndex((prevIndex) => prevIndex - SLIDE__STEP)
  }

  const handleNextClick = () => {
    if (!canSlideNext) return

    setCurrentIndex((prevIndex) => prevIndex + SLIDE__STEP)
  }

  if (isLoading) {
    return <section className="related-products">Загрузка...</section>
  }

  if (isError || relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="related-products">
      <div className="related-products__body container">
        <div className="related-products__header">
          <h2 className="related-products__title">Похожие товары</h2>
        </div>

        <div className="related-products__slider">
          <button
              className={`related-products__button related-products__button--prev ${!canSlidePrev ? "disabled" : ""}`}
              type="button"
              onClick={handlePrevClick}
              disabled={!canSlidePrev}
              aria-label="Показать предыдущий товар"
            >
              <svg className="related-products__button-icon" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.13395 1.06L6.07295 1.90735e-06L0.29395 5.777C0.200796 5.86957 0.126867 5.97965 0.0764193 6.1009C0.0259713 6.22215 0 6.35218 0 6.4835C0 6.61483 0.0259713 6.74486 0.0764193 6.86611C0.126867 6.98736 0.200796 7.09743 0.29395 7.19L6.07295 12.97L7.13295 11.91L1.70895 6.485L7.13395 1.06Z" fill="black"/>
              </svg>
            </button>

          <div className="related-products__viewport">
            <ul 
              className="related-products__list" 
              style={{transform: `translateX(calc(-${currentIndex} * var(--slide-step)))`}}
            >
              {relatedProducts.map((product) => (
                <li className="related-products__item">
                  <RelatedProductCard 
                    id={String(product.id)}
                    title={product.title}
                    image={product.images[0] ?? ""}
                  />
                </li>
              ))}
            </ul>
          </div>

          <button
            className={`related-products__button related-products__button--next ${!canSlideNext ? "disabled" : ""}`}
            type="button"
            onClick={handleNextClick}
            disabled={!canSlideNext}
            aria-label="Показать следующий товар"
          >
            <svg className="related-products__button-icon" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M-3.91006e-05 1.06L1.06096 1.90735e-06L6.83996 5.777C6.93312 5.86957 7.00704 5.97965 7.05749 6.1009C7.10794 6.22215 7.13391 6.35218 7.13391 6.4835C7.13391 6.61483 7.10794 6.74486 7.05749 6.86611C7.00704 6.98736 6.93312 7.09743 6.83996 7.19L1.06096 12.97L0.000960827 11.91L5.42496 6.485L-3.91006e-05 1.06Z" fill="black"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}