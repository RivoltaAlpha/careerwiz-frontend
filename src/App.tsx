import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing'
import Login from './pages/Login';
import Register from './pages/Register';
import Feedback from './pages/Feedback';
import ContactSection from './pages/ContactUs';

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
          <Route path="/explore" element={<Register />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<ContactSection />} />
        </Routes>
      </div>
      </Router>
    </>
  )
}

export default App
