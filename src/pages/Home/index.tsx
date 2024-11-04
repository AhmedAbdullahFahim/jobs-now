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
    dispatch(fetchJobs({ cursor }))
  }

  useEffect(() => {
    dispatch(fetchJobs({ cursor }))
  }, [])

  return (
    <NavbarWithSearch>
      <div className='wrapper'>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : Object.values(jobs).length === 0 ? (
          <h2>Oops, we couldn't find any jobs</h2>
        ) : (
          <section className={'jobsContainer'}>
            <h3>All Jobs ({count})</h3>
            <div className={'jobs'}>
              {Object.values(jobs).map((item) => (
                <JobCard key={item.id} job={item} />
              ))}
            </div>
            {cursor < count && (
              <button onClick={loadMoreJobs}>View more</button>
            )}
          </section>
        )}
      </div>
    </NavbarWithSearch>
  )
}

export default Home
