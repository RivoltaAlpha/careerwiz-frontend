import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing'
import Login from './pages/Login';
import Register from './pages/Register';
import Feedback from './pages/Feedback';
import ContactSection from './pages/ContactUs';
import Profile from './dashboard/Profile';
import Dashboard from './dashboard/Dashboard';
import ProfileEditPage from './dashboard/profileUpdate';
import AboutUs from './pages/About';
import UserFeedback from './dashboard/UserFeedback';
import InputPage from './pages/InputPage';
import OutputPage from './pages/OutputPage';
import StudentAcademics from './dashboard/Academics';
import PersonalInterests from './dashboard/Personal_interests';
import Explore from './pages/Explore';
import './index.css'
import ViewCareer from './pages/viewCareer';

function App() {

  return (
    <>
      <Router>
      <div className="flex flex-col text-black bg-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/predictions" element={<InputPage />} />
          <Route path="/recommendations" element={<OutputPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore-career/:id" element={<ViewCareer />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<ContactSection />} />

          {/* User Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/academics/:id" element={<StudentAcademics />} />
          <Route path="/student-interests/:id" element={<PersonalInterests />} />
          {/* 
          <Route path="/student-recommendations" element={<Recommendations />} />
          <Route path="/career-cart" element={<CareerCart />} /> 
          */}
          <Route path="/user-feedback" element={<UserFeedback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-edit" element={<ProfileEditPage />} />
          
          {/* Icon routes */}
          <Route path="/student-recommendations" element={<div>Page R</div>} />
          <Route path="/profile" element={<div>Page P</div>} />
          <Route path="/academics" element={<div>Page A</div>} />
          <Route path="/feedback" element={<div>Page F</div>} />

        </Routes>
      </div>
      </Router>
    </>
  )
}

export default App
