import { ChangeEvent, useCallback, useState } from 'react'
import searchIcon from '../../assets/icons/search.svg'
import styles from './index.module.scss'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { debounce } from '../../utils/debounce'

const Search = () => {
  const [search, setSearch] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  console.log(location.pathname.split('/'))

  const handleSearch = useCallback(
    debounce((value: string) => {
      if (value.length >= 3) {
        setSearchParams({ query: value })
        if (
          location.pathname.split('/')[
            location.pathname.split('/').length - 1
          ] === 'jobs'
        )
          navigate(`/jobs/search?query=${value}`)
      } else {
        setSearchParams({})
      }
    }, 500),
    []
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearch(value)
    handleSearch(value)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <input
          type='search'
          placeholder='search keyword'
          value={searchParams.get('query') ?? search}
          onChange={handleChange}
        />
        {!search && !searchParams.get('query') && (
          <img src={searchIcon} alt='search' />
        )}
      </div>
    </div>
  )
}

export default Search
