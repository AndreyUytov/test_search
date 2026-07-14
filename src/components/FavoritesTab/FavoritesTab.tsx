import { useMemo, useState, type ChangeEvent } from 'react'
import styles from './FavoritesTab.module.scss'
import { useFavorites } from '../../hooks/useFavorites'
import { RepoCard } from '../RepoCard/RepoCard'
import { sortFavorites } from '../../utils/sortFavorites'
import type { SortField } from '../../types/domain'

const SORT_OPTIONS: Array<{ value: SortField; label: string }> = [
  { value: 'addedAt', label: 'По дате добавления' },
  { value: 'name', label: 'По имени' },
  { value: 'stars', label: 'По звёздам' },
]

export function FavoritesTab() {
  const { favorites, removeFavorite } = useFavorites()
  const [sortField, setSortField] = useState<SortField>('addedAt')

  const sortedFavorites = useMemo(() => sortFavorites(favorites, sortField), [favorites, sortField])

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortField(event.target.value as SortField)
  }

  if (favorites.length === 0) {
    return <p className={styles.emptyState}>Список избранного пуст</p>
  }

  return (
    <div className={styles.container}>
      <label className={styles.sortLabel}>
        Сортировка:
        <select className={styles.sortSelect} value={sortField} onChange={handleSortChange}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.scrollArea}>
        <ul className={styles.list}>
          {sortedFavorites.map((repository) => (
            <li key={repository.id} className={styles.listItem}>
              <RepoCard
                repository={repository}
                isFavorite
                onToggleFavorite={() => removeFavorite(repository.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
