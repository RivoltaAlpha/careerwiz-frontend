import React from 'react';
import { SyncLoader } from 'react-spinners'; // Loader for loading state
import careersAPI from '../features/careers/careersAPI';
import { Career, TUser } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { setSelectedCareer } from '../features/careers/careersSlice';
import { NavLink } from 'react-router-dom';

const userCareers: React.FC<{ career: Career }> = () => {
  const user = useSelector((state: RootState) => state.userAuth.user) as TUser;
  const userId = user?.user_id;
  const { data: careers = [], isLoading, isError } = careersAPI.useGetCareerQuery(userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Loading state with spinner
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <SyncLoader color="#36d7b7" size={20} />
      </div>
    );

  // Error state
  if (isError)
    return (
      <div className="text-red-500 text-center mt-8">Error loading your careers</div>
    );

  const handleViewDetails = (career: Career) => {
    dispatch(setSelectedCareer(career));
    localStorage.setItem('selectedcareer', JSON.stringify(career));
    navigate(`/careers/${career.career_id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {careers?.map((career: Career) => (
        <div
          key={career.career_id}
          className="bg-primary shadow-lg rounded-lg p-6 transition transform hover:scale-105 duration-300 ease-in-out"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            {career.CareerName}
          </h3>
          <p className="text-gray-900 mb-4">
            <strong>Description:</strong> {career.description}
          </p>
          <p className="text-gray-900 mb-1">
            <strong>Subjects:</strong> {career.subjects}
          </p>
          <p className="text-gray-900 mb-1">
            <strong>Intrests:</strong> {career.interests}
          </p>
          <p className="text-gray-900 mb-4">
            <strong>Requirements:</strong> {career.requirements}
          </p>
          <div className="flex space-x-3">
            <NavLink
              className="bg-secondary text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
              onClick={() => handleViewDetails(career)}
              to={`/career-details/${career?.career_id}`}
            >
              View Details
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default userCareers;
