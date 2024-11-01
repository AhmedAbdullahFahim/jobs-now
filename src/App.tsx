import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import JobsSearch from './pages/JobsSearch'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/jobs' index element={<Home />} />
        <Route path='/jobs/search' element={<JobsSearch />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
