import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { FavoritesContext, type FavoritesContextValue } from './FavoritesContext'
import type { FavoriteRepository, Repository } from '../types/domain'

export interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<FavoriteRepository[]>([])

  const isFavorite = useCallback(
    (repositoryId: number) => favorites.some((repo) => repo.id === repositoryId),
    [favorites],
  )

  const toggleFavorite = useCallback((repository: Repository) => {
    setFavorites((current) => {
      const alreadyExists = current.some((repo) => repo.id === repository.id)
      if (alreadyExists) {
        return current.filter((repo) => repo.id !== repository.id)
      }
      return [...current, { ...repository, addedAt: Date.now() }]
    })
  }, [])

  const removeFavorite = useCallback((repositoryId: number) => {
    setFavorites((current) => current.filter((repo) => repo.id !== repositoryId))
  }, [])

  const value = useMemo<FavoritesContextValue>(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite }),
    [favorites, isFavorite, toggleFavorite, removeFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
