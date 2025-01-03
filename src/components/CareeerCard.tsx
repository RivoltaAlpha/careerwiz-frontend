import React, { useEffect } from 'react';
import { CareerCardProps } from '../types/types';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';


const CareerCard: React.FC<CareerCardProps> = ({ CareerName, image, description, requirements, subjects, interests }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated){
            navigate('/dashboard')
        } 
    }, [isAuthenticated,navigate]);

    const handleExplore = () => {
        navigate('/dashboard')
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="w-[500px] object-cover md-w-full" src={image} alt={CareerName} />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2">{CareerName}</h2>
              <p className="text-gray-600 mb-4">{description}</p>
              <p className="text-gray-600 mb-4">{requirements}</p>
              <ul>
                for each subject 
                <li>{subjects}</li>
              </ul>
              <h3>{interests}</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
              onClick={handleExplore}>
                Explore
              </button>
            </div>
          </div>
        </div>
      );
};

export default CareerCard;