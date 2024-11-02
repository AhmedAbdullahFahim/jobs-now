import React from 'react'
import { Job } from '../../../types'
import styles from './index.module.scss'

interface Props {
  job: Job
}

const JobCard: React.FC<Props> = ({ job }: Props) => {
  return <div className={styles.card}>{job.attributes.title}</div>
}

export default JobCard
