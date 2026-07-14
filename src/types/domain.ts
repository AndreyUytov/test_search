export interface Repository {
  id: number
  name: string
  fullName: string
  htmlUrl: string
  description: string | null
  stars: number
  language: string | null
  ownerLogin: string
  ownerAvatarUrl: string
}

export interface FavoriteRepository extends Repository {
  addedAt: number
}

export interface SearchReposResult {
  items: Repository[]
  totalCount: number
}

export type SortField = 'name' | 'stars' | 'addedAt'
