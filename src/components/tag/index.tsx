import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import styles from './index.module.scss'

interface Props {
  id: string
}

const Tag: React.FC<Props> = ({ id }: Props) => {
  const skill = useSelector(
    (state: RootState) => state.skills.entities.skills[id]
  )

  return (
    <button key={id} className={styles.skill} onClick={() => {}}>
      {!!skill ? skill?.name : 'loading...'}
    </button>
  )
}

export default Tag
