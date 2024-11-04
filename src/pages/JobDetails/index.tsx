import React from 'react'
import { useParams } from 'react-router-dom'

const JobDetails: React.FC = () => {
  const params = useParams()
  const id = params.uuid
  console.log('params', params)

  return <div>{id}</div>
}

export default JobDetails
