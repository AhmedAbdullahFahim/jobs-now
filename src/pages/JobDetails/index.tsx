import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../store'
import { fetchJobById } from '../../store/slices/jobSlice'
import Loading from '../../components/loading'
import styles from './index.module.scss'
import ErrorMessage from '../../components/error'
import NavbarWithSidebar from '../../layouts/navbar-with-sidebar'
import SkillCard from '../../components/skill-card'

const JobDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const params = useParams()
  const id = params.uuid
  const { job, loading, error } = useSelector((state: RootState) => state.job)

  useEffect(() => {
    if (id) dispatch(fetchJobById(id))
  }, [id])

  if (loading) return <Loading />

  if (error) return <ErrorMessage message={error} />

  return (
    <NavbarWithSidebar title={job?.attributes?.title}>
      <div className={styles.container}>
        <h5>Related Skills: </h5>
        <div className={styles.skillsContainer}>
          {job.relationships.skills.map((skill) => (
            <SkillCard key={skill.id} id={skill.id} />
          ))}
        </div>
      </div>
    </NavbarWithSidebar>
  )
}

export default JobDetails
