import styles from './RepoList.module.scss'
import { RepoCard } from '../RepoCard/RepoCard'
import type { Repository } from '../../types/domain'

export interface RepoListProps {
  items: Repository[]
  isFavorite: (repositoryId: number) => boolean
  onToggleFavorite: (repository: Repository) => void
}

export function RepoList({ items, isFavorite, onToggleFavorite }: RepoListProps) {
  return (
    <ul className={styles.list}>
      {items.map((repository) => (
        <li key={repository.id} className={styles.listItem}>
          <RepoCard
            repository={repository}
            isFavorite={isFavorite(repository.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  )
}
