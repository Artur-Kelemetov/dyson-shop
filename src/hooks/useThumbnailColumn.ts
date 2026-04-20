import { useState, useRef, useLayoutEffect } from "react"

const MAX_VISIBLE_THUMBNAILS = 5;

type UseThumbnailColumnParams = {
  imagesLength: number,
  isMobile: boolean
}

type UseThumbnailColumnReturn = {
  thumbnailStartIndex: number
  thumbnailStep: number
  thumbnailsViewportHeight: number
  thumbnailTrackRef: React.RefObject<HTMLDivElement | null>
  thumbnailRefs: React.RefObject<Array<HTMLButtonElement | null>>
  shiftThumbnailWindowOnClick: (visibleIndex: number) => void
  syncThumbnailWindow: (nextIndex: number) => void
}

export const useThumbnailColumn = ({ 
  imagesLength, isMobile 
}: UseThumbnailColumnParams): UseThumbnailColumnReturn => {
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0)
  const [thumbnailStep, setThumbnailStep] = useState(0)
  const [thumbnailsViewportHeight, setThumbnailsViewportHeight] = useState(0)

  const thumbnailTrackRef = useRef<HTMLDivElement | null>(null)
  const thumbnailRefs = useRef<Array<HTMLButtonElement  | null>>([])

  useLayoutEffect(() => {
    if (isMobile) return

    const measureThumbnails = () => {
      const firstThumbnail = thumbnailRefs.current[0]
      const track = thumbnailTrackRef.current

      if (!firstThumbnail || !track) return

      const thumbnailHeight = firstThumbnail.getBoundingClientRect().height
      const trackStyles = window.getComputedStyle(track)
      const rowGap = parseFloat(trackStyles.rowGap) || 0

      const nextThumbnailStep = thumbnailHeight + rowGap
      const nextViewportHeight = thumbnailHeight * MAX_VISIBLE_THUMBNAILS + rowGap * (MAX_VISIBLE_THUMBNAILS - 1)

      setThumbnailStep(nextThumbnailStep)
      setThumbnailsViewportHeight(nextViewportHeight)
    }

    measureThumbnails()
    window.addEventListener("resize", measureThumbnails)

    return () => {
      window.removeEventListener("resize", measureThumbnails)
    }
  }, [imagesLength, isMobile])


  const shiftThumbnailWindowOnClick = (visibleIndex: number) => {
    const isNearTop = visibleIndex === 0
    const isNearBottom = visibleIndex === 4
  
    const canShiftDown = thumbnailStartIndex + MAX_VISIBLE_THUMBNAILS < imagesLength
    const canShiftUp = thumbnailStartIndex > 0
  
    if (isNearTop && canShiftUp) {
      setThumbnailStartIndex((prev) => prev - 1)
    }
  
    if (isNearBottom && canShiftDown) {
      setThumbnailStartIndex((prev) => prev + 1)
    }
  }
  
  const syncThumbnailWindow = (nextIndex: number) => {
    if (nextIndex < thumbnailStartIndex) {
      setThumbnailStartIndex(nextIndex)
      return
    }
  
    if (nextIndex >= thumbnailStartIndex + MAX_VISIBLE_THUMBNAILS) {
      setThumbnailStartIndex(nextIndex - MAX_VISIBLE_THUMBNAILS + 1)
    }
  }

  return {
    thumbnailStartIndex,
    thumbnailStep,
    thumbnailsViewportHeight,
    thumbnailTrackRef,
    thumbnailRefs,
    shiftThumbnailWindowOnClick,
    syncThumbnailWindow,
  }
}