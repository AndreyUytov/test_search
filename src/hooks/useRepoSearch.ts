import { useCallback, useEffect, useRef, useState } from 'react'
import { GitHubApiError, searchRepositories } from '../api/github'
import { toSearchResult } from '../api/mappers'
import type { Repository } from '../types/domain'
import { useDebounce } from './useDebounce'

const PER_PAGE = 10
const DEBOUNCE_MS = 400

export type SearchStatus = 'idle' | 'loading' | 'error' | 'success'

export interface UseRepoSearchResult {
  query: string
  setQuery: (value: string) => void
  page: number
  setPage: (value: number) => void
  perPage: number
  status: SearchStatus
  items: Repository[]
  totalCount: number
  errorMessage: string | null
  retry: () => void
}

export function useRepoSearch(): UseRepoSearchResult {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [asyncStatus, setAsyncStatus] = useState<SearchStatus>('idle')
  const [items, setItems] = useState<Repository[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, DEBOUNCE_MS)
  const trimmedQuery = debouncedQuery.trim()
  const abortControllerRef = useRef<AbortController | null>(null)
  const previousTrimmedQueryRef = useRef(trimmedQuery)

  const fetchResults = useCallback(async (searchQuery: string, searchPage: number) => {
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller

    setAsyncStatus('loading')
    setErrorMessage(null)

    try {
      const responseDto = await searchRepositories({
        query: searchQuery,
        page: searchPage,
        perPage: PER_PAGE,
        signal: controller.signal,
      })
      const result = toSearchResult(responseDto)
      setItems(result.items)
      setTotalCount(result.totalCount)
      setAsyncStatus('success')
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }
      const message =
        error instanceof GitHubApiError ? error.message : 'Не удалось выполнить поиск. Проверьте соединение.'
      setErrorMessage(message)
      setAsyncStatus('error')
    }
  }, [])

  useEffect(() => {
    if (!trimmedQuery) {
      abortControllerRef.current?.abort()
      previousTrimmedQueryRef.current = trimmedQuery
      return
    }

    // Сбрасываем страницу на новый запрос здесь, а не в обработчике onChange,
    // чтобы не запускать лишний fetch со старым запросом на 1-й странице
    // до того, как debounce фактически применит новое значение.
    const isNewQuery = previousTrimmedQueryRef.current !== trimmedQuery
    previousTrimmedQueryRef.current = trimmedQuery

    if (isNewQuery && page !== 1) {
      setPage(1)
      return
    }

    fetchResults(trimmedQuery, page)

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [trimmedQuery, page, fetchResults])

  const retry = useCallback(() => {
    if (trimmedQuery) {
      fetchResults(trimmedQuery, page)
    }
  }, [trimmedQuery, page, fetchResults])

  // Пустой запрос — статус и данные всегда 'idle', независимо от результата
  // предыдущего запроса (без лишнего эффекта на сброс состояния).
  const status: SearchStatus = trimmedQuery ? asyncStatus : 'idle'

  return {
    query,
    setQuery,
    page,
    setPage,
    perPage: PER_PAGE,
    status,
    items: trimmedQuery ? items : [],
    totalCount: trimmedQuery ? totalCount : 0,
    errorMessage: trimmedQuery ? errorMessage : null,
    retry,
  }
}
