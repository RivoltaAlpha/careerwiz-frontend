import React from "react"; // Ensure React is imported for JSX
import { CareerCardProps } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { BiCart, BiNotepad } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { careerInterestsAPI } from "../features/careerInterests/careerInterestsAPI";

const CareerCard: React.FC<CareerCardProps> = ({ career_id, career_name,description,subjects,requirements, image, interests = [] }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.userAuth);
  const navigate = useNavigate();
  const [createCareerInterest, { isLoading }] = careerInterestsAPI.useCreateCareerInterestMutation();

  const handleExplore = () => {
      // store selected career in redux store
      localStorage.setItem("selectedCareer", JSON.stringify({ career_id, career_name, description, subjects, requirements, image, interests }));
      navigate(`/explore-career/${career_id}`);
  };

  const addToCart = async () => {
    if(isAuthenticated && user){
      try {
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
    <div className="flex-col">
      <ToastContainer/>
      <div className="bg-white  shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
        <div className="md:flex flex-col">
          <div className="md:flex-shrink-0">
            <img className="w-[500px] object-cover md-w-full" src={image} alt={career_name} />
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2">Career: {career_name}</h2>
            <p className="mt-2  text-black">Description:{description}</p>
            <p className="mt-2  text-black">Requirements: {requirements}</p>
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
    </div>
  );
};

export default CareerCard;
    
    