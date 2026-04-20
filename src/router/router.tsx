import { createBrowserRouter} from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout/MainLayout'
import { HomePage } from '../pages/HomePage/HomePage'
import { CatalogPage } from '../pages/CatalogPage/CatalogPage'
import { ProductPage } from '../pages/ProductPage/ProductPage'
import { FavouritesPage } from '../pages/FavoritesPage/FavouritesPage'
import { CartPage } from '../pages/CartPage/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage/CheckoutPage'
import { AccountPage } from '../pages/AccountPage/AccountPage'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    handle: {
      breadcrumb: "Главная"
    },
    children: [
      { index: true, element: <HomePage />}, 
      { 
        path: 'catalog', 
        element: <CatalogPage />, 
        handle: {
          breadcrumb: "Каталог"
        },
      },
      { path: 'product/:id', 
        element: <ProductPage />,
        handle: {
          breadcrumb: "Товар"
        },
      },
      { 
        path: 'favourites', 
        element: <FavouritesPage />,
        handle: {
          breadcrumb: "Избранное"
        },
      },
      { 
        path: 'cart', 
        element: <CartPage />,
        handle: {
          breadcrumb: "Корзина"
        },
      },
      { path: 'checkout', element: <CheckoutPage /> },
      { 
        path: 'account', 
        element: <AccountPage />,
        handle: {
          breadcrumb: "Аккаунт"
        },
      },
    ],
  },
])