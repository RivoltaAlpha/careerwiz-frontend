import { RootState } from "../app/store";
import { personalInterestsAPI } from "../features/personalInterests/personalInterestsAPI";
import { TUser } from "../types/types";
import { useSelector } from "react-redux";

const Interests = () => {
  const user = useSelector((state: RootState) => state.user?.user) as TUser;
  const userId = user?.user_id || 0;
  const { data, error, isLoading } = personalInterestsAPI.useGetPersonalIntrestsQuery(userId);

  console.log("data", data)

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load data.</p>;

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Interests</h2>
      {Array.isArray(data) && data.length ? (
        <ul className="list-disc pl-4">
          {data.map((item, index) => (
            <li key={index}>{item.personal_interests}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No interests found.</p>
      )}
    </div>
  );
};

export default Interests;
