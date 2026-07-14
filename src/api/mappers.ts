import type { GitHubRepoDto, SearchReposResponseDto } from './types'
import type { Repository, SearchReposResult } from '../types/domain'

export function toRepository(dto: GitHubRepoDto): Repository {
  return {
    id: dto.id,
    name: dto.name,
    fullName: dto.full_name,
    htmlUrl: dto.html_url,
    description: dto.description,
    stars: dto.stargazers_count,
    language: dto.language,
    ownerLogin: dto.owner.login,
    ownerAvatarUrl: dto.owner.avatar_url,
  }
}

export function toSearchResult(dto: SearchReposResponseDto): SearchReposResult {
  return {
    items: dto.items.map(toRepository),
    totalCount: dto.total_count,
  }
}
