export interface GitHubOwnerDto {
  login: string
  avatar_url: string
}

export interface GitHubRepoDto {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
  language: string | null
  owner: GitHubOwnerDto
}

export interface SearchReposResponseDto {
  total_count: number
  incomplete_results: boolean
  items: GitHubRepoDto[]
}

export interface GitHubErrorResponseDto {
  message: string
  documentation_url?: string
}
