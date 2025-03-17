import { Link } from "react-router-dom";
import Academics from '../components/Academics';
import Interests from '../components/Intrests';
import Sidebar from '../components/Sidebar'; 


const Dashboard = () => {
  return (
    <div className="flex flex-row gap-40 items-center min-h-screen">
      < Sidebar />
    <div className="flex flex-col items-center justify-center p-4">
      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-4">
        {["R", "P", "A", "F"].map((letter) => (
          <Link
            to={`/${letter.toLowerCase()}`}
            key={letter}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-400 text-lg font-bold hover:bg-gray-200"
          >
            {letter}
          </Link>
        ))}
      </div>

      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-md my-4 w-full max-w-lg text-center">
        <h2 className="text-lg font-semibold">Welcome to your Career guide Tiffany...</h2>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        <Academics />
        <Interests />
      </div>

      {/* Footer */}
      <div className="w-full max-w-4xl flex justify-end mt-6">
        <p className="text-gray-500 cursor-pointer hover:text-gray-700">Feedback?</p>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
