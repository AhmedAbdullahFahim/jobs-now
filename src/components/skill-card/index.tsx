import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import styles from './index.module.scss'
import Loading from '../loading'
import { Link } from 'react-router-dom'

type Props = {
  id: string
}

const SkillCard: React.FC<Props> = ({ id }: Props) => {
  const skill = useSelector(
    (state: RootState) => state.skills.entities.skills[id]
  )
  return (
    <article className={styles.card}>
      {!!skill ? (
        <>
          <Link to={`/skill/${id}`}>{skill.name}</Link>
          <p>
            the ability to communicate information and ideas in speaking so
            others will understand.
          </p>
          <div className={styles.row}>
            <div className={styles.item}>
              <label>Type: </label>
              <p>{skill.type}</p>
            </div>
            <div className={styles.item}>
              <label>Importance: </label>
              <p>{skill.importance}</p>
            </div>
            <div className={styles.item}>
              <label>Level: </label>
              <p>{skill.level}</p>
            </div>
          </div>
        </>
      ) : (
        <h5>Loading...</h5>
      )}
    </article>
  )
}

export default SkillCard
