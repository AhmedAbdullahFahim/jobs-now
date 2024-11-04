import React from 'react'
import { Link } from 'react-router-dom'
import { Job } from '../../../types'
import Tag from '../tag'
import styles from './index.module.scss'

interface Props {
  job: Job
  stylingClassName?: string
}

const JobCard: React.FC<Props> = ({ job, stylingClassName }: Props) => {
  return (
    <article className={`${styles.card} ${stylingClassName}`}>
      <h6>{job.attributes.title}</h6>
      <div className={styles.skillsWrapper}>
        <p>Related Skills:</p>
        <div className={styles.skills}>
          {job.relationships.skills.map((skill, index) => (
            <Tag key={`${skill.id} ${index}`} id={skill.id} />
          ))}
        </div>
      </div>
      <Link to={`/job/${job.id}`}>View job details</Link>
    </article>
  )
}

export default JobCard
