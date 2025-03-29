import { Link, useNavigate } from "react-router-dom";
import Academics from '../components/Academics';
import Sidebar from '../components/Sidebar'; 
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { TUser } from "../types/types";
import Interests from "../components/Intrests";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user?.user) as TUser | null;
  const userId = user?.user_id || 0;
  const navigate = useNavigate();

  const navigatetoCareer = () => {
    navigate(`/career-cart/${userId}`, { state: { userId } });
  }
  const navigatetoExplore = () => {
    navigate("/explore", { state: { userId } });
  }
  const navigatetoPersonal = () => {
    navigate(`/student-interests/${userId}`, { state: { userId } });
  }
  const navigatetoRecommendations = () => {
    navigate(`/student-recommendations/${userId}`, { state: { userId } });
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-100 shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-8 overflow-y-auto">
        {/* Quick Links */}
        <div className="flex gap-4 mb-6">
          {["R", "P", "A", "F"].map((letter) => (
            <Link
              to={`/${letter.toLowerCase()}`}
              key={letter}
              className="w-16 h-16 flex items-center justify-center rounded-full border border-gray-400 text-lg font-bold hover:bg-gray-200 transition"
            >
              {letter}
            </Link>
          ))}
        </div>

        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full text-center">
          <h2 className="text-xl font-semibold">Welcome to your Career Guide, {user?.username}!</h2>
        </div>

        {/* Academics & Interests Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Academics />
          <Interests />
        </div>

        {/* Career Path Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md my-10 text-center">
          <h2 className="text-lg font-semibold">
            Process of generating a career path based on your interests and academic performance.
          </h2>
        </div>

        {/* Career Path & Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Career Path</h2>
            <p className="mt-2">Set a career path by selecting your interests.</p>
            <button type="button" className="mt-4 p-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition" onClick={navigatetoCareer}>
              Choose a Career Path
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Explore Careers</h2>
            <p className="mt-2">Explore a variety of courses offered</p>
            <button type="button" className="mt-4 p-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition" onClick={navigatetoExplore}>
              Explore Courses
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Personal Interests </h2>
            <p className="mt-2">Set a career path by selecting your interests.</p>
            <button type="button" className="mt-4 p-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition" onClick={navigatetoPersonal}>
              Personal Interests
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Recommendations</h2>
            <p className="mt-2">Based on your interests and academic performance.</p>
            <button type="button" className="mt-4 p-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition" onClick={navigatetoRecommendations}>
              Generate Recommendations
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full flex justify-end mt-8">
          <Link to="/feedback" className="text-gray-500 hover:text-gray-700 transition">
            Feedback?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
