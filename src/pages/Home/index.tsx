import React, { useEffect } from 'react'
import NavbarWithSearch from '../../layouts/NavbarWithSearch'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from '../../store/slices/jobsSlice'
import { AppDispatch, RootState } from '../../store'
import Loading from '../../components/loading'
import styles from './index.module.scss'
import JobCard from '../../components/job-card'
import ErrorMessage from '../../components/error'

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    error,
    cursor,
    loading,
    count,
    entities: { jobs },
  } = useSelector((state: RootState) => state.jobs)

  const loadMoreJobs: () => void = () => {
    dispatch(fetchJobs(cursor))
  }

  useEffect(() => {
    dispatch(fetchJobs(cursor))
  }, [])

  return (
    <NavbarWithSearch>
      <div className={styles.wrapper}>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className={styles.jobsContainer}>
            <h3>All Jobs ({count})</h3>
            <div className={styles.jobs}>
              {Object.values(jobs).map((item) => (
                <JobCard key={item.id} job={item} />
              ))}
            </div>
            {cursor < count && (
              <button onClick={loadMoreJobs}>View more</button>
            )}
          </div>
        )}
      </div>
    </NavbarWithSearch>
  )
}

export default Home
