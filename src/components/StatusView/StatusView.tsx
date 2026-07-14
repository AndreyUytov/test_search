import styles from './StatusView.module.scss'

export type StatusViewVariant = 'idle' | 'loading' | 'error' | 'empty'

export interface StatusViewProps {
  variant: StatusViewVariant
  message: string
  onRetry?: () => void
}

export function StatusView({ variant, message, onRetry }: StatusViewProps) {
  return (
    <div className={styles.container}>
      {variant === 'loading' && <span className={styles.spinner} aria-hidden="true" />}
      <p className={styles.message}>{message}</p>
      {variant === 'error' && onRetry && (
        <button type="button" className={styles.retryButton} onClick={onRetry}>
          Повторить
        </button>
      )}
    </div>
  )
}
