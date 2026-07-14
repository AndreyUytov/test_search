import { createContext } from 'react'
import type { FavoriteRepository, Repository } from '../types/domain'

export interface FavoritesContextValue {
  favorites: FavoriteRepository[]
  isFavorite: (repositoryId: number) => boolean
  toggleFavorite: (repository: Repository) => void
  removeFavorite: (repositoryId: number) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
