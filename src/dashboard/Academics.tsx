import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Sidebar from "../components/Sidebar";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { academicsAPI } from "../features/Academics/academicsAPI";
import { toast, ToastContainer } from "react-toastify";
import Academics from "../components/Academics";
import { TUser } from "../types/types";

const gradesList = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "E"];

const StudentAcademics = () => {
    const user = useSelector((state: RootState) => state.user?.user) as TUser;
  const subjectsList = [
    "English", "Kiswahili", "Mathematics", "Computer Studies", "Chemistry", "Biology",
    "History", "Geography", "Physics", "Art and Design", "Music", "Business Studies",
    "French", "German", "Agriculture", "Home Science", "CRE", "IRE", "Physical Education",
    "Technical Drawing", "Building Construction", "Woodwork", "Metalwork", "Electrical Technology",
  ];
  const userId = user?.user_id || 0;
  const [subjects, setSubjects] = useState([{ subject: "", grade: "" }]);
  const [favouriteSubjects, setFavouriteSubjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [academics] = academicsAPI.useCreateAcademicMutation();

  const navigate = useNavigate();

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

const addSubject = () => {
  if (subjects.length >= 8) {
    toast("You can only add up to 8 subjects.");
    return;
  }
  setSubjects([...subjects, { subject: "", grade: "" }]);
};


const toggleFavouriteSubject = (subject: string) => {
    setFavouriteSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

// Decide What to Send to Backend
const getSubjectsToSend = () => {
  const topSubjects = subjects
    .filter((s) => s.subject && s.grade) 
    .sort((a, b) => gradesList.indexOf(a.grade) - gradesList.indexOf(b.grade)) 
    .slice(0, 5) 
    .map((s) => s.subject); 

  const combinedSubjects = [...topSubjects];
  favouriteSubjects.forEach((fav) => {
    if (!combinedSubjects.includes(fav)) {
      combinedSubjects.push(fav); // Add favorite subject if not already included
    }
  });

  // Step 3: Limit the final list to 6 subjects
  return combinedSubjects.slice(0, 6);
};

  const handleSubmit = async () => {
    setIsLoading(true);
  
    const subjectsToSend = getSubjectsToSend();
    // console.log("Subjects to send:", subjectsToSend);
  
    const payload = {
      student_id: userId,
      subjects: subjectsToSend,
      academic_history: subjects,
    };
    console.log("Payload:", payload);
  
    try {
      await academics(payload).unwrap();
      setIsLoading(false);
      navigate(`/student-recommendations/${userId}`);
    } catch (error) {
      console.error("Error submitting:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-50 p-4 lg:p-8 overflow-y-auto">
      <ToastContainer style={{
        top: "10%",
        right: "5%",
        zIndex: 9999,
      }}/>
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg my-12">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.username}... Here is Your Academic Data</h2>
        </div>
           <Academics />

          <div className="mt-20">
              <h3 className="text-lg font-semibold mb-2">Mark Your Favorite Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {subjectsList.map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    className={`px-4 py-2 rounded ${
                      favouriteSubjects.includes(subject) ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => toggleFavouriteSubject(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

      <div className="flex flex-col flex-grow m-6 p-8 overflow-y-auto">
        <div className="max-w-8xl p-4 rounded-lg shadow-2xl min-h-1/2">
          <h2 className="text-4xl font-semibold text-center mb-2">Academic Performance</h2>
          <p className="text-sm text-center text-gray-500 mb-4">
            Select the subjects and the grade for each subject. You can also mark your favorite subjects.
          </p>
          <div className="grid grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-10">
              {subjects.slice(0, Math.ceil(subjects.length / 2)).map((item, index) => (
                <div key={index} className="flex gap-4">
                  <select
                    title="select"
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
                  <select
                    title="Select Grade"
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
                const actualIndex = index + Math.ceil(subjects.length / 2);
                return (
                  <div key={actualIndex} className="flex gap-4">
                    <select
                      title="Select Grade"
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
                    <select
                      title="Select Grade"
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

          <button
            type="button"
            onClick={addSubject}
            className="mt-4 p-2 bg-cards text-white rounded"
          >
            + Add Subject
          </button>
        </div>

        {isLoading ? (
          <div className="mt-6 flex justify-center items-center">
            <ClipLoader color="cards" size={45} />
            <p className="ml-3 text-lg">Processing your recommendations...</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 w-3/4 p-2 bg-cards text-white font-bold rounded lg:ml-[12%]"
          >
            Submit
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default StudentAcademics;