import { Link } from "react-router-dom"
import "./ProductMiniCard.scss"

type ProductMiniCardProps = {
  id: number
  title: string
  price: number
  image: string
  quantity?: number
  showCounter?: boolean
  showRemoveButton?: boolean
  onIncrement?: () => void
  onDecrement?: () => void
  onRemove?: () => void
}


export const ProductMiniCard = ({ 
  id,
  title,
  price,
  image,
  quantity = 1,
  showCounter = false,
  showRemoveButton = false,
  onIncrement,
  onDecrement,
  onRemove,
}: ProductMiniCardProps) => {

  return (
    <article className="product-mini-card">
      <Link to={`/product/${id}`} className="product-mini-card__image-link">
        <img className="product-mini-card__image" src={image} alt={title} />
      </Link>

      <div className="product-mini-card__body">
        <h2 className="product-mini-card__title">
          <Link to={`/product/${id}`} className="product-mini-card__title-link">
            {title}
          </Link>
        </h2>

        {showCounter && (
          <div className="product-mini-card__controls">
          <button
            className="product-mini-card__control-button"
            type="button"
            aria-label="Уменьшить количество"
            onClick={onDecrement}
            >
            <svg className="product-mini-card__counter-button-minus" width="20" height="2" viewBox="0 0 20 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 1H1" stroke="#111111" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <span className="product-mini-card__quantity">{quantity}</span>

          <button
            className="product-mini-card__control-button"
            type="button"
            aria-label="Увеличить количество"
            onClick={onIncrement}
          >
            <svg className="product-mini-card__counter-button-plus" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0003 19L10.0346 10M10.0003 1L10.0346 10M10.0346 10H19M10.0346 10H0.999999" stroke="#111111" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        )}

        <div className="product-mini-card__price">
          {(price * quantity).toLocaleString("ru-RU")} Р
        </div>

        {showRemoveButton && (
          <button 
          className="product-mini-card__remove"
          type="button"
          onClick={onRemove}
          >
          Удалить
        </button>
        )}
      </div>
    </article>
  )
}