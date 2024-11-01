import { useLocation } from 'react-router-dom'
import NavbarWithSearch from '../layouts/NavbarWithSearch'

const JobsSearch = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get('query')
  return (
    <NavbarWithSearch>
      <h1>{searchQuery}</h1>
    </NavbarWithSearch>
  )
}

export default JobsSearch
