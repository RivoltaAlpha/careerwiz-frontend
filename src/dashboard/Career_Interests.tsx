import Sidebar from "../components/Sidebar";
import { careerInterestsAPI } from "../features/careerInterests/careerInterestsAPI";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Career, TUser } from "../types/types";
import { RootState } from "../app/store";

const CareerCart = () => {
    const user = useSelector((state: RootState) => state.user?.user) as TUser;
    const userId = user?.user_id;
    const navigate = useNavigate();
    
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
    
    // Fetch career interests
    const { data: careerInterestsData, isLoading, error } = 
      careerInterestsAPI.useGetUserCareerInterestsQuery(userId || 0);
    
    // Set first career as selected by default when data loads
    useEffect(() => {
      if (careerInterestsData && 
          careerInterestsData.length > 0 && 
          careerInterestsData[0].careerInterests && 
          careerInterestsData[0].careerInterests.length > 0) {
        setSelectedCareer(careerInterestsData[0].careerInterests[0].career);
      }
    }, [careerInterestsData]);
    
    const handleSelectCareer = (career: Career) => {
      setSelectedCareer(career);
    };
    
    const navigateToExplore = () => {
      navigate('/explore'); 
    };
    
    const navigateToRecommendations = () => {
      navigate(`/student-recommendations/${userId}`); 
    };
  
    return (
      <div className="flex md:flex-row h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-grow m-6 p-8 overflow-y-auto">
         <h1 className="text-2xl font-bold mb-4">Career Interests</h1>
          
          {isLoading && (
            <div className="text-center py-4">
              <p className="text-gray-600">Loading your career interests...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-4">
              <p className="text-red-500">Error loading career interests. Please try again.</p>
            </div>
          )}
          
          {!isLoading && !error && careerInterestsData && careerInterestsData.length > 0 ? (
            <div className="flex flex-col md:flex-row w-8xl gap-4">
              {/* List of selected careers */}
              <div className="md:w-1/2 p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Selected Careers</h2>
                {careerInterestsData[0].careerInterests.length > 0 ? (
                  <ul className="space-y-2">
                    {careerInterestsData[0].careerInterests.map((item) => (
                      <li 
                        key={item.careerInterests_id}
                        className={`p-3 rounded-lg cursor-pointer ${selectedCareer?.career_id === item.career.career_id ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-100'}`}
                        onClick={() => handleSelectCareer(item.career)}
                      >
                        <div className="font-medium">{item.career.career_name}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No career interests added yet.</p>
                )}
              </div>
              
              {/* Career details */}
              <div className="md:w-1/2 p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Career Details</h2>
                {selectedCareer ? (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">{selectedCareer.career_name}</h3>
                    <p className="text-gray-700">{selectedCareer.description}</p>
                    <div className="mt-4">
                      <p className="font-medium">Requirements:</p>
                      <p className="text-gray-600">{selectedCareer.requirements}</p>
                    </div>
                    <div className="mt-2">
                      <p className="font-medium">Subjects:</p>
                      <p className="text-gray-600">{selectedCareer.subjects}</p>
                    </div>
                    <div className="mt-2">
                      <p className="font-medium">Interests:</p>
                      <p className="text-gray-600">{selectedCareer.interests}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">Select a career to view details.</p>
                )}
              </div>
            </div>
          ) : (
            !isLoading && !error && (
              <div className="text-center py-4">
                <p className="text-gray-600">No career interests found. Start exploring to add some!</p>
              </div>
            )
          )}
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button type="button" className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-600"
                    onClick={navigateToExplore}>
              Explore More Careers
            </button>
            <button type="button" className="px-4 py-2 bg-blue-400 text-black rounded hover:bg-blue-600"
                    onClick={navigateToRecommendations}>
              View Recommendations
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default CareerCart