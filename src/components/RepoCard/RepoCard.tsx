import styles from './RepoCard.module.scss'
import type { Repository } from '../../types/domain'

export interface RepoCardProps {
  repository: Repository
  isFavorite: boolean
  onToggleFavorite: (repository: Repository) => void
}

const DESCRIPTION_MAX_LENGTH = 120

function truncateDescription(description: string | null): string {
  if (!description) {
    return 'Без описания'
  }
  if (description.length <= DESCRIPTION_MAX_LENGTH) {
    return description
  }
  return `${description.slice(0, DESCRIPTION_MAX_LENGTH)}…`
}

export function RepoCard({ repository, isFavorite, onToggleFavorite }: RepoCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <a
          href={repository.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.name}
        >
          {repository.fullName}
        </a>
        <button
          type="button"
          className={isFavorite ? styles.favoriteActive : styles.favoriteButton}
          onClick={() => onToggleFavorite(repository)}
        >
          {isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        </button>
      </div>
      <p className={styles.description}>{truncateDescription(repository.description)}</p>
      <div className={styles.meta}>
        <span className={styles.stars}>★ {repository.stars}</span>
        {repository.language && <span className={styles.language}>{repository.language}</span>}
      </div>
    </article>
  )
}
