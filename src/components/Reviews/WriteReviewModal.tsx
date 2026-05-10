import { useEffect, useRef, useState } from "react"
import type { ChangeEvent, DragEvent, MouseEvent } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import "./WriteReviewModal.scss"
import iconStar from "../../assets/icons/icon-star-write-review-modal.svg"
import iconStarEmpty from "../../assets/icons/icon-star-empty-write-review-modal.svg"
import {
  MAX_REVIEW_RATING,
  reviewFormSchema,
  type ReviewFormValues
} from "../../utils/validation/reviewValidation"
import { createReview } from "../../api/reviews"
import { useQueryClient } from "@tanstack/react-query"

type WriteReviewModalProps = {
  onClose: () => void
}

const initialReviewFormValues: ReviewFormValues = {
  rating: 0,
  author: "",
  comment: "",
}

export const WriteReviewModal = ({ onClose }: WriteReviewModalProps) => {
  const [photos, setPhotos] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const queryClient = useQueryClient()
  const isOverlayMouseDownRef = useRef(false)

  const {
    register,
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    defaultValues: initialReviewFormValues,
    resolver: zodResolver(reviewFormSchema),
    mode: "onBlur",
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if(event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  const handleOverlayClick = () => {
    onClose()
  }

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const updatePhotos = (files: FileList | null) => {
    if (!files) return

    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    )

    setPhotos((prev) => [...prev, ...imageFiles])
  }

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    updatePhotos(event.target.files)
  }

  const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()

    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragOver(false)

    updatePhotos(event.dataTransfer.files)
  }

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    isOverlayMouseDownRef.current = event.target === event.currentTarget
  }

  const handleOverlayMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    const isOverlayClick = isOverlayMouseDownRef.current && event.target === event.currentTarget

    isOverlayMouseDownRef.current = false

    if (isOverlayClick) {
      handleOverlayClick()
    }
  }

  const handleReviewSubmit = async (data: ReviewFormValues) => {
    try {
      const createdAt = new Date()

      await createReview({
        rating: data.rating,
        author: data.author,
        comment: data.comment,
        photos: photos.map((photo) => photo.name),
        date: createdAt.toLocaleDateString("ru-RU"),
        dateTime: createdAt.toISOString().split("T")[0]
      })

      queryClient.invalidateQueries({ queryKey: ["reviews"] })

      onClose()
    } catch (error) {
      console.log("Не удалось отправить отзыв:", error)
    }
  }

  return (
    <div
      className="write-review-modal"
      onMouseDown={handleOverlayMouseDown}
      onMouseUp={handleOverlayMouseUp}
      >
      <div className="write-review-modal__window" onClick={handleModalClick}>
        <button className="write-review-modal__close" type="button" aria-label="Закрыть окно" onClick={onClose}>
          <svg className="write-review-modal__close-icon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M17.9706 1.7071C18.3611 1.31658 18.3612 0.683416 17.9706 0.292891C17.5801 -0.0976336 16.9469 -0.0976333 16.5564 0.292891L9.13194 7.71736L1.70737 0.292784C1.31684 -0.0977406 0.683678 -0.0977401 0.293154 0.292784C-0.0973709 0.683309 -0.0973706 1.31647 0.293154 1.707L7.71773 9.13157L0.292585 16.5567C-0.0979388 16.9472 -0.0979395 17.5804 0.292585 17.9709C0.68311 18.3615 1.31627 18.3615 1.7068 17.9709L9.13194 10.5458L16.557 17.9708C16.9475 18.3613 17.5807 18.3613 17.9712 17.9708C18.3617 17.5803 18.3617 16.9471 17.9712 16.5566L10.5462 9.13157L17.9706 1.7071Z" fill="#ABABAB"/>
          </svg>
        </button>

        <h2 className="write-review-modal__title">Написать отзыв</h2>

        <form className="write-review-modal__form" onSubmit={handleSubmit(handleReviewSubmit)}>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <div className="write-review-modal__field write-review-modal__field--rating">
                <span className="write-review-modal__label">Оценка</span>

                <div className="write-review-modal__stars">
                  {Array.from({ length: MAX_REVIEW_RATING }, (_, index) => {
                    const starValue = index + 1
                    const isFilled = starValue <= field.value

                    return (
                      <button
                        key={index}
                        className="write-review-modal__star-button"
                        type="button"
                        aria-label={`Поставить ${starValue} из ${MAX_REVIEW_RATING}`}
                        onClick={() => {
                          field.onChange(field.value === starValue ? 0 : starValue)
                          clearErrors("rating")
                        }}
                      >
                        <img
                          className="write-review-modal__star"
                          src={isFilled ? iconStar : iconStarEmpty}
                          alt=""
                          aria-hidden="true"
                        />
                      </button>
                    )
                  })}
                </div>

                {errors.rating && (
                  <p className="write-review-modal__error">{errors.rating.message}</p>
                )}
              </div>
            )}
          />

          <div className={`write-review-modal__field write-review-modal__field--author ${errors.author ? "is-invalid" : ""}`}>
            <input
              type="text"
              className="write-review-modal__input"
              placeholder="Ваше имя"
              autoComplete="name"
              {...register("author")}
            />

            {errors.author && (
              <p className="write-review-modal__error">{errors.author.message}</p>
            )}
          </div>

          <div className={`write-review-modal__field write-review-modal__field--comment ${errors.comment ? "is-invalid" : ""}`}>
            <textarea
              className="write-review-modal__textarea"
              placeholder="Комментарий"
              {...register("comment")}
            />

            {errors.comment && (
              <p className="write-review-modal__error">{errors.comment.message}</p>
            )}
          </div>

          <div className="write-review-modal__field write-review-modal__field--upload">
            <input
              className="write-review-modal__file-input"
              id="review-photos"
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoChange}
            />

            <label
              htmlFor="review-photos"
              className={`write-review-modal__upload ${isDragOver ? "is-drag-over" : ""}`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <span className="write-review-modal__upload-title">
                Загрузить фото
              </span>
              <span className="write-review-modal__upload-text">
                Нажмите кнопку “Загрузить фото” или перетащите
                <br />
                фотографию в эту область
              </span>
            </label>

            {photos.length > 0 && (
              <p className="write-review-modal__files-count">
                Выбрано файлов: {photos.length}
              </p>
            )}
          </div>

          <button className="write-review-modal__submit button" type="submit">
            Отправить отзыв
          </button>
        </form>
      </div>
    </div>
  )
}
