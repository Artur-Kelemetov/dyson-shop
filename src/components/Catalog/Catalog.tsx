import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { CustomSelect } from "../CustomSelect/CustomSelect"
import { ProductCard } from "../ProductCard/ProductCard"
import { useProducts } from "../../hooks/useProducts"
import { Pagination } from "../Pagination/Pagination"
import { Filters } from "../Filters/Filters"
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs"
import type { FiltersState } from "../../types/filtersState"
import "./Catalog.scss"


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

const PRODUCTS_PER_PAGE = 12


export const Catalog = () => {
  const { data: products = [], isLoading, isError, error } = useProducts()

  const [searchParams, setSearchParams] = useSearchParams()

  const activeFilter = searchParams.get("quickFilter")
  const sortValue = searchParams.get("sort") ?? "popular"
  const currentPage = Number(searchParams.get("page") ?? "1")

  const minPriceLimit = products.length ? Math.min(...products.map((product) => product.price)) : 0
  const maxPriceLimit = products.length ? Math.max(...products.map((product) => product.price)) : 0

  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const filters: FiltersState = {
    categories: searchParams.getAll("category"),
    priceFrom: Number(searchParams.get("priceFrom") ?? minPriceLimit),
    priceTo: Number(searchParams.get("priceTo") ?? maxPriceLimit),
    isNew: searchParams.get("isNew") === "true",
    isAvailable: searchParams.get("isAvailable") === "true",
    hasDiscount: searchParams.get("hasDiscount") === "true",
  }

  const updateSearchParams = (updates: Record<string, string | string[] | null>) => {
    const params = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      params.delete(key)

      if (value === null) return

      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item))
        return
      }

      params.set(key, value)
    })

    setSearchParams(params)
  }

  const handleToggleFilters = () => {
    setIsFiltersOpen((prev) => !prev)
  }

  const handleCloseFilters = () => {
    setIsFiltersOpen(false)
  }

  const handleCategoryChange = (value: string) => {
    const nextCategories = filters.categories.includes(value) 
    ? filters.categories.filter((category) => category !== value) 
    : [...filters.categories, value]

    updateSearchParams({ 
      category: nextCategories,
      page: null, 
    })
  }

  const handlePriceFromChange = (value: number) => {
    const nextPriceFrom = Math.min(value, filters.priceTo)

    updateSearchParams({ 
      priceFrom: nextPriceFrom === minPriceLimit ? null : String(nextPriceFrom),
      page: null, 
    })
  }

  const handlePriceToChange = (value: number) => {
    const nextPriceTo = Math.max(value, filters.priceFrom)

    updateSearchParams({ 
      priceTo: nextPriceTo === maxPriceLimit ? null : String(nextPriceTo),
      page: null,
    })
  }

  const handleCheckboxChange = (name: "isNew" | "isAvailable" | "hasDiscount") => {
    updateSearchParams({ 
      [name]: filters[name] ? null : "true",
      page: null, 
    })
  }

  const handleResetFilters = () => {
    updateSearchParams({ 
      category: null,
      priceFrom: null,
      priceTo: null,
      isNew: null,
      isAvailable: null,
      hasDiscount: null,
      page: null 
    })
  }


