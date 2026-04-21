import { useState, useRef } from "react";

type UseTimedMessageOptions = {
  visibleDuration?: number
  fadeDuration?: number
  onFinish?: () => void
}

export const useTimedMessage = ({
  visibleDuration = 4500,
  fadeDuration = 500,
  onFinish
}: UseTimedMessageOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHiding, setIsHiding] = useState(false)

  const hideTimeoutRef = useRef<number | null>(null)
  const removeTimeoutRef = useRef<number | null>(null)

  const clearTimers = () => {
    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current)
    }

    if (removeTimeoutRef.current !== null) {
      window.clearTimeout(removeTimeoutRef.current)
    }
  }

  const showMessage = () => {
    clearTimers()

    setIsVisible(true)
    setIsHiding(false)

    hideTimeoutRef.current = window.setTimeout(() => {
      setIsHiding(true)
    }, visibleDuration)

    removeTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false)
      setIsHiding(false)
      onFinish?.()
    }, visibleDuration + fadeDuration)
  }

  return {
    isVisible,
    isHiding,
    showMessage
  }
}