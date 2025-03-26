import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const PersonalInterests = () => {
  const [interests, setInterests] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Interest Input
  const handleInterestChange = (index: number, value: string) => {
    const updatedInterests = [...interests];
    updatedInterests[index] = value;
    setInterests(updatedInterests);
  };

  // Add Subject & Interest Fields
  const addInterest = () => setInterests([...interests, ""]);
  
  const navigate = useNavigate();
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
    </>
  );
};

export default PersonalInterests;