const sortedProducts = [...products].sort((a, b) => {
  if (sortValue === "cheap") {
    const result = a.price - b.price
    return result !== 0 ? result : a.id - b.id
  }

  if (sortValue === "expensive") {
    const result = b.price - a.price
    return result !== 0 ? result : a.id - b.id
  }

  if (sortValue === "popular") {
    const result = b.popularity - a.popularity
    return result !== 0 ? result : a.id - b.id
  }

  if (sortValue === "new") {
    const result = Number(b.isNew) - Number(a.isNew)
    return result !== 0 ? result : a.id - b.id
  }

  if (sortValue === "rating") {
    const result = b.rating - a.rating
    return result !== 0 ? result : a.id - b.id
  }

  return a.id - b.id
})

  const activeQuickFilter = quickFilters.find((filter) => filter.id === activeFilter)

  const filteredProducts = sortedProducts.filter((product) => {
    const matchesQuickFilter = !activeQuickFilter || product.title.toLowerCase().includes(activeQuickFilter.query.toLowerCase())

    const matchesCategory = filters.categories.length  === 0 || filters.categories.includes(product.category)

    const matchesPrice = product.price >= filters.priceFrom && product.price <= filters.priceTo

    const matchesNew = !filters.isNew || product.isNew

    const matchesAvailable = !filters.isAvailable || product.isAvailable

    const matchesDiscount = !filters.hasDiscount || product.discount > 0

    return (
      matchesQuickFilter &&
      matchesCategory &&
      matchesPrice &&
      matchesNew &&
      matchesAvailable &&
      matchesDiscount
    )
  })

  const isEmpty = filteredProducts.length === 0

  const handleFilterClick = (filterId: string) => {
    updateSearchParams({ 
      quickFilter: activeFilter === filterId ? null : filterId,
      page: null
    })
  }


  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    shouldScrollRef.current = true
    updateSearchParams({ page: String(Math.max(currentPage - 1, 1)) })
  }

  const handleNextPage = () => {
    shouldScrollRef.current = true
    updateSearchParams({ page: String(Math.min(currentPage + 1, totalPages)) })
  }

  const handleSortChange = (value: string) => {
    updateSearchParams({
      sort: value === "popular" ? null : value,
      page: null
    })
  }

  const catalogRef = useRef<HTMLElement | null>(null)

  const shouldScrollRef = useRef(false)

  useLayoutEffect(() => {
    if (!shouldScrollRef.current) return

    catalogRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

  shouldScrollRef.current = false
}, [currentPage])


if (isLoading) {
  return (
    <section className="catalog">
      <div className="catalog__inner container">
        Загрузка...
      </div>
    </section>
  )
}

if (isError) {
  return (
    <section className="catalog">
      <div className="catalog__inner container">
        {error instanceof Error ? error.message : "Произошла ошибка"}
      </div>
    </section>
  )
}

  return (
    <section className="catalog">
      <div className="catalog__inner container">
        <Breadcrumbs className="catalog__breadcrumbs"/>

        <header className="catalog__header" ref={catalogRef}>
          <h2 className="catalog__title">
            Каталог <span className="catalog__count">{products.length}</span>
          </h2>
        </header>

        <div className="catalog__top">
          <div className="catalog__tags">
            {quickFilters.map((filter) => (
              <button
                key={filter.id}
                className={`catalog__filter-button ${activeFilter === filter.id ? "is-active" : ""}`}
                type="button"
                onClick={() => handleFilterClick(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <a className="catalog__link" href="">
            Показать еще
          </a>
        </div>
        
        <div className="catalog__controls">
          <div className="catalog__filters">
            <Filters 
              isOpen={isFiltersOpen}
              onToggle={handleToggleFilters}
              onClose={handleCloseFilters}
              filters={filters}
              minPriceLimit={minPriceLimit}
              maxPriceLimit={maxPriceLimit}
              onCategoryChange={handleCategoryChange}
              onPriceFromChange={handlePriceFromChange}
              onPriceToChange={handlePriceToChange}
              onCheckboxChange={handleCheckboxChange}
              onReset={handleResetFilters}
            />
          </div>

          <div className="catalog__sort">
            <CustomSelect 
              options={sortOptions} 
              value={sortValue} 
              onChange={handleSortChange}
            />
          </div>
        </div>
        <div className="catalog__products">
          {isEmpty ? (
            <div className="catalog__empty">
              Ничего не найдено
            </div>
          ) : (
            <ul className="catalog__list">
              {paginatedProducts.map((product) => (
                <li className="catalog__item" key={product.id}>
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
          <footer className="catalog__footer">
            <Pagination 
              className="catalog__pagination"
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