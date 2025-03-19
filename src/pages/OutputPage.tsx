import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OutputPage() {
    const [courses, setCourses] = useState<string[]>([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Retrieve recommendations from localStorage
      const storedRecommendations = localStorage.getItem("recommendations");
      if (storedRecommendations) {
        const parsedData = JSON.parse(storedRecommendations);
        setCourses(parsedData.recommended_courses || []);
      }
    }, []);
  
    return (
      <div className="max-w-8xl m-40 p-6 border rounded-lg shadow-lg flex flex-col justify-center">
        {/* Title */}
        <h2 className="text-4xl font-semibold text-center mb-4">Recommended Courses</h2>
  
        {/* No Recommendations Found */}
        {courses.length === 0 ? (
          <p className="text-center text-gray-500">No recommendations found.</p>
        ) : (
          <div className="border p-4 rounded-lg ">
            <ul className="grid grid-cols-2 gap-12">
              {courses.map((course, index) => (
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
  );
}
