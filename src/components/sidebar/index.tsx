import React from 'react'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { fetchJobs } from '../../store/slices/jobsSlice'
import { useSearchParams } from 'react-router-dom'

interface Props {
  title: string
  list: string[]
  search: boolean
}

const Sidebar: React.FC<Props> = ({ title, list, search }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
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
