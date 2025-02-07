import { useGetInterestsQuery } from "../store/api/apiSlice";

const Interests = () => {
  const { data, error, isLoading } = useGetInterestsQuery();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load data.</p>;

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Interests</h2>
      {data?.length ? (
        <ul className="list-disc pl-4">
          {data.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No interests found.</p>
      )}
    </div>
  );
};

export default Interests;
