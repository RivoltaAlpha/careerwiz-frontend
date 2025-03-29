import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { recommendationsAPI } from "../features/recommendations/recommendationsAPI";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { TUser } from "../types/types";
import { BiLoader } from "react-icons/bi";

const Recommendations = () => {
      const user = useSelector((state: RootState) => state.user.user) as TUser;
      const userId = user?.user_id;
      const [recommendations, setRecommendations] = useState<string[]>([]);
      const { data: recommendationsData, isLoading: isLoadingRecs} = recommendationsAPI.useGetUserRecommendationsQuery(userId || 0);
  
        const navigate = useNavigate();
      
    useEffect(() => {
    // console.log("API Response:", recommendationsData);

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
      // console.log("Extracted recommendations:", courses);
      
      setRecommendations(courses);
    
    } 
    }, [recommendationsData]);
      
        return (
          <div className="flex h-screen">
            <Sidebar/>
            {isLoadingRecs && (
              <BiLoader className="animate-spin text-4xl text-center mt-20 ml-[40%]"/>
            )}
            {/* Main Content */}
            <div className="flex flex-col flex-grow m-6 p-8 overflow-y-auto">
            {/* Title */}
            <h2 className="text-4xl font-semibold text-center mb-4">Recommended Courses</h2>
      
            {/* No Recommendations Found */}
            {recommendations.length === 0 ? (
              <p className="text-center text-gray-500">No recommendations found.</p>
            ) : (
              <div className="border p-4 rounded-lg ">
                <ul className="grid grid-cols-2 gap-12">
                  {recommendations.map((course, index) => (
                    <li key={index} className="p-3 border rounded-lg shadow-sm bg-gray-100 text-center">
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            )}
      
            {/* Back Button */}
            <button
            type="button"
              onClick={() => navigate(-1)}
              className="mt-6 w-3/4 ml-[12%] p-2 bg-cards text-white font-bold rounded"
            >
              Back
            </button>
          </div>
        </div>
    );
}

export default Recommendations