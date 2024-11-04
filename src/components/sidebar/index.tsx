import React from 'react'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { fetchJobs } from '../../store/slices/jobsSlice'
import { useSearchParams } from 'react-router-dom'

interface Props {
  search?: boolean
}

const Sidebar: React.FC<Props> = ({ search = false }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { list, title } = useSelector((state: RootState) => state.sidebar)

  const dispatch = useDispatch<AppDispatch>()
  const handleSearch = (item: string) => {
    dispatch(fetchJobs({ search: item }))
    setSearchParams({ query: item })
  }
  return (
    <aside className={styles.sidebar}>
      <h6>{title}</h6>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {search ? (
              <button onClick={() => handleSearch(item)}>{item}</button>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
