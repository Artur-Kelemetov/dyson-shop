import { useState } from "react"

type UseSliderReturn = {
  activeImageIndex: number
  hasMultipleImages: boolean
  goToSlide: (index: number) => void
  handlePrev: () => void
  handleNext: () => void
  setActiveImageIndex: React.Dispatch<React.SetStateAction<number>>
}

export const useSlider = (slidesCount: number, initialIndex = 0): UseSliderReturn => {
  const [activeImageIndex, setActiveImageIndex] = useState(initialIndex)

  const hasMultipleImages = slidesCount > 1

  const goToSlide = (index: number) => {
    if (slidesCount === 0) return

    const normalizedIndex = Math.max(0, Math.min(index, slidesCount - 1))
    setActiveImageIndex(normalizedIndex)
  }

  const handlePrev = () => {
    if (!hasMultipleImages) return

    setActiveImageIndex((prev) => prev === 0 ? slidesCount - 1 : prev - 1)
  }

  const handleNext = () => {
    if (!hasMultipleImages) return

    setActiveImageIndex((prev) => prev === slidesCount - 1 ? 0 : prev + 1)
  }

  return {
    activeImageIndex,
    hasMultipleImages,
    goToSlide,
    handlePrev,
    handleNext,
    setActiveImageIndex,
  }
}