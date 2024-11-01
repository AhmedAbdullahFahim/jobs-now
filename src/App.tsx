import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import JobsSearch from './pages/JobsSearch'
import History from './pages/History'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/jobs' index element={<Home />} />
        <Route path='/jobs/search' element={<JobsSearch />} />
        <Route path='/history' index element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
