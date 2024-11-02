import React, { useEffect } from 'react'
import NavbarWithSearch from '../layouts/NavbarWithSearch'
import { getJobs } from '../network/apis'

const Home = () => {
  const API_getJobs = async () => {
    const response = await getJobs()
  }

  useEffect(() => {
    API_getJobs()
  }, [])

  return (
    <NavbarWithSearch>
      <h1>home</h1>
    </NavbarWithSearch>
  )
}

export default Home
