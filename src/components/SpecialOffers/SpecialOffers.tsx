import { useState, useEffect, useRef } from "react"
import { CustomSelect } from "../CustomSelect/CustomSelect"
import { ProductCard } from "../ProductCard/ProductCard"
import { useProducts } from "../../hooks/useProducts"
import { Pagination } from "../Pagination/Pagination"

import "./SpecialOffers.scss"

const sortOptions = [
  { value: "popular", label: "Сначала популярные" },
  { value: "cheap", label: "Сначала дешёвые" },
  { value: "expensive", label: "Сначала дорогие" },
  { value: "new", label: "Новинки" },
  { value: "rating", label: "Высокий рейтинг" },
]

const quickFilters = [
  {
    id: "long-hair",
    label: "dyson стайлер для длинных волос",
    query: "длинных волос"
  },
  {
    id: "hs01",
    label: "dyson hs01 airwrap complete",
    query: "hs01"
  },
  {
    id: "brush",
    label: "фен щетка дайсон",
    query: "щетка"
  },
  {
    id: "red",
    label: "dyson стайлер красный",
    query: "красный"
  },
]

const PRODUCTS_PER_PAGE = 6


export const SpecialOffers = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const [sortValue, setSortValue] = useState("popular")

  const [currentPage, setCurrentPage] = useState(1)


  const { data: products = [], isLoading, isError, error } = useProducts()

  const productsWithDiscount = products.filter((product) => product.discount > 0)

  const sortedProducts = [...productsWithDiscount].sort((a, b) => {
    if (sortValue === "cheap") {
      return a.price - b.price
    }

    if (sortValue === "expensive") {
      return b.price - a.price
    }

    if (sortValue === "popular") {
      return b.popularity - a.popularity
    }

    if (sortValue === "new") {
      return Number(b.isNew) - Number(a.isNew)
    }

    if (sortValue === "rating") {
      return b.rating - a.rating
    }

    return 0
  })


  const selectedFilter = quickFilters.find((filter) => filter.id === activeFilter)

  const filteredProducts = selectedFilter 
  ? sortedProducts.filter((product) => product.title.toLocaleLowerCase().includes(selectedFilter.query.toLowerCase())) 
  : sortedProducts

  const isEmpty = filteredProducts.length === 0

  const handleFilterClick = (filterId: string) => {
    setActiveFilter((prev) => prev === filterId ? null : filterId)
    setCurrentPage(1)
  }


  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  const handleSortChange = (value: string) => {
    setSortValue(value)
    setCurrentPage(1)
  }


  const productsRef = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    productsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, [currentPage])


if (isLoading) {
  return (
    <section className="special-offers">
      <div className="special-offers__inner container">
        Загрузка...
      </div>
    </section>
  )
}

if (isError) {
  return (
    <section className="special-offers">
      <div className="special-offers__inner container">
        {error instanceof Error ? error.message : "Произошла ошибка"}
      </div>
    </section>
  )
}

  return (
    <section className="special-offers">
      <div className="special-offers__inner container">
        <header className="special-offers__header">
          <h2 className="special-offers__title">
            Спецпредложения <span className="special-offers__count">{productsWithDiscount.length}</span>
          </h2>
        </header>

        <div className="special-offers__top">
          <div className="special-offers__tags">
            {quickFilters.map((filter) => (
              <button
                key={filter.id}
                className={`special-offers__filter-button ${activeFilter === filter.id ? "is-active" : ""}`}
                type="button"
                onClick={() => handleFilterClick(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <a className="special-offers__link" href="">
            Показать еще
          </a>
        </div>

        <div className="special-offers__sort">
          <CustomSelect 
            options={sortOptions} 
            value={sortValue} 
            onChange={handleSortChange}
          />
        </div>

        <div className="special-offers__products" ref={productsRef}>
          {isEmpty ? (
            <div className="special-offers__empty">
              Ничего не найдено
            </div>
          ) : (
            <ul className="special-offers__list">
              {paginatedProducts.map((product) => (
                <li className="special-offers__item" key={product.id}>
                  <ProductCard
                    id={product.id}
                    images={product.images}
                    title={product.title} 
                    price={product.price} 
                    oldPrice={product.oldPrice} 
                    discount={product.discount}
                    isAvailable={product.isAvailable}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {!isEmpty && totalPages > 1 && (
          <footer className="special-offers__footer">
            <Pagination 
              className="special-offers__pagination"
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
            />
          </footer>
        )}
      </div>
    </section>
  )
}