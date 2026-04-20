import { useState } from "react"
import { useAppDispatch } from "../../store/hooks"
import { addToCart } from "../../features/cart/cartSlice"
import { Link } from "react-router-dom"
import { ProductImageSlider } from "../ProductImageSlider/ProductImageSlider"
import "./ProductCard.scss"

type ProductCardProps = {
  id: number,
  images: string[],
  title: string,
  price: number,
  oldPrice: number,
  discount: number,
  isAvailable?: boolean
}

export const ProductCard = ({ id, images, title, price, oldPrice, discount, isAvailable, }: ProductCardProps) => {
  const dispatch = useAppDispatch()

  const [quantity, setQuantity] = useState(1)

  const hasDiscount = discount !== 0

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleAddToCart = () => {
    if (!isAvailable) return

    dispatch(addToCart({ id, title, price, image: images[0] ?? "", quantity }))
  }



  return (
    <article className="product-card">
      <ProductImageSlider id={id} images={images} alt={title} className="product-card__slider"/>
      <div className="product-card__content">
        <h3 className="product-card__title">
          <Link to={`/product/${id}`} className="product-card__title-link">
            {title}
          </Link>
        </h3>
        <div className="product-card__meta">
          <div className={`product-card__availability ${!isAvailable ? "is-unavailable" : ""}`}>
            <span className="product-card__availability-dot" aria-hidden="true">
              <svg className="product-card__availability-icon" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6.5" cy="6.5" r="6.5" fill="currentColor"/>
              </svg>
            </span>
            <span className="product-card__availability-text">{isAvailable ? "В наличии" : "Нет в наличии"}</span> 
          </div>
          {hasDiscount && (
            <span className="product-card__discount">-{discount}%</span>
          )}
        </div>

        <div className="product-card__pricing">
          <span className="product-card__price">{price.toLocaleString("ru-RU")}Р</span>
          {hasDiscount && (
            <span className="product-card__old-price">{oldPrice.toLocaleString("ru-RU")} Р</span>
          )}
        </div>
      </div>

      <div className="product-card__actions">
        <div className={`product-card__counter ${!isAvailable ? "is-disabled" : ""}`}>
          <button className="product-card__counter-button" type="button" aria-label="Уменьшить количество" onClick={handleDecrease} disabled={!isAvailable || quantity === 1}>
            <svg className="product-card__counter-button-minus" width="20" height="2" viewBox="0 0 20 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 1H1" stroke="#111111" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <span className="product-card__counter-value">{quantity}</span>

          <button className="product-card__counter-button" type="button" aria-label="Увеличить количество" onClick={handleIncrease} disabled={!isAvailable}>
            <svg className="product-card__counter-button-plus" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0003 19L10.0346 10M10.0003 1L10.0346 10M10.0346 10H19M10.0346 10H0.999999" stroke="#111111" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <button className={`product-card__cart-button button ${!isAvailable ? "is-disabled" : ""}`} type="button" onClick={handleAddToCart} disabled={!isAvailable}>
            {isAvailable ? "В корзину" : "Нет в наличии"}
        </button>
      </div>
    </article>
  )
}