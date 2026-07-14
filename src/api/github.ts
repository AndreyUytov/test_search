import type { GitHubErrorResponseDto, SearchReposResponseDto } from './types'

const BASE_URL = import.meta.env.VITE_GITHUB_API_URL

export class GitHubApiError extends Error {}

export interface SearchRepositoriesParams {
  query: string
  page: number
  perPage: number
  signal?: AbortSignal
}

export async function searchRepositories({
  query,
  page,
  perPage,
  signal,
}: SearchRepositoriesParams): Promise<SearchReposResponseDto> {
  const url = new URL(`${BASE_URL}/search/repositories`)
  url.searchParams.set('q', query)
  url.searchParams.set('page', String(page))
  url.searchParams.set('per_page', String(perPage))

  const response = await fetch(url, { signal })

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as GitHubErrorResponseDto | null
    throw new GitHubApiError(errorBody?.message ?? `GitHub API error: ${response.status}`)
  }

  return (await response.json()) as SearchReposResponseDto
}
