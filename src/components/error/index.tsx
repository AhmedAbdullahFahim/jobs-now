import React from 'react'
import styles from './index.module.scss'

interface Props {
  message: string
}

const ErrorMessage: React.FC<Props> = ({ message }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h5>{message}</h5>
    </div>
  )
}

export default ErrorMessage
