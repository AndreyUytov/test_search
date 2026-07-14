import styles from './Pagination.module.scss'

export interface PaginationProps {
  page: number
  hasNextPage: boolean
  onPrev: () => void
  onNext: () => void
}

export function Pagination({ page, hasNextPage, onPrev, onNext }: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button type="button" className={styles.button} onClick={onPrev} disabled={page <= 1}>
        Назад
      </button>
      <span className={styles.pageLabel}>Страница {page}</span>
      <button type="button" className={styles.button} onClick={onNext} disabled={!hasNextPage}>
        Вперёд
      </button>
    </div>
  )
}
