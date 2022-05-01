import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import './App.sass'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/map" element={ <MapPage /> } />
      </Routes>
    </Router>
  )
}

export default App