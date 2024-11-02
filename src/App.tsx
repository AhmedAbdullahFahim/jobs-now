import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import JobsSearch from './pages/JobsSearch'
import History from './pages/History'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/jobs' index element={<Home />} />
        <Route path='/jobs/search' element={<JobsSearch />} />
        <Route path='/history' index element={<History />} />
        <Route path='*' element={<Navigate to='/jobs' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
