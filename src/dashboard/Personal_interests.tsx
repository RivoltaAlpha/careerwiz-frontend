import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { personalInterestsAPI } from "../features/personalInterests/personalInterestsAPI";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

const PersonalInterests = () => {
  const { user } = useSelector((state: RootState) => state.userAuth);
  const userId = user?.user_id || 0;
  const [interests, setInterests] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // fetch interests from the API
  // RTK Query hooks
  const [fetchUserInterests, { isLoading: isFetching }] = personalInterestsAPI.useLazyGetUserInterestsQuery();
  const [createInterest, { isLoading: isCreating }] = personalInterestsAPI.useCreatePersonalInterestMutation();

  // Fetch user interests when component mounts
  useEffect(() => {
    if (userId) {
      getUserInterests();
    }
  }, [userId]);

    // Function to fetch user interests
    const getUserInterests = async () => {
      try {
        const response = await fetchUserInterests(userId).unwrap();
        
        if (response && response.length > 0) {
          // Map the interests from API response to the format needed for the form
          const userInterests = response.map((item: any) => item.interest || "");
          setInterests(userInterests.length > 0 ? userInterests : [""]);
        }
      } catch (error) {
        console.error("Error fetching interests:", error);
        toast.error("Failed to load your interests");
      }
    };

  // Handle Interest Input
  const handleInterestChange = (index: number, value: string) => {
    const updatedInterests = [...interests];
    updatedInterests[index] = value;
    setInterests(updatedInterests);
  };

  // Add Subject & Interest Fields
  const addInterest = () => setInterests([...interests, ""]);
  
    // Submit Interests to API
    const handleSubmitInterest = async () => {
      if (!userId) {
        toast.error("You need to be logged in to save interests");
        return;
      }
  
      // Filter out empty interests
      const validInterests = interests.filter(interest => interest.trim() !== "");
      
      if (validInterests.length === 0) {
        toast.warning("Please add at least one interest");
        return;
      }
  
      setIsLoading(true);
  
      try {
        // Create interests one by one
        for (const interest of validInterests) {
          await createInterest({
            student_id: userId,
            interest: interest.trim()
          }).unwrap();
        }
        
        toast.success("Interests saved successfully!");
        
        // Optional: redirect or fetch updated interests
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard");
        }, 1500);
        
      } catch (error) {
        console.error("Error submitting interests:", error);
        toast.error("Failed to save interests");
        setIsLoading(false);
      }
    };


  // Submit Data to API
  const handleSubmit = async () => {
    setIsLoading(true); // Show loader
    const payload = { interests };

    try {
      const response = await axios.post("https://recommendationmodel-fbarbzdsczhqhphb.southafricanorth-01.azurewebsites.net/predict_career", payload);
      console.log("Success:", response.data);
      if (response.status === 200) {
        localStorage.setItem("recommendations", JSON.stringify(response.data));
        // set timeout and loader 
        setTimeout(() => {
          setIsLoading(false);
        navigate("/recommendations");
        }
        , 2000);
      }
    } catch (error) {
      console.error("Error submitting:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
        <Header />
        <div className="max-w-8xl mx-20 p-6 h-screen">
      {/* list user interests and a text if lengh is zero */}
      <div className="shadow-2xl p-4 rounded-lg bg-gray-50 mb-10 hover:translate-x-6 ">
        <h2 className="text-3xl font-semibold text-center mb-2">Personal Interests</h2>
        <p className="text-sm text-center text-gray-500 mb-4">List your personal interests below. These could be anything from sports, hobbies, activities, etc.</p>
        <div className="grid grid-cols-2 gap-4">
          {interests.map((interest, index) => (
              <input
              key={index}
              type="text"
              value={interest}
              onChange={(e) => handleInterestChange(index, e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter an interest"
              />
            ))}
        </div>
        <button type="button" onClick={addInterest} className="mt-3 p-2 bg-cards text-white rounded">
          + Add Interest
        </button>
      </div>

      {/* Interests Section */}
      <div className="shadow-2xl p-4 rounded-lg bg-gray-50 mb-10 hover:translate-x-6 ">
        <h2 className="text-3xl font-semibold text-center mb-2">Interests</h2>
        <p className="text-sm text-center text-gray-500 mb-4">Give us a list of personal interests that you have. It could be anything you can think of!! </p>
        <div className="grid grid-cols-2 gap-4">
          {interests.map((interest, index) => (
              <input
              key={index}
              type="text"
              value={interest}
              onChange={(e) => handleInterestChange(index, e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter an interest"
              />
            ))}
        </div>
        <button type="button" onClick={addInterest} className="mt-3 p-2 bg-cards text-white rounded">
          + Add Interest
        </button>
      </div>
      </div>
      {isLoading ? (
        <div className="mt-6 flex justify-center items-center">
        <div className="absolute inset-0 bg-gray-900 opacity-50 z-50 pointer-events-none"></div>
        <ClipLoader color="cards" size={35} />
        <p className="ml-3 text-lg">Processing your recommendations...</p>
      </div>
        ):(
      <button type="button" onClick={handleSubmit} className="mt-6 w-3/4 p-2 bg-cards text-white font-bold rounded lg:ml-[12%]">
        Submit
      </button>
      )}

      

    <div className="max-w-8xl mx-20 p-6 h-screen">
      {/* Personal Interests Section */}
      <div className="shadow-2xl p-4 rounded-lg bg-gray-50 mb-10 hover:translate-x-6">
        <h2 className="text-3xl font-semibold text-center mb-2">Personal Interests</h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          List your personal interests below. These could be anything from sports, hobbies, activities, etc.
        </p>
        
        {isFetching ? (
          <div className="flex justify-center py-8">
            <ClipLoader color="#3B82F6" size={35} />
            <p className="ml-3">Loading your interests...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {interests.map((interest, index) => (
              <input
                key={index}
                type="text"
                value={interest}
                onChange={(e) => handleInterestChange(index, e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter an interest"
              />
            ))}
          </div>
        )}
        
        <button 
          type="button" 
          onClick={addInterest} 
          className="mt-3 p-2 bg-cards text-white rounded"
          disabled={isFetching}
        >
          + Add Interest
        </button>
      </div>
      
      {/* Submit Button with Loading State */}
      {(isLoading || isCreating) ? (
        <div className="mt-6 flex justify-center items-center">
          <div className="fixed inset-0 bg-gray-900 opacity-50 z-40"></div>
          <div className="flex items-center justify-center z-50 relative">
            <ClipLoader color="#3B82F6" size={35} />
            <p className="ml-3 text-lg">Saving your interests...</p>
          </div>
        </div>
      ) : (
        <button 
          type="button" 
          onClick={handleSubmit} 
          className="mt-6 w-3/4 p-2 bg-cards text-white font-bold rounded lg:ml-[12%]"
          disabled={isFetching}
        >
          Save Interests
        </button>
      )}
    </div>
  </>
  );
};

export default PersonalInterests;
