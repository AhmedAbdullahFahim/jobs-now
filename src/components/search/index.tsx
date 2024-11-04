import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import searchIcon from '../../assets/icons/search.svg'
import { AppDispatch, RootState } from '../../store'
import { setSidebarContentList } from '../../store/slices/sidebarSlice'
import { debounce } from '../../utils/debounce'
import styles from './index.module.scss'

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { list, title } = useSelector((state: RootState) => state.sidebar)

  const handleSearch = useCallback(
    debounce((value: string) => {
      if (value.length >= 3) {
        setSearchParams({ query: value })
        dispatch(
          setSidebarContentList(
            title.includes('history') ? [...list, value] : [value]
          )
        )
        if (
          location.pathname.split('/')[
            location.pathname.split('/').length - 1
          ] === 'jobs'
        )
          navigate(`/jobs/search?query=${value}`)
      } else {
        setSearchParams({})
        if (
          location.pathname.split('/')[
            location.pathname.split('/').length - 1
          ] === 'search'
        )
          navigate('/jobs')
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
