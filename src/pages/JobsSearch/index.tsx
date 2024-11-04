import { useLocation } from 'react-router-dom'
import NavbarWithSearch from '../../layouts/NavbarWithSearch'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import styles from './index.module.scss'
import { useEffect } from 'react'
import { fetchJobs } from '../../store/slices/jobsSlice'
import Loading from '../../components/loading'
import ErrorMessage from '../../components/error'
import JobCard from '../../components/job-card'
import Sidebar from '../../components/sidebar'

const JobsSearch: React.FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get('query')
  const { searchHistory } = useSelector(
    (state: RootState) => state.searchHistory
  )
  const dispatch = useDispatch<AppDispatch>()
  const {
    error,
    cursor,
    loading,
    count,
    entities: { jobs },
  } = useSelector((state: RootState) => state.jobs)

  useEffect(() => {
    dispatch(fetchJobs({ search: searchQuery ?? '' }))
  }, [searchQuery])

  return (
    <NavbarWithSearch>
      <div className={'wrapper'}>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <section className={'jobsContainer'}>
            <h3>All Jobs ({count})</h3>
            <div className={'content'}>
              {Object.values(jobs).length ? (
                <div
                  className={'jobs'}
                  style={{ flex: searchHistory?.length ? 0.75 : 1 }}
                >
                  {Object.values(jobs).map((item) => (
                    <JobCard
                      stylingClassName={styles.jobCard}
                      key={item.id}
                      job={item}
                    />
                  ))}
                </div>
              ) : (
                <h2>Oops, we could not find any jobs...</h2>
              )}
              {searchHistory?.length ? (
                <Sidebar
                  title={'Search History:'}
                  list={searchHistory}
                  search={true}
                />
              ) : null}
            </div>
          </section>
        )}
      </div>
    </NavbarWithSearch>
  )
}

export default JobsSearch
