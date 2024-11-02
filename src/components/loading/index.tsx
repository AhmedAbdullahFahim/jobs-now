import React from 'react'
import styles from './index.module.scss'

const Loading: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader} />
    </div>
  )
}

export default Loading
