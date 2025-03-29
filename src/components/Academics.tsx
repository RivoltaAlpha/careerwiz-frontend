import { academicsAPI } from '../features/Academics/academicsAPI';
import { AcademicHistoryProps } from '../types/types';

const Academics = () => {
  const userId = JSON.parse(localStorage.getItem("user") || "{}").user_id;
  const { data, error, isLoading } = academicsAPI.useGetAcademicHistoryQuery(userId);

  // console.log("history data", data);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load data.</p>;

  // Ensure data is an array and extract the first item
  const academicData: AcademicHistoryProps | undefined = data?.[0];
  const academicHistory = academicData?.academic_history || [];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Academics</h2>
      {academicHistory.length ? (
        <ul className="list-disc pl-4">
          {academicHistory.map((item, index) => (
            <li key={index}>
              <span className="font-medium">{item.subject}:</span> {item.grade}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center mt-4">
          <p className="text-gray-500">No academic data available.</p>
          <img src="/images/collaboration.png" alt="No data" className="w-1/2 mx-auto mt-4" />
        </div>
      )}
    </div>
  );
};

export default Academics;