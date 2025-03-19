import React from "react";
import CareerCard from "../components/CareeerCard";
import { useGetCareersQuery } from "../features/careers/careersAPI";
import { SyncLoader } from "react-spinners";

const Explore: React.FC = () => {
    const { data: careers, error, isLoading } = useGetCareersQuery();
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <SyncLoader color="#36d7b7" size={20} />
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="text-red-500 text-center mt-8">Error loading careers</div>
    );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Explore Careers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers && careers.map((career) => (
          <CareerCard 
            key={career.career_id} 
            career_id={career.career_id} 
            career_name={career.career_name} 
            description={career.description} 
            image={career.image}
            requirements={career.requirements}
            subjects={career.subjects}
            interests={career.interests}
          />
        ))}
      </div>
    </div>
  );
};

export default Explore;
