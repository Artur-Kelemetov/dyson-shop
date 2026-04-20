import { useEffect, useRef } from "react"
import type { FiltersState } from "../../types/filtersState"
import "./Filters.scss"

type FiltersProps = {
  isOpen: boolean,
  onToggle: () => void,
  onClose: () => void,
  filters: FiltersState,
  minPriceLimit: number,
  maxPriceLimit: number,
  onCategoryChange: (value: string) => void,
  onPriceFromChange: (value: number) => void,
  onPriceToChange: (value: number) => void,
  onCheckboxChange: (name: "isNew" | "isAvailable" | "hasDiscount") => void
  onReset: () => void
}

const categoryOptions = [
  {value: "hair-dryers", label: "Фены"},
  {value: "stylers", label: "Стайлеры"},
  {value: "straighteners", label: "Выпрямители"},
  {value: "accessories", label: "Аксессуары"},
]

const additionalOptions = [
  {name: "isNew", label: "Только новинки"},
  {name: "isAvailable", label: "Только в наличии"},
  {name: "hasDiscount", label: "Товары со скидкой"},
] as const


export const Filters = ({ 
  isOpen, 
  onToggle,
  onClose, 
  filters, 
  minPriceLimit, 
  maxPriceLimit, 
  onCategoryChange, 
  onPriceFromChange, 
  onPriceToChange, 
  onCheckboxChange, 
  onReset 
}: FiltersProps) => {
  const filterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!filterRef.current) return

      if (!filterRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const range = maxPriceLimit - minPriceLimit || 1
  
  const progressLeft = ((filters.priceFrom - minPriceLimit) / range) * 100
  const progressRight = ((maxPriceLimit - filters.priceTo) / range) * 100


  const activeFiltersCount = 
  filters.categories.length + 
    Number(filters.isNew) + 
    Number(filters.isAvailable) + 
    Number(filters.hasDiscount) + 
    Number(
      filters.priceFrom !== minPriceLimit || filters.priceTo !== maxPriceLimit
    )

  return (
    <div className="filters" ref={filterRef}>
      <button 
        className="filters__button"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={onToggle}
      >
        <svg className="filters__button-icon" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.45 1.5C5.25 0.65 4.45 0 3.5 0C2.55 0 1.8 0.65 1.55 1.5H0V2.5H1.55C1.75 3.35 2.55 4 3.5 4C4.45 4 5.2 3.35 5.45 2.5H14V1.5H5.45ZM3.5 3C2.95 3 2.5 2.55 2.5 2C2.5 1.45 2.95 1 3.5 1C4.05 1 4.5 1.45 4.5 2C4.5 2.55 4.05 3 3.5 3ZM10.5 4C9.55 4 8.8 4.65 8.55 5.5H0V6.5H8.55C8.75 7.35 9.55 8 10.5 8C11.45 8 12.2 7.35 12.45 6.5H14V5.5H12.45C12.25 4.65 11.45 4 10.5 4ZM10.5 7C9.95 7 9.5 6.55 9.5 6C9.5 5.45 9.95 5 10.5 5C11.05 5 11.5 5.45 11.5 6C11.5 6.55 11.05 7 10.5 7ZM6 8C5.05 8 4.3 8.65 4.05 9.5H0V10.5H4.05C4.25 11.35 5.05 12 6 12C6.95 12 7.7 11.35 7.95 10.5H14V9.5H7.95C7.75 8.65 6.95 8 6 8ZM6 11C5.45 11 5 10.55 5 10C5 9.45 5.45 9 6 9C6.55 9 7 9.45 7 10C7 10.55 6.55 11 6 11Z" fill="#111111"/>
        </svg>

        <span className="filters__button-text">Фильтры</span>

        {activeFiltersCount > 0 && (
          <span className="filters__button-count">{activeFiltersCount}</span>
        )}
      </button>
      {isOpen && (
        <div 
          className="filters__dropdown" 
          role="dialog" 
          aria-label="Фильтры товаров"
        >
          <div className="filters__header">
            <h3 className="filters__title">Фильтры</h3>
          </div>

          <div className="filters__body">
            <fieldset className="filters__group">
              <legend className="filters__group-title">Категория</legend>

              {categoryOptions.map((category) => (
                <label className="filters__option" key={category.value}>
                  <input 
                    className="filters__input" 
                    type="checkbox" 
                    name="category" 
                    value={category.value}
                    checked={filters.categories.includes(category.value)}
                    onChange={() => onCategoryChange(category.value)}
                  />
                  <span className="filters__label">{category.label}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className="filters__group">
              <legend className="filters__group-title">Цена</legend>

              <div className="filters__price">
                <div className="filters__price-values">
                  <span className="filters__price-value">от {filters.priceFrom} ₽</span>
                  <span className="filters__price-value">до {filters.priceTo} ₽</span>
                </div>

                <div className="filters__range">
                  <div className="filters__range-track"></div>
                  <div 
                    className="filters__range-progress" 
                    style={{
                      left: `${progressLeft}%`,
                      right: `${progressRight}%`
                  }}
                  ></div>

                  <input 
                    className="filters__range-input filters__range-input--min" 
                    type="range"
                    min={minPriceLimit}
                    max={maxPriceLimit}
                    step={1000}
                    value={filters.priceFrom}
                    onChange={(event) => onPriceFromChange(Number(event.target.value))}
                  />

                  <input 
                    className="filters__range-input filters__range-input--max" 
                    type="range"
                    min={minPriceLimit}
                    max={maxPriceLimit}
                    step={1000}
                    value={filters.priceTo}
                    onChange={(event) => onPriceToChange(Number(event.target.value))}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="filters__group">
              <legend className="filters__group-title">Дополнительно</legend>

              {additionalOptions.map((option) => (
                <label className="filters__option" key={option.name}>
                  <input 
                    className="filters__input" 
                    type="checkbox" 
                    name={option.name}
                    checked={filters[option.name]}
                    onChange={() => onCheckboxChange(option.name)}
                  />
                  <span className="filters__label">{option.label}</span>
                </label>
              ))}
            </fieldset>
          </div>

          <div className="filters__actions">
            <button className="filters__reset" type="button" onClick={onReset}>
              Сбросить
            </button>

            <button className="filters__apply" type="button" onClick={onClose}>
              Готово
            </button>
          </div>
        </div>
      )}
    </div>
  )
}