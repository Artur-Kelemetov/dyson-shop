import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { ProductMedia } from "../ProductMedia/ProductMedia";
import "./ProductHero.scss"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart } from "../../features/cart/cartSlice";
import { toggleFavourite } from "../../features/favourites/favouritesSlice";

type ProductHeroProps = {
  id: string
}

const SHORT_DESCRIPTION_LENGTH_DESKTOP = 285
const SHORT_DESCRIPTION_LENGTH_MOBILE = 145

export const ProductHero = ({ id }: ProductHeroProps) => {
  const [quantity, setQuantity] = useState(1)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const { data: products = [], isLoading, isError, error } = useProducts()

  const dispatch = useAppDispatch()
  const favouriteItems = useAppSelector((state) => state.favourites.items)
  
  const product = products.find((item) => String(item.id) === id)

  const isMobile = useMediaQuery("(max-width: 767.98px)")


  if (isLoading) {
    return (
    <section className="product-hero">
      <div className="product-hero__body container">
        Загрузка...
      </div>
    </section>
  )
  }

  if (isError) {
    return (
    <section className="product-hero">
      <div className="product-hero__body container">
        {error instanceof Error ? error.message : "Произошла ошибка"}
      </div>
    </section>
  )
  }

  if (!product) {
    return (
    <section className="product-hero">
      <div className="product-hero__body container">
        Товар не найден
      </div>
    </section>
  )
  }

  const {
    id: productId,
    title,
    description,
    price,
    oldPrice,
    isAvailable,
    images
  } = product

  const isFavourite = favouriteItems.some((item) => item.id === productId)

  const hasOldPrice = Boolean(oldPrice && oldPrice > price)

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleAddToCart = () => {
    if (!isAvailable) return

    dispatch(addToCart({ id: productId, title, price, image: images[0] ?? "", quantity }))
  }

  const handleToggleFavourite = () => {
    dispatch(toggleFavourite({
      id: productId,
      title,
      price,
      images,
    }))
  }
  
  const shortDescriptionLength = isMobile ? SHORT_DESCRIPTION_LENGTH_MOBILE : SHORT_DESCRIPTION_LENGTH_DESKTOP

  const isLongDescription = description.length > shortDescriptionLength
  
  const visibleDescription = !isDescriptionExpanded && isLongDescription 
    ? `${description.slice(0, shortDescriptionLength).trim()}...`
    : description

  return (
    <section className="product-hero">
      <div className="product-hero__body container">
        <Breadcrumbs 
          className={"product-hero__breadcrumbs"}
          currentLabel={title}
        />

        <div className="product-hero__inner">
          <ProductMedia 
            images={images} 
            title={title}
            description={description}
            isFavourite={isFavourite}
            onToggleFavourite={handleToggleFavourite}
          />
          <div className="product-hero__content">
            <div className="product-hero__top">
              <h1 className="product-hero__title">{title}</h1>

              <p className="product-hero__description">
                {visibleDescription}
              </p>
              {isLongDescription && (
                <button 
                  className="product-hero__description-toggle"
                  type="button"
                  onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                >
                  {isDescriptionExpanded ? "Скрыть описание" : "Показать описание"}
                </button>
              )

              }
            </div>

            <div className={`product-hero__availability ${!isAvailable ? "is-unavailable" : ""}`}>
              <span className="product-hero__availability-dot" aria-hidden="true">
                <svg className="product-hero__availability-icon" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6.5" cy="6.5" r="6.5" fill="currentColor"/>
                </svg>
              </span>
              <span className="product-hero__availability-text">{isAvailable ? "В наличии" : "Нет в наличии"}</span> 
            </div>

            <div className="product-hero__price-row">
              <div className="product-hero__pricing">
                {hasOldPrice && (
                <span className="product-hero__old-price">{oldPrice.toLocaleString("ru-RU")} Р</span>
              )}
              <span className="product-hero__price">{price.toLocaleString("ru-RU")} Р</span>
              </div>
            
              <button 
                className={`product-hero__favourite-button ${isFavourite ? "is-active" : ""} `}
                type="button"
                aria-label={isFavourite ? "Удалить из избранного" : "Добавить в избранное"}
                onClick={handleToggleFavourite}
              >
                <svg className={"product-hero__favourite-icon"} width="46" height="41" viewBox="0 0 46 41" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.465 39.4817L4.41503 21.727C-0.387451 16.7261 -0.0850275 8.52614 5.07164 3.92347C10.1874 -0.642742 17.9443 0.243945 21.987 5.85704L22.6667 6.80069L23.3463 5.85704C27.3891 0.243945 35.1458 -0.642742 40.2617 3.92347C45.4184 8.52614 45.7209 16.7261 40.9182 21.727L23.8683 39.4817C23.2046 40.1727 22.1287 40.1727 21.465 39.4817Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="product-hero__actions">
              <div className={`product-hero__counter ${!isAvailable ? "is-disabled" : ""}`}>
                <button className="product-hero__counter-button" type="button" aria-label="Уменьшить количество" onClick={handleDecrease} disabled={!isAvailable || quantity === 1}>
                  <svg className="product-hero__counter-button-minus" width="20" height="2" viewBox="0 0 20 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 1H1" stroke="#111111" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>

                <span className="product-hero__counter-value">{quantity}</span>

                <button className="product-hero__counter-button" type="button" aria-label="Увеличить количество" onClick={handleIncrease} disabled={!isAvailable}>
                  <svg className="product-hero__counter-button-plus" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0003 19L10.0346 10M10.0003 1L10.0346 10M10.0346 10H19M10.0346 10H0.999999" stroke="#111111" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>

              <button className={`product-hero__cart-button button ${!isAvailable ? "is-disabled" : ""}`} type="button" onClick={handleAddToCart} disabled={!isAvailable}>
                <div className="product-hero__cart-button-text">
                  {isAvailable ? "В корзину" : "Нет в наличии"}
                </div>
                <svg className="product-hero__cart-button-icon" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 13.5C4.5 11.8431 5.84314 10.5 7.5 10.5H28.5C30.1569 10.5 31.5 11.8431 31.5 13.5V30C31.5 31.6569 30.1569 33 28.5 33H7.5C5.84314 33 4.5 31.6569 4.5 30V13.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 15V9C12 5.68629 14.6863 3 18 3C21.3137 3 24 5.68629 24 9V14.5332" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}