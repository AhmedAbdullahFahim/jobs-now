import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import JobsSearch from './pages/JobsSearch'
import History from './pages/History'
import Home from './pages/Home'
import JobDetails from './pages/JobDetails'
import SkillDetails from './pages/SkillDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/jobs' index element={<Home />} />
        <Route path='/jobs/search' element={<JobsSearch />} />
        <Route path='/history' index element={<History />} />
        <Route path='/job/:uuid' index element={<JobDetails />} />
        <Route path='/skill/:uuid' index element={<SkillDetails />} />
        <Route path='*' element={<Navigate to='/jobs' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
