import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { personalInterestsAPI } from "../features/personalInterests/personalInterestsAPI";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import type { PersonalInterests } from "../types/types";

const PersonalInterests = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.user_id || 0;
  const [interests, setInterests] = useState<string[]>([""]);
  const [newInterests, setNewInterests] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // RTK Query hooks
  const [fetchUserInterests, { isLoading: isFetching }] = personalInterestsAPI.useLazyGetUserInterestsQuery();
  const [createInterest, { isLoading: isCreating }] = personalInterestsAPI.useCreatePersonalInterestMutation();

  useEffect(() => {
    if (userId) {
      getUserInterests();
    }
  }, [userId]);

  // Fetch user interests
  const getUserInterests = async () => {
    try {
      const response = await fetchUserInterests(userId).unwrap();
      // console.log("User Interests Response:", response);
  
      if (response && response.length > 0) {
        const userInterests = response[0]?.personalIntrests
          ?.map((item: any) => item.personal_interests.split(", "))
          .flat(); // Flatten the array
  
        setInterests(userInterests.length > 0 ? userInterests : [""]);
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
      toast.error("Failed to load your interests");
    }
  };

    const handleInputChange = (index: number, value: string) => {
      const updatedInterests = [...newInterests];
      updatedInterests[index] = value;
      setNewInterests(updatedInterests);
    };

    // Add this function to remove an interest field
    const removeInterest = (index: number) => {
      if (newInterests.length > 1) {
        const updatedInterests = [...newInterests];
        updatedInterests.splice(index, 1);
        setNewInterests(updatedInterests);
      }
    };

  const addInterest = () => setNewInterests([...newInterests, ""]);

  // Submit Interests
  const handleSubmitNewInterests = async () => {
    if (!userId) {
      toast.error("You need to be logged in to save interests");
      return;
    }
    const validInterests = newInterests.filter((interest) => interest.trim() !== "");
    if (validInterests.length === 0) {
      toast.warning("Please add at least one interest");
      return;
    }
    setIsLoading(true);
    try {
      // Join the array into a single comma-separated string
      const interestsString = validInterests.join(", ");
      
      await createInterest({
        student_id: userId,
        personal_interests: interestsString
      }).unwrap();
  
      toast.success("Interests saved successfully!");
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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
  
      {/* Main Content */}
      <div className="flex flex-col flex-grow m-6 p-8 overflow-y-auto">
        <div className="max-w-8xl">
          {/* List of Interests */}
          <div className="p-6 shadow-lg rounded-lg bg-gray-50 mb-6">
            <h2 className="text-2xl font-semibold text-center mb-2">
              Your Personal Interests
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {interests.length > 0 && interests[0] !== "" ? (
                interests.map((interest, index) => (
                  <div key={index} className="p-2 border rounded bg-white shadow-sm">
                    {interest}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No interests found. Please add some!</p>
              )}
            </div>
          </div>
  
          {/* Add Interests Section */}
          <div className="p-6 shadow-lg rounded-lg bg-gray-50">
            <h2 className="text-2xl font-semibold text-center mb-2">Add Interests</h2>
            <p className="text-sm text-center text-gray-500 mb-4">
              Enter your personal interests below (e.g., sports, hobbies, activities).
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {newInterests.map((interest, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={interest}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder="Enter an interest"
                      className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cards"
                    />
                    {newInterests.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInterest(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </form>
            <button
              type="button"
              onClick={addInterest}
              className="mt-3 p-2 bg-cards text-white rounded"
            >
              + Add Interest
            </button>
          </div>
  
          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            {isLoading || isCreating ? (
              <div className="flex items-center">
                <ClipLoader color="#3B82F6" size={35} />
                <p className="ml-3 text-lg">Saving your interests...</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSubmitNewInterests}
                className="w-3/4 p-3 bg-cards text-white font-bold rounded"
                disabled={isFetching}
              >
                Save Interests
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default PersonalInterests;
