import { GrPrevious } from "react-icons/gr";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { careerInterestsAPI } from "../features/careerInterests/careerInterestsAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BiCart } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";


 const ViewCareer = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.userAuth);
  const [createCareerInterest, { isLoading }] = careerInterestsAPI.useCreateCareerInterestMutation();
  const navigate = useNavigate();
 const handleBack = () => {
    navigate("/explore");
    localStorage.removeItem("selectedCareer");
    };
    const selectedCareer = JSON.parse(localStorage.getItem("selectedCareer") || "{}");

  const addToCart = async () => {
    if(isAuthenticated && user){
      try {
        await createCareerInterest({
          student_id: user?.user_id,
          career_id: selectedCareer?.career_id,
          // interest_level: "high", 
        }).unwrap();        
        toast.success(`Added ${selectedCareer?.career_name} to your interests!`);
      } catch (error) {
        console.error("Failed to add career interest:", error);
        toast.error("Failed to add to interests. Please try again.");
      }
    } else {
      toast.warning("Please log in to add items to your interests");
    }
  };

    return (
        <>
        <Header/>   
        <div className="max-w-8xl mx-20 p-6 h-screen justify-center items-center">
        <ToastContainer/>
        <div className="bg-white  shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <div className="md:flex flex-col">
            <div className="md:flex-shrink-0">
                <img className="w-[500px] object-cover md-w-full" src={selectedCareer?.image} alt={selectedCareer?.career_name} />
            </div>
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-2">Career: {selectedCareer?.career_name}</h2>
                <p className="mt-2  text-black">Description:{selectedCareer?.description}</p>
                <p className="mt-2  text-black">Requirements: {selectedCareer?.requirements}</p>
                <p className="mt-2  text-black">Subjects: {selectedCareer?.subjects}</p>            
                <h3 className=" text-black">
                <span className="font-semibold">Interests: </span>
                {Array.isArray(selectedCareer?.interests) && selectedCareer?.interests.length > 0 ? (
                    selectedCareer?.interests.map((interest: string, index: number) => (
                        <span key={index} className="bg-gray-200 text-gray-900 px-2 py-1 rounded-lg text-sm mx-1">
                        {interest.trim()}
                    </span>
                    ))
                ) : (
                    <span className="text-gray-400">No interests specified</span>
                )}
                </h3>
                <div className="flex gap-2 items-center justify-center">
                <button
                    type="button"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
                    onClick={handleBack}>
                    <GrPrevious/>
                    Back
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
    </>
    );
}

export default ViewCareer