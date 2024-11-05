import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Job } from '../../../types'
import ErrorMessage from '../../components/error'
import Loading from '../../components/loading'
import NavbarWithSidebar from '../../layouts/navbar-with-sidebar'
import { AppDispatch, RootState } from '../../store'
import { fetchSkillById } from '../../store/slices/skillsSlice'
import styles from './index.module.scss'

const SkillDetails: React.FC = () => {
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const params = useParams()
  const id = params.uuid
  const { loading, error } = useSelector((state: RootState) => state.skills)
  const { jobs } = useSelector((state: RootState) => state.jobs.entities)

  const skill = useSelector(
    (state: RootState) => state.skills.entities.skills[id ?? '']
  )

  useEffect(() => {
    if (!skill && id) dispatch(fetchSkillById(id))
  }, [skill, id])

  useEffect(() => {
    if (skill) {
      console.log('skill', skill)
      const newJobs: Job[] = []
      skill.relationships.jobs.forEach((jobRef: { id: string }) => {
        const jobId = jobRef.id
        const job = jobs[jobId]
        newJobs.push(job)
      })
      setRelatedJobs(newJobs)
    }
  }, [skill])

  useEffect(() => {
    console.log('related jobs', relatedJobs)
  }, [relatedJobs])

  if (loading) return <Loading />

  if (error) return <ErrorMessage message={error} />

  return (
    <NavbarWithSidebar title={skill?.name}>
      <div className={styles.container}>
        <div className={styles.description}>
          <h5>Description: </h5>
          <p>Skills have no description in the api...</p>
        </div>
        <h5>Related Jobs: </h5>
        {/* <div className={styles.skillsContainer}>
          {job.relationships.skills.map((skill) => (
            <SkillCard key={skill.id} id={skill.id} />
          ))}
        </div> */}
      </div>
    </NavbarWithSidebar>
  )
}

export default SkillDetails
