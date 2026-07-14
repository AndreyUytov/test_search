import type { ChangeEvent } from 'react'
import styles from './SearchBar.module.scss'

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <input
      type="text"
      className={styles.input}
      value={value}
      onChange={handleChange}
      placeholder="Поиск репозиториев на GitHub..."
      aria-label="Поиск репозиториев"
    />
  )
}
