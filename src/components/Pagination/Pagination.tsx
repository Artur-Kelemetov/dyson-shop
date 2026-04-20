import "./Pagination.scss"

type PaginationProps = {
  currentPage: number,
  totalPages: number,
  onPrev: () => void,
  onNext: () => void,
  className?: string
}

export const Pagination = ({ currentPage, totalPages, onPrev, onNext, className }: PaginationProps) => {
  return (
    <div className={`pagination ${className ?? ""}`}>
      <div className="pagination__buttons">
        <button 
          className="pagination__button" 
          type="button" 
          aria-label="Предыдущая страница"
          onClick={onPrev}
          disabled={currentPage === 1}>
          <svg className="pagination__icon" width="35" height="30" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.49954 16.0344L33.2505 15.7074C33.8028 15.7013 34.2455 15.2487 34.2395 14.6965C34.2334 14.1442 33.7808 13.7014 33.2285 13.7075L3.3322 14.0361L14.912 1.68395C15.2897 1.28103 15.2693 0.64819 14.8663 0.270468C14.4634 -0.107255 13.8306 -0.086829 13.4529 0.31609L0.270387 14.3779C-0.107335 14.7808 -0.0869094 15.4137 0.31601 15.7914L15.0205 29.5763C15.4234 29.9541 16.0563 29.9336 16.434 29.5307C16.8117 29.1278 16.7913 28.495 16.3884 28.1172L3.49954 16.0344Z" fill="#111111"/>
          </svg>
        </button>

        <button 
          className="pagination__button" 
          type="button" 
          aria-label="Следующая страница"
          onClick={onNext}
          disabled={currentPage === totalPages}>
          <svg className="pagination__icon" width="35" height="30" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.74 16.0344L0.98898 15.7074C0.436728 15.7013 -0.00603869 15.2487 3.19817e-05 14.6965C0.00610265 14.1442 0.458713 13.7014 1.01096 13.7075L30.9073 14.0361L19.3275 1.68395C18.9498 1.28103 18.9702 0.64819 19.3732 0.270468C19.7761 -0.107255 20.4089 -0.086829 20.7866 0.31609L33.9691 14.3779C34.3468 14.7808 34.3264 15.4137 33.9235 15.7914L19.219 29.5763C18.8161 29.9541 18.1832 29.9336 17.8055 29.5307C17.4278 29.1278 17.4482 28.495 17.8511 28.1172L30.74 16.0344Z" fill="#111111"/>
          </svg>
        </button>
      </div>

      <span className="pagination__info">
        {currentPage} из {totalPages}
      </span>
    </div>
  )
}