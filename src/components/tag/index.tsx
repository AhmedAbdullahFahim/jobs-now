import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import styles from './index.module.scss'
import Loading from '../loading'

interface Props {
  id: string
}

const Tag: React.FC<Props> = ({ id }: Props) => {
  const skill = useSelector(
    (state: RootState) => state.skills.entities.skills[id]
  )

  return (
    <button
      key={id}
      className={styles.skill}
      onClick={() => {
        console.log(id)
      }}
    >
      {skill!! ? skill?.name : 'loading...'}
    </button>
  )
}

export default Tag
