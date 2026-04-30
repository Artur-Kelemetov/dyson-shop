import { Link } from "react-router-dom"
import "./RelatedProductCard.scss"

type RelatedProductCard = {
  id: string
  title: string
  image: string
}

export const RelatedProductCard = ({ id, title, image }: RelatedProductCard) => {
  return (
    <Link className="related-product-card" to={`/product/${id}`}>
      <div className="related-product-card__image-wrapper">
        <img className="related-product-card__image" 
          src={image} 
          alt={title}
          loading="lazy"
        />
      </div>

      <div className="related-product-card__content">
        <h3 className="related-product-card__title">
          {title}
        </h3>
      </div>
    </Link>
  )
}