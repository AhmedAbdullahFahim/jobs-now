import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

interface Props {
  id: string
}

const Tag: React.FC<Props> = ({ id }: Props) => {
  const skill = useSelector(
    (state: RootState) => state.skills.entities.skills[id]
  )

  return (
    <Link to={`/skill/${id}`} key={id} className={styles.skill}>
      {!!skill ? skill?.name : 'loading...'}
    </Link>
  )
}

export default Tag
