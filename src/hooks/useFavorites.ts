import { useContext } from 'react'
import { FavoritesContext, type FavoritesContextValue } from '../context/FavoritesContext'

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites должен использоваться внутри FavoritesProvider')
  }
  return context
}
