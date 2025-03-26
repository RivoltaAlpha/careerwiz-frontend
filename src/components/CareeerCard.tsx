import React, { useEffect } from "react";
import { CareerCardProps } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { BiCart, BiNotepad } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { careerInterestsAPI } from "../features/careerInterests/careerInterestsAPI";

const CareerCard: React.FC<CareerCardProps> = ({ career_id, career_name, image, interests }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.userAuth);
  const navigate = useNavigate();
  const [createCareerInterest, { isLoading }] = careerInterestsAPI.useCreateCareerInterestMutation();

  useEffect(() => {
      if (isAuthenticated){
          navigate('/career-info/id')
      } 
  }, [isAuthenticated,navigate]);

  const handleExplore = () => {
    navigate(`/career-info/${career_id}`);
  };

  const addToCart = async () => {
    if(isAuthenticated && user){
      try {
        // Create a new career interest
        await createCareerInterest({
          student_id: user?.user_id,
          career_id: career_id,
          // interest_level: "high", 
        }).unwrap();
        
        toast.success(`Added ${career_name} to your interests!`);
      } catch (error) {
        console.error("Failed to add career interest:", error);
        toast.error("Failed to add to interests. Please try again.");
      }
    } else {
      toast.warning("Please log in to add items to your interests");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      <ToastContainer/>
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="w-[500px] object-cover md-w-full" src={image} alt={career_name} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{career_name}</div>
          <h2 className="text-2xl font-bold mb-2">Career ID: {career_id}</h2>
          <h3 className="text-gray-600">
            <span className="font-semibold">Interests: </span>
            {interests.map((interest: string, index: number) => (
              <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg text-sm mx-1">
                {interest.trim()}
              </span>
            ))}
          </h3>
          <div className="flex gap-2 items-center justify-center">
            <button
              type="button"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
              onClick={handleExplore}>
              <BiNotepad/>
              Explore
            </button>
            <button
              type="button"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
              onClick={addToCart}
              disabled={isLoading}>
              <BiCart/>
              {isLoading ? "Adding..." : "Add"} 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
    
    