import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing'
import Login from './pages/Login';
import Register from './pages/Register';
import Feedback from './pages/Feedback';
import ContactSection from './pages/ContactUs';
import Profile from './dashboard/Profile';

import './index.css'
import Dashboard from './dashboard/Dashboard';
import ProfileEditPage from './dashboard/profileUpdate';
import AboutUs from './pages/About';
import UserFeedback from './dashboard/UserFeedback';

function App() {

  return (
    <>
      <Router>
      <div className="flex flex-col text-black bg-gray-100">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-edit" element={<ProfileEditPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-feedback" element={<UserFeedback />} />
          <Route path="/r" element={<div>Page R</div>} />
          <Route path="/p" element={<div>Page P</div>} />
          <Route path="/a" element={<div>Page A</div>} />
          <Route path="/f" element={<div>Page F</div>} />

        </Routes>
      </div>
      </Router>
    </>
  )
}

export default App
