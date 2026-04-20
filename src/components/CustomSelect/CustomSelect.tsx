import { useRef, useEffect, useState } from "react"
import checkMarkIcon from "../../assets/icons/icon-check-mark-custom-select.svg"
import "./CustomSelect.scss"

type Option = {
  value: string,
  label: string
}

type CustomSelectProps = {
  options: Option[],
  value: string,
  onChange: (value: string) => void
}

export const CustomSelect = ({ options, value, onChange }: CustomSelectProps) => {
  const selectedOption = options.find((option) => option.value === value) ?? options[0]

  const [isOpen, setIsOpen] = useState(false)

  const selectRef = useRef<HTMLDivElement | null>(null)

  const toggleSelect = () => {
    setIsOpen((prev) => !prev)
  }

  const handleOptionClick = (option: Option) => {
    onChange(option.value)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!selectRef.current) return

      if(!selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])


  return (
    <div className={`custom-select ${isOpen ? "is-open" : ""}`} ref={selectRef}>
      <button className="custom-select__button" type="button" onClick={toggleSelect}>
        <span className="custom-select__button-label">
          {selectedOption.label}
        </span>

        <span className="custom-select__button-arrow" aria-hidden="true">
          <svg className="custom-select__icon-triangle" width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.23364 1.64018C-0.309132 0.988856 0.154025 0 1.00186 0H6.73178C7.57962 0 8.04277 0.988858 7.5 1.64018L4.63504 5.07814C4.23525 5.55789 3.49839 5.55789 3.0986 5.07813L0.23364 1.64018Z" fill="#111111"/>
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul className="custom-select__dropdown">
          {options.map((option) => {
            const isSelected = option.value === selectedOption.value

            return (
              <li className="custom-select__option-item" key={option.value}>
                <button className={`custom-select__option ${isSelected ? "is-selected" : ""}`} type="button" onClick={() => handleOptionClick(option)}>
                  <span className="custom-select__option-label">
                    {option.label}
                  </span>

                  {isSelected && (
                    <span className="custom-select__option-check" aria-hidden="true">
                      <img className="custom-select__icon-check" src={checkMarkIcon} alt="" />
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}