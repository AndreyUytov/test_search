import { Activity, useState } from 'react'
import styles from './App.module.scss'
import { SearchBar } from './components/SearchBar/SearchBar'
import { RepoList } from './components/RepoList/RepoList'
import { Pagination } from './components/Pagination/Pagination'
import { FavoritesTab } from './components/FavoritesTab/FavoritesTab'
import { StatusView } from './components/StatusView/StatusView'
import { useRepoSearch } from './hooks/useRepoSearch'
import { useFavorites } from './hooks/useFavorites'

type Tab = 'search' | 'favorites'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('search')
  const search = useRepoSearch()
  const { isFavorite, toggleFavorite } = useFavorites()

  const hasNextPage = search.page * search.perPage < search.totalCount

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>GitHub Repository Search</h1>

      <nav className={styles.tabs}>
        <button
          type="button"
          className={activeTab === 'search' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('search')}
        >
          Поиск
        </button>
        <button
          type="button"
          className={activeTab === 'favorites' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('favorites')}
        >
          Избранное
        </button>
      </nav>

      <Activity mode={activeTab === 'search' ? 'visible' : 'hidden'}>
        <section className={styles.section}>
          <SearchBar value={search.query} onChange={search.setQuery} />

          <div className={styles.scrollArea}>
            {search.status === 'idle' && (
              <StatusView variant="idle" message="Начните вводить запрос для поиска" />
            )}

            {search.status === 'loading' && <StatusView variant="loading" message="Загрузка..." />}

            {search.status === 'error' && (
              <StatusView
                variant="error"
                message={search.errorMessage ?? 'Произошла ошибка'}
                onRetry={search.retry}
              />
            )}

            {search.status === 'success' && search.items.length === 0 && (
              <StatusView variant="empty" message="Ничего не найдено" />
            )}

            {search.status === 'success' && search.items.length > 0 && (
              <RepoList items={search.items} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
            )}
          </div>

          {search.status === 'success' && search.items.length > 0 && (
            <Pagination
              page={search.page}
              hasNextPage={hasNextPage}
              onPrev={() => search.setPage(Math.max(1, search.page - 1))}
              onNext={() => search.setPage(search.page + 1)}
            />
          )}
        </section>
      </Activity>

      <Activity mode={activeTab === 'favorites' ? 'visible' : 'hidden'}>
        <section className={styles.section}>
          <FavoritesTab />
        </section>
      </Activity>
    </main>
  )
}

export default App
