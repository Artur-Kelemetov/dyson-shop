import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { clearFavourites, removeFromFavourites } from "../../features/favourites/favouritesSlice"
import { ProductMiniCard } from "../ProductMiniCard/ProductMiniCard"
import "./Favourites.scss"

export const Favourites = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.favourites.items)

  if(!items.length) {
    return (
      <section className="favourite-page">
        <div className="favourite-page__inner container">
          <h1 className="favourite-page__title">Избранное</h1>
          <p className="favourite-page__empty">В избранном пока нет товаров</p>
        </div>
      </section>
    )
  }

  return (
    <section className="favourite-page">
      <div className="favourite-page__inner container">
        <div className="favourite-page__top">
          <h1 className="favourite-page__title">Избранное</h1>
          
          <button 
            className="favourite-page__clear"
            type="button"
            onClick={() => dispatch(clearFavourites())}
            >
            Очистить избранное
          </button>
        </div>

        <ul className="favourite-page__list">
          {items.map((item) => {
            const image = item.images[0]
            return (
              <li className="favourite-page__item" key={item.id}>
              <ProductMiniCard
                id={item.id}
                title={item.title}
                price={item.price}
                image={image}
                showCounter={false}
                showRemoveButton
                onRemove={() => dispatch(removeFromFavourites(item.id))}
              />
            </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}