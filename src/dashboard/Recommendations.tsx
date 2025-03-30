import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { recommendationsAPI } from "../features/recommendations/recommendationsAPI";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { TUser } from "../types/types";
import { BiLoader } from "react-icons/bi";
import axios from "axios";

const Recommendations = () => {
      const user = useSelector((state: RootState) => state.user?.user) as TUser;
      const userId = user?.user_id;
      const navigate = useNavigate();
      const [Loading, setLoading] = useState(false);
      const [recommendations, setRecommendations] = useState<string[]>([]);
      const { data: recommendationAttributes, isLoading: isLoadingAttributes, error: attributesError } = recommendationsAPI.useGetRecommendationAttributesQuery(userId);

      useEffect(() => {
        const fetchRecommendations = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/get-student-recommendations/${userId}`);
            const recommendationsData = response.data;

            if (recommendationsData && 
                recommendationsData.length > 0 && 
                recommendationsData[0].recommendations && 
                recommendationsData[0].recommendations.length > 0 &&
                recommendationsData[0].recommendations[0].student_recommendations &&
                recommendationsData[0].recommendations[0].student_recommendations.recommended_courses &&
                recommendationsData[0].recommendations[0].student_recommendations.recommended_courses.length > 0
                && recommendationsData[0].recommendations[0].student_recommendations.recommended_courses[0] !== "" &&
                recommendationsData[0].recommendations[0].student_recommendations.recommended_courses[0] !== null
                && recommendationsData[0].recommendations[0].student_recommendations.recommended_courses[0] !== undefined
              ) {
              const courses = recommendationsData[0].recommendations[0].student_recommendations.recommended_courses;      
              setRecommendations(courses);
            } 
          } catch (error) {
            console.error('Error fetching recommendations:', error);
          }
        };
        if (userId) {
          fetchRecommendations();
        }
      }, [userId]);

    const handleSubmit = async () => {
      setLoading(true);
      const submitData = {
        subjects: recommendationAttributes?.[0].academics.map((academic) => academic.subjects).flat() || [],
         interests : recommendationAttributes?.[0]?.personalIntrests?.map((interest) => interest.personal_interests.split(",")).flat() || [],
      };
      // console.log("Submit Data:", submitData);
      const payload = { submitData};
      try {
        const response = await axios.post("https://recommendationmodel-fbarbzdsczhqhphb.southafricanorth-01.azurewebsites.net/predict_career", payload);
        console.log("Success:", response.data);
        if (response.status === 200) {
          localStorage.setItem("recommendations", JSON.stringify(response.data));
          setTimeout(() => {
            setLoading(false);
          navigate(`/student-recommendations/${userId}`);
          }
          , 10000);
        }
      } catch (error) {
        console.error("Error submitting:", error);
        setLoading(false);
      }
    };
      
        return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-grow m-6 p-6 overflow-y-auto">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Recommended Courses
        </h2>

        {isLoadingAttributes ? (
          <div className="flex justify-center items-center h-full">
            <BiLoader className="animate-spin text-5xl text-blue-600" />
          </div>
        ) : attributesError ? (
          <p className="text-center text-red-500">
            Error loading your data! Please try again later.
          </p>
        ) : recommendations.length === 0 ? (
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <p className="text-gray-600">Let's generate new recommendations for you</p>

            <div className="mt-4 text-left">
              <h3 className="font-semibold text-lg text-gray-800">Personal Interests</h3>
              <ul className="list-disc list-inside text-gray-700">
                {recommendationAttributes?.[0]?.personalIntrests.map((interest, index) => (
                  <li key={index}>{interest.personal_interests}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 text-left">
              <h3 className="font-semibold text-lg text-gray-800">Academics</h3>
              <ul className="list-disc list-inside text-gray-700">
                {recommendationAttributes?.[0]?.academics.map((academic, index) => (
                  <li key={index}>{academic.subjects.join(", ")}</li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="mt-6 w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              {Loading ? "Generating..." : "Generate Recommendations"}
            </button>
          </div>
        ) : recommendations.length > 0  ? (
            <div className="border p-4 rounded-lg ">
              <p className="text-center my-10 text-gray-500">Here are your recommendations:</p>
              <ul className="grid grid-cols-2 gap-12">
                {recommendations.map((course, index) => (
                  <li key={index} className="p-3 border rounded-lg shadow-sm bg-gray-100 text-center">
                    {course}
                  </li>
                ))}
              </ul>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Back
          </button>
            </div>
          ): (
            <div className="flex justify-center items-center h-full">
              <BiLoader className="animate-spin text-5xl text-blue-600" />
            </div>
          )}
      </div>
    </div>
    );
}

export default Recommendations