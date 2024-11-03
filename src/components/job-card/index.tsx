import React from 'react'
import { Link } from 'react-router-dom'
import { Job } from '../../../types'
import Tag from '../tag'
import styles from './index.module.scss'

interface Props {
  job: Job
}

const JobCard: React.FC<Props> = ({ job }: Props) => {
  return (
    <div className={styles.card}>
      <h6>{job.attributes.title}</h6>
      <div className={styles.skillsWrapper}>
        <p>Related Skills:</p>
        <div className={styles.skills}>
          {job.relationships.skills.map((skill, index) => (
            <Tag key={`${skill.id} ${index}`} id={skill.id} />
          ))}
        </div>
      </div>
      <Link to='/jobs/search'>View job details</Link>
    </div>
  )
}

export default JobCard
