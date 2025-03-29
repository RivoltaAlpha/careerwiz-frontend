import { Link } from "react-router-dom";
import Academics from '../components/Academics';
import Interests from '../components/Intrests';
import Sidebar from '../components/Sidebar'; 
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { TUser } from "../types/types";


const Dashboard = () => {
    const user = useSelector((state: RootState) => state.user?.user) as TUser | null;
    
  return (
    <div className="flex gap-40 justify-center min-h-screen">
      < Sidebar />
      <div className="flex flex-col flex-grow m-6 p-8 overflow-y-auto">
      <div className="flex gap-4 mt-4">
        {["R", "P", "A", "F"].map((letter) => (
          <Link
            to={`/${letter.toLowerCase()}`}
            key={letter}
            className="w-20 h-20 flex items-center justify-center rounded-full border border-gray-400 text-lg font-bold hover:bg-gray-200"
          >
            {letter}
          </Link>
        ))}
      </div>

      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-md my-4 w-full max-w-lg text-center">
        <h2 className="text-lg font-semibold">Welcome to your Career guide {user?.username}...</h2>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        <Academics />
        <Interests />
      </div>

      {/* Footer */}
      <div className="w-full max-w-4xl flex justify-end mt-6">
        <Link to="/feedback" className="text-gray-500 cursor-pointer hover:text-gray-700">
          Feedback?
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
