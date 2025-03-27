import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Sidebar from "../components/Sidebar";

const subjectsList = ["English","Kiswahili", "Mathematics", "Computer Studies", "Chemistry", "Biology", "History","Geography", "Physics"," Art and Design", "Music", "Business Studies","French", "German", "Agriculture", "Home science"];
const gradesList = ["A","A-","B+","B","B-","C+","C","C-","D+","D","D-","E"];

const StudentAcademics = () => {
  const [subjects, setSubjects] = useState([{ subject: "", grade: "" }]);
  const [isLoading, setIsLoading] = useState(false);


  // Handle Subject & Grade Selection
  const handleSubjectChange = (index: number, value: string) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].subject = value;
    setSubjects(updatedSubjects);
  };

  const handleGradeChange = (index: number, value: string) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].grade = value;
    setSubjects(updatedSubjects);
  };

    // student to list favourite subjects 
    const [favouriteSubjects, setFavouriteSubjects] = useState<string[]>([]); 
    const [favouriteGrades, setFavouriteGrades] = useState<string[]>([]);


  // Add Subject & Interest Fields
  const addSubject = () => setSubjects([...subjects, { subject: "", grade: "" }]);

  // Calculate Top 4 Subjects
  const getTopSubjects = () => {
    return subjects
      .filter((s) => s.subject && s.grade)
      .sort((a, b) => gradesList.indexOf(a.grade) - gradesList.indexOf(b.grade))
      .slice(0, 6)
      .map((s) => s.subject);
  };
  
  const navigate = useNavigate();
  // Submit Data to API
  const handleSubmit = async () => {
    setIsLoading(true); // Show loader

    const topSubjects = getTopSubjects();
    const payload = { subjects: topSubjects };

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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow m-6 p-8 overflow-y-auto">
        <div className="max-w-8xl p-4 rounded-lg shadow-2xl min-h-1/2">
          <h2 className="text-4xl font-semibold text-center mb-2">Academic Performance</h2>
              <br/>
          <p className="text-sm text-center text-gray-500 mb-4">Select the subjects and the grade for each subject</p>
          <div className="grid grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-10">
              {subjects.slice(0, Math.ceil(subjects.length / 2)).map((item, index) => (
                <div key={index} className="flex gap-4">
                  <label htmlFor={`subject-${index}`} className="sr-only">Subject</label>
                  <select
                    id={`subject-${index}`}
                    value={item.subject}
                    onChange={(e) => handleSubjectChange(index, e.target.value)}
                    className="p-2 border rounded w-1/2"
                  >
                    <option value="">Select Subject</option>
                    {subjectsList.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>

                  <label htmlFor={`grade-${index}`} className="sr-only">Grade</label>
                  <select
                    id={`grade-${index}`}
                    value={item.grade}
                    onChange={(e) => handleGradeChange(index, e.target.value)}
                    className="p-2 border rounded w-1/2"
                  >
                    <option value="">Select Grade</option>
                    {gradesList.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Right Column */}
              <div className="space-y-10">
              {subjects.slice(Math.ceil(subjects.length / 2)).map((item, index) => {
                  // Calculate the actual index in the subjects array
                  const actualIndex = index + Math.ceil(subjects.length / 2);
                  
                  return (
                  <div key={actualIndex} className="flex gap-10">
                      <label htmlFor={`subject-${actualIndex}`} className="sr-only">Subject</label>
                      <select
                      id={`subject-${actualIndex}`}
                      value={item.subject}
                      onChange={(e) => handleSubjectChange(actualIndex, e.target.value)}
                      className="p-2 border rounded w-1/2"
                      >
                      <option value="">Select Subject</option>
                      {subjectsList.map((subject) => (
                          <option key={subject} value={subject}>
                          {subject}
                          </option>
                      ))}
                      </select>
                      <label htmlFor={`grade-${actualIndex}`} className="sr-only">Grade</label>
                      <select
                      id={`grade-${actualIndex}`}
                      value={item.grade}
                      onChange={(e) => handleGradeChange(actualIndex, e.target.value)}
                      className="p-2 border rounded w-1/2"
                      >
                      <option value="">Select Grade</option>
                      {gradesList.map((grade) => (
                          <option key={grade} value={grade}>
                          {grade}
                          </option>
                      ))}
                      </select>
                  </div>
                  );
              })}
            </div>
        </div>

        <button type="button" onClick={addSubject} className="mt-4 p-2 bg-cards text-white rounded">
          + Add Subject
        </button>
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
    </div>
          </div>
  );
};

export default StudentAcademics;
