import type { FavoriteRepository, SortField } from '../types/domain'

export function sortFavorites(favorites: FavoriteRepository[], field: SortField): FavoriteRepository[] {
  const sorted = [...favorites]

  switch (field) {
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'stars':
      sorted.sort((a, b) => b.stars - a.stars)
      break
    case 'addedAt':
      sorted.sort((a, b) => b.addedAt - a.addedAt)
      break
  }

  return sorted
}
