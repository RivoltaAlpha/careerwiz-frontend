import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing'
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css'

function App() {

  return (
    <>
      <Router>
      <div className="flex flex-col text-white bg-gray-900">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      </Router>
    </>
  )
}

export default App
