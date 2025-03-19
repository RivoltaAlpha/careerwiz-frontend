import { academicsAPI } from '../features/Academics/academicsAPI';

const Academics = () => {

const userId = JSON.parse(localStorage.getItem("user") || "{}").user_id;
  const { data, error, isLoading } = academicsAPI.useGetUserAcademicsQuery(userId);
  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load data.</p>;

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Academics</h2>
      {data?.length ? (
        <ul className="list-disc pl-4">
          {data.map((item, index) => (
            <li key={index}>{item.academic_id}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No academic data available.</p>
      )}
    </div>
  );
};

export default Academics;
