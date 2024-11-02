import React, { useEffect } from 'react'
import NavbarWithSearch from '../../layouts/NavbarWithSearch'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from '../../store/slices/jobsSlice'
import { AppDispatch, RootState } from '../../store'
import Loading from '../../components/loading'
import styles from './index.module.scss'
import JobCard from '../../components/job-card'

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    error,
    cursor,
    loading,
    count,
    entities: { jobs },
  } = useSelector((state: RootState) => state.jobs)

  useEffect(() => {
    dispatch(fetchJobs(count))
  }, [dispatch, cursor])

  return (
    <NavbarWithSearch>
      <div className={styles.wrapper}>
        {loading ? (
          <Loading />
        ) : error ? (
          <h5>{error}</h5>
        ) : (
          <div className={styles.jobsContainer}>
            <h3>All Jobs ({count})</h3>
            <div className={styles.jobs}>
              {Object.values(jobs).map((item) => (
                <JobCard key={item.id} job={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </NavbarWithSearch>
  )
}

export default Home
