import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "../../features/cart/cartSlice"
import { ProductMiniCard } from "../ProductMiniCard/ProductMiniCard"
import "./Cart.scss"

export const Cart = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if(!items.length) {
    return (
      <section className="cart-page">
        <div className="cart-page__inner container">
          <h1 className="cart-page__title">Корзина</h1>
          <p className="cart-page__empty">Корзина пуста</p>
        </div>
      </section>
    )
  }

  return (
    <section className="cart-page">
      <div className="cart-page__inner container">
        <div className="cart-page__top">
          <h1 className="cart-page__title">Корзина</h1>
          
          <button 
            className="cart-page__clear"
            type="button"
            onClick={() => dispatch(clearCart())}
            >
            Очистить корзину
          </button>
        </div>

        <ul className="cart-page__list">
          {items.map((item) => (
            <li className="cart-page__item" key={item.id}>
              <ProductMiniCard
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                showCounter
                showRemoveButton
                onIncrement={() => dispatch(increaseQuantity({ id: item.id }))}
                onDecrement={() => dispatch(decreaseQuantity({ id: item.id }))}
                onRemove={() => dispatch(removeFromCart(item.id))}
              />
            </li>
          ))}
        </ul>

        <div className="cart-page__summary">
          <div className="cart-page__summary-inner">
            <div className="cart-page__summary-info">
              <div className="cart-page__summary-label">Итого:</div>
              <div className="cart-page__summary-price">
                {totalPrice.toLocaleString("ru-RU")} Р
              </div>
            </div>
            
            <button className="cart-page__checkout-button" type="button">
              <svg className="cart-page__checkout-button-icon" width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 9.70703H20M20 9.70703L11 0.707031M20 9.70703L11 18.707" stroke="black" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}